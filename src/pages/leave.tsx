import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_Leave, CREATE_WFH, GET_ALL_FAq, GET_FaqById, GET_OfficalInfoByUser } from '@/graphql/User/queries';
import { useRouter } from "next/router";


export default function Leave() {
    const router = useRouter();
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

    const [leave, setLeave] = useState<FaqType[]>([]);
    const [casualeave, setCasualLeave] = useState<FaqType[]>([]);
    const [earnedleave, setEarnedLeave] = useState<FaqType[]>([]);
    const [managerid2, setManagerId2] = useState();
    const [endDate, setEndDate] = useState(new Date());
    const [executeQuery, { loading, error, data: getofficialinfobyuser }] = useLazyQuery(GET_OfficalInfoByUser);
    const [executeQueryforfaq, { loading: laodingforfaq, error: errorforfaq, data: getfaqbyid }] = useLazyQuery(GET_FaqById);
    const [createleave, { loading: loading1, error: error1 }] = useMutation(CREATE_Leave);
    const [randomFAQs, setRandomFAQs] = useState<FaqType[]>([]);
    const { loading: loading2, error: eror2, data } = useQuery(GET_ALL_FAq);
    const faqData = data?.faqs;
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [formValues, setFormValues] = useState({
        leaveType: '',
        startDate: new Date(),
        endDate: new Date(),
        leaveReason: '',
    });

    const authToken = Cookies.get('authToken');
    console.log("the data from api", faqData);

    const getRandomFAQs = () => {
        // Shuffle the faqs array
        const shuffledFAQs = [...faqData].sort(() => Math.random() - 0.5);
        // Take the first 4 elements to display
        const selectedFAQs = shuffledFAQs.slice(0, 4);
        setRandomFAQs(selectedFAQs);
    };
    useEffect(() => {
        // Fetch FAQ data or use the existing data
        if (faqData) {
            getRandomFAQs();
        }
    }, [faqData]);



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

        if (data) {
            const faqData = data?.faqs;
            console.log("the data from api", faqData);
        }


    }, []);
    // const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
    //     console.log('Start Date:', startDate);
    //     console.log('End Date:', endDate);

    //     const dates = [];
    //     let currentDate = new Date(startDate);

    //     while (currentDate <= endDate) {
    //         dates.push(new Date(currentDate));
    //         currentDate.setDate(currentDate.getDate() + 1);
    //     }

    //     console.log('Generated Dates:', dates);
    //     return dates;
    // };
    const getDatesBetween = (startDate: Date, endDate: Date): string[] => {
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);

        const dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            // Format the date as a string (e.g., 'YYYY-MM-DD') and push to the array
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Include the end date if it's not already in the array
        const endDateString = endDate.toISOString().split('T')[0];
        if (!dates.includes(endDateString)) {
            dates.push(endDateString);
        }

        console.log('Generated Dates:', dates);
        return dates;
    };

    // const calculateWeekdaysBetween = (startDate: any, endDate: any) => {
    //     let currentDate = new Date(startDate);
    //     let totalWeekdays = 0;

    //     while (currentDate <= endDate) {
    //         const dayOfWeek = currentDate.getDay();
    //         totalWeekdays++;
    //         // if (dayOfWeek !== 0 && dayOfWeek !== 6) {
    //         //     totalWeekdays++;
    //         // }

    //         currentDate.setDate(currentDate.getDate() + 1);
    //     }

    //     return totalWeekdays;
    // };
    const calculateWeekdaysBetween = (startDate: any, endDate: any) => {
        // Convert both dates to UTC to avoid issues with daylight saving time
        const start: any = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
        const end: any = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));

        // Calculate the difference in days
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const totalDays = Math.round(Math.abs((start - end) / oneDay)) + 1;

        return totalDays;
    };

    // Function to check if there are Saturdays or Sundays between two dates
    const checkWeekendInBetween = (startDate: any, endDate: any) => {
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                return true; // Saturday or Sunday found
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return false; // No Saturday or Sunday found
    };
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        // Calculate the number of days between start and end dates
        const start: any = new Date(formValues.startDate);
        const end: any = new Date(formValues.endDate);
        const oneDay: any = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        // const totalDays = Math.round(Math.abs((start - end) / oneDay)) + 1;
        //         const start = new Date(formValues.startDate);
        // const end = new Date(formValues.endDate);
        //     const totalDays = calculateWeekdaysBetween(start, end);
        //     const start = new Date(formValues.startDate);
        // const end = new Date(formValues.endDate);

        // Calculate the number of days between start and end dates, including Saturdays and Sundays

        let totalDays = 0;
        // Check if Saturdays or Sundays are included in the selected range
        const hasWeekendInBetween = checkWeekendInBetween(start, end);

        // If Saturdays or Sundays are included, show an alert
        if (hasWeekendInBetween) {
            const userResponse = window.confirm("This is a sandwich leave. Do you want to continue?");
            if (!userResponse) {
                // User clicked "Cancel," don't save the leave
                return;
            }
            else {
                //if it is not a sandwich leave simply do end date- start date
                totalDays = calculateWeekdaysBetween(start, end);
                console.log(totalDays)
            }
        }
        else {

            //if it is not a sandwich leave simply do end date- start date
            totalDays = calculateWeekdaysBetween(start, end);
            console.log(totalDays)
        }

        console.log('Form Values:', formValues);
        const input = {
            user_id: userid,
            leave_start_date: formValues.startDate,
            leave_end_date: formValues.endDate,
            manager_id: managerid1,
            leave_reason: formValues.leaveReason,
            leave_total_days: totalDays,
            leave_type: formValues.leaveType
        }

        try {
            console.log("inside try")
            const { data } = await createleave({
                variables: {
                    input,
                },
            });
            console.log('Mutation Response:', data);
            if (data && data.createLeave) {
                console.log("inside if")
                // Reset the form after submission if needed
                setFormValues({
                    leaveType: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    leaveReason: ''
                });
                // alert("all done")
                router.push("leave_list")
            } else {
                // Handle any other response or error conditions as needed
                console.error('Unexpected response:', data);
            }
        }
        catch (error) {
            console.error('An error occurred:', error);
        }


    };
    const handleSubmit1 = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        console.log(formValues.startDate)
        // Perform additional validation before submitting the form
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
        try {
            // Toggle the state to hide the form and show the table
            setShowForm(false);

            // Call getDatesBetween to update selectedDates state
            // Call getDatesBetween to update selectedDates state
            const datesBetween = getDatesBetween(
                new Date(formValues.startDate),
                new Date(formValues.endDate)
            );
            // Update the selectedDates state
            setSelectedDates(datesBetween);
        }
        catch (error) {
            console.error('An error occurred:', error);
        }


    };

    const handleInputChange = async (e: { target: { name: any; value: any; }; }) => {
        // Update the formValues state as the user types
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
        console.log(formValues);
        // if (e.target.name === 'leaveReason') {
        //     if (e.target.value.trim() === '') {
        //         setLeaveReasonError('Leave Reason is required.');
        //     } else {
        //         setLeaveReasonError('');
        //     }
        // }

        // if (e.target.name === 'leaveType') {
        //     console.log(e.target.value)
        //     if (e.target.value.trim() === '') {
        //         console.log(e.target.value)
        //         setLeaveReasonError1('Leave Type is required.');
        //     } else {
        //         setLeaveReasonError1('');
        //     }
        // }

        // Get random FAQs again when the leave type changes
        getRandomFAQs();
    };



    return (
        <div className=' w-full rounded px-2'>
            {showForm ? (
                <>

                    <div className="rounded-t mb-4 px-4 bg-transparent">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full max-w-full flex-grow flex-1">
                                <h2 className="text-blueGray-700 text-xl font-semibold">
                                    New Leave Request
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                            <div className=" mb-4 px-2 py-2">
                                <form onSubmit={handleSubmit1}>
                                    <div className="space-y-2">
                                        <div className="border-b border-gray-900/10 pb-4">
                                            <div className="mt-2 grid grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2 sm:grid-cols-6">
                                                <div className="sm:col-span-6">
                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Leave Type
                                                    </label>
                                                    <div className="mt-3">
                                                        <select
                                                            id="leaveType"
                                                            required
                                                            name="leaveType"
                                                            value={formValues.leaveType}
                                                            onChange={handleInputChange}
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue="Canada"

                                                        >
                                                            <option>Choose Type</option>
                                                            <option>Sick Leave</option>
                                                            <option>Casual Leave</option>
                                                            <option>Earned Leave</option>
                                                        </select>
                                                        {leaveReasonError1 && (
                                                            <p className="mt-1 text-red-500 text-sm">{leaveReasonError1}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Start Date
                                                    </label>
                                                    <div className="mt-3">
                                                        {/* <input
                                                        type="date"
                                                        name="start-date"
                                                        id="start-date"
                                                        autoComplete="given-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    /> */}
                                                        <DatePicker
                                                            name="startDate"
                                                            required
                                                            selected={formValues.startDate}
                                                            // onChange={(date: any) => handleInputChange({ target: { name: 'startDate', value: date } })}
                                                            onChange={(date: any) => {
                                                                handleInputChange({ target: { name: 'startDate', value: date } });
                                                                setStartDateSelected(true); // Set to true when the user selects a date
                                                            }}



                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"

                                                        />


                                                        {leaveReasonError2 && (
                                                            <p className="mt-1 text-red-500 text-sm">{leaveReasonError2}</p>
                                                        )}

                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                        End Date
                                                    </label>

                                                    <div className="mt-3">
                                                        <DatePicker
                                                            name="endDate"
                                                            required
                                                            selected={formValues.endDate}

                                                            onChange={(date: any) => {
                                                                handleInputChange({ target: { name: 'endDate', value: date } });
                                                                setEndDateSelected(true); // Set to true when the user selects a date
                                                            }}

                                                           
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"

                                                        />
                                                        {leaveReasonError3 && (
                                                            <p className="mt-1 text-red-500 text-sm">{leaveReasonError3}</p>
                                                        )}
                                                    </div>
                                                </div>


                                                <div className="sm:col-span-6">
                                                    <div className="mt-3">
                                                        <textarea
                                                            id="leaveReason"
                                                            name="leaveReason"
                                                            value={formValues.leaveReason}
                                                            onChange={handleInputChange}
                                                            rows={3}
                                                            className="px-2 h-16 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={''}

                                                            placeholder={'Leave Reason'}
                                                        />
                                                        {leaveReasonError && (
                                                            <p className="mt-1 text-red-500 text-sm">{leaveReasonError}</p>
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
                            <h4>FAQ for leaves</h4>
                            <div className=" mb-4 px-2 py-2">
                                <dl className="mt-2 space-y-6 divide-y divide-gray-900/10">

                                    {randomFAQs?.map((faq: any) => (
                                        <Disclosure as="div" key={faq.faq_ques} >
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


                                </dl>
                            </div>

                        </div>

                    </div>
                </>
            ) : (
                <div>
                    <h2 className="text-blueGray-700 text-xl font-semibold">
                        Leave Details
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <table className="mt-4 w-full">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Date</th>
                                    <th className="py-2 px-4 border-b">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedDates.map((date, index) => {
                                    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

                                    return (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b">{date} ({dayOfWeek})</td>
                                            <td className="py-2 px-4 border-b">
                                                {dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday' ? (
                                                    <span className='text-red-500 font-bold'>Weekly Off</span>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <select
                                                            // value={leaveDetails[index]}
                                                            // onChange={(e) => handleLeaveDetailsChange(e, index)}
                                                            className="border rounded-md px-2 py-1.5"
                                                        >
                                                            <option value="full-day">Full Day</option>
                                                            <option value="half-day-afternoon">Half Day Afternoon</option>
                                                            <option value="half-day-morning">Half Day Morning</option>
                                                        </select>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>
                        <div className=" items-center mt-10">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>

                </div>
            )}

        </div>
    )
}
