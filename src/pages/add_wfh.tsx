import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_WFH, GET_FaqById, GET_OfficalInfoByUser } from '@/graphql/User/queries';
import { useRouter } from 'next/router';


export default function AddWfh() {
    const router = useRouter();
    // Add this type definition
    type FaqType = {
        __typename: string;
        id: number;
        faq_ques: string;
        faq_ans: string;
    };
    const [leaveReasonError, setLeaveReasonError] = useState('');
    const [leaveReasonError1, setLeaveReasonError1] = useState('');
    const [leaveReasonError2, setLeaveReasonError2] = useState('');
    const [leaveReasonError3, setLeaveReasonError3] = useState('');
    const [start, setStartDateSelected] = useState(false);
    const [end, setEndDateSelected] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [userid, setUserid] = useState();
    const [managerid1, setManagerId1] = useState();

    const [wfhFaq, setWfhFaq] = useState<FaqType[]>([]);
    const [shortLeaveFaq, setShortLeaveFaq] = useState<FaqType[]>([]);
    const [managerid2, setManagerId2] = useState();
    const [endDate, setEndDate] = useState(new Date());
    const [executeQuery, { loading, error, data: getofficialinfobyuser }] = useLazyQuery(GET_OfficalInfoByUser);
    const [executeQueryforfaq, { loading: laodingforfaq, error: errorforfaq, data: getfaqbyid }] = useLazyQuery(GET_FaqById);
    const [createwfh, { loading: loading1, error: error1 }] = useMutation(CREATE_WFH);
    const [formValues, setFormValues] = useState({
        leaveType: '',
        startDate: new Date(),
        endDate: new Date(),
        leaveReason: '',
        dayType: '',
        time: ""
    });

    const authToken = Cookies.get('authToken');


    useEffect(() => {
        if (authToken) {
            const decodedToken = jwt.decode(authToken);
            if (typeof decodedToken === 'string') {
                console.error('Invalid token:', decodedToken);
            } else if (decodedToken) {
                console.log(decodedToken?.id);
                setUserid(decodedToken?.id)
                executeQuery({ variables: { id: decodedToken?.id } });
                console.log(getofficialinfobyuser);
                if (getofficialinfobyuser) {

                    setManagerId1(getofficialinfobyuser.manager_id1);
                    setManagerId2(getofficialinfobyuser.manager_id2);
                }
            }
        }

        const fetchData = async () => {
            try {
                // Fetch data for ID 9 (WFH)
                const resultWfh = await executeQueryforfaq({ variables: { id: 9 } });
                console.log(resultWfh);
                if (resultWfh.data) {
                    console.log(resultWfh.data)
                    setWfhFaq(resultWfh.data.faqsByCategoryId);
                    console.log(wfhFaq);
                }

                // Fetch data for ID 13 (Short Leave)
                const resultShortLeave = await executeQueryforfaq({ variables: { id: 13 } });
                console.log(resultShortLeave)
                if (resultShortLeave.data.faqsByCategoryId) {
                    setShortLeaveFaq(resultShortLeave.data.faqsByCategoryId);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();  // Call the fetchData function
    }, []);

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        // Log the form values
        console.log('Form Values:', formValues);
        if (formValues.leaveReason.trim() === '') {
            setLeaveReasonError('Leave Reason is required.');
            // return;
        }
        if (start == false) {
            setLeaveReasonError2('startDate is required.');
        }
        if (end == false) {
            setLeaveReasonError3('endDate is required.');
        }
        // if (!formValues.startDate) {

        //     // return;
        // }
        if (!formValues.endDate) {
            setLeaveReasonError3('endDate is required.');
            // return;
        }
        if (formValues.leaveType.trim() === '') {
            setLeaveReasonError1('Leave Type is required.');
            return;
        }
        // Now you can use the formValues in the way you need
        // For example, send the data to the server or perform other actions

        // ...
        const input = {
            user_id: userid,
            manager_id: managerid1,
            m_manager_id: managerid2,
            type: formValues.leaveType,
            date: formValues.startDate,
            // date: "2023-11-23",
            day_type: formValues.dayType,
            time_slot: "9:00 AM - 5:00 PM",
            hours_slot: "8 hours",
            reason: formValues.leaveReason,
            manager_approval: "Approved", // Assuming this is a string
            m_manager_approval: "Pending", // Assuming this is a string
        }

        try {
            const { data } = await createwfh({
                variables: {
                    input,
                },
            });
            console.log('Mutation Response:', data);
            if (data && data.createUserWfh) {
                // Reset the form after submission if needed
                setFormValues({
                    leaveType: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    leaveReason: '',
                    dayType: '',
                    time: '',
                });

                // Display an alert for successful submission
                // alert('Form submitted successfully!');
                router.push('/wfh');
            } else {
                // Handle any other response or error conditions as needed
                console.error('Unexpected response:', data);
            }
        }
        catch (error) {
            console.error('An error occurred:', error);
        }

    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        // Update the formValues state as the user types
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };


    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Add WFH/Short Leave
                        </h2>

                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className=" mb-4 px-2 py-2">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <div className="pb-4">
                                    <div className="mt-2 grid grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                Leave Type
                                            </label>
                                            <div className="mt-3">
                                                <select
                                                    id="leaveType"
                                                    name="leaveType"
                                                    value={formValues.leaveType}
                                                    onChange={handleInputChange}
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue="Canada"
                                                >
                                                    <option>Choose Type</option>
                                                    <option>WFH</option>
                                                    <option>Short Leave</option>
                                                    <option>WFH Special</option>
                                                </select>
                                                <DatePicker selected={startDate} onChange=
                                                    {(date: React.SetStateAction<Date>) => setStartDate(date)} className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                                />
                                                {leaveReasonError2 && (
                                                    <p className="mt-1 text-red-500 text-sm">{leaveReasonError2}</p>
                                                )}
                                                {formValues.leaveType === 'WFH' || formValues.leaveType === 'WFH Special' ? (
                                                    <select
                                                        id="dayType"
                                                        name="dayType"
                                                        value={formValues.dayType}
                                                        onChange={handleInputChange}
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        defaultValue="Canada"
                                                    >
                                                        <option>Choose Type</option>
                                                        <option>Half Day</option>
                                                        <option>Full Day</option>
                                                        <option>By Hours</option>
                                                    </select>
                                                ) : null}

                                                {formValues.leaveType === 'Short Leave' ? (
                                                    <>
                                                        <label htmlFor="time" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                                            Time
                                                        </label>
                                                        <input
                                                            type="time"
                                                            id="time"
                                                            name="time"
                                                            value={formValues.time}
                                                            onChange={handleInputChange}
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        /></>
                                                ) : null}
                                                {/* New input field for entering time */}


                                                <textarea


                                                    id="leaveReason"
                                                    name="leaveReason"
                                                    value={formValues.leaveReason}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="mt-4 px-2 h-16 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue={''}
                                                    placeholder={'Leave Reason'}
                                                />
                                                  {leaveReasonError && (
                                                            <p className="mt-1 text-red-500 text-sm">{leaveReasonError3}</p>
                                                        )}
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>

                            <div className=" items-center">
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <h4>FAQs</h4>
                    <div className=" mb-4 px-2 py-2">
                        {formValues.leaveType === 'WFH' || formValues.leaveType === 'WFH Special' || formValues.leaveType === ''
                            ? wfhFaq.map((faq) => (
                                <Disclosure as="div" key={faq.id}>
                                    {({ open }) => (
                                        <>
                                            <dt>
                                                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                    <span className="text-base font-semibold leading-7 text-xs text-gray-800">{faq.faq_ques}</span>
                                                    <span className="ml-6 flex h-7 items-center">
                                                        {open ? (
                                                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                        ) : (
                                                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </dt>
                                            <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                <p className="text-base leading-7 text-xs text-gray-600">{faq.faq_ans}</p>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))
                            : // Render FAQs for Short Leave
                            shortLeaveFaq.map((faq) => (
                                <Disclosure as="div" key={faq.id}>
                                    {({ open }) => (
                                        <>
                                            <dt>
                                                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                    <span className="text-base font-semibold leading-7 text-xs text-gray-800">{faq.faq_ques}</span>
                                                    <span className="ml-6 flex h-7 items-center">
                                                        {open ? (
                                                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                        ) : (
                                                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </dt>
                                            <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                <p className="text-base leading-7 text-xs text-gray-600">{faq.faq_ans}</p>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                    </div>

                </div>

            </div>
        </div>
    )
}