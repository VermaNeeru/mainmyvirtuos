import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_Leave, CREATE_WFH, GET_ALL_FAq, GET_FaqById, GET_OfficalInfoByUser } from '@/graphql/User/queries';

const faqs = [
    {
        question: "What is Casual Leave (CL) ? How can i avail CL? Am I Eligible for CL?",
        answer:
            "CASUAL LEAVE (CL) All employees including probationers* will be entitled to 7 (Seven) days Casual Leaves during a Financial year. These leaves will be credited to an individual's account at the beginning of the financial year and can accrued proportionately on a periodic basis. An employee can avail CL, subject to the following: â€¢ A maximum of three dayâ€™s CL can be availed in a month*. Also not more than 3 casual leaves can be availed at one time unless the absence is due to illness. In such a situation a certificate must accompany the leave application from a Medical Practitioner. â€¢ CL cannot be clubbed with any other leave â€¢ In case CL is availed because of medical reasons it can be clubbed with Sick Leave (SL) if the duration of the leave is more than the CL balance in an individualâ€™s account. â€¢ Either suffixed or prefixed holidays and Sundays to the leave period shall not be accounted as leave. Saturdays or Sundays falling between the period of leave shall be treated as leave. If an employee is absent on Friday and Monday, Saturday and Sunday are treated as availed leaves (Only one exception* is given in a year, as part of planned holiday). *This is only applicable for Qualified Employees (QE). If eligible, an employee is required to apply in MyVirtuos for the exception to sandwich leave policy, to avail this benefit. If an employee takes leave from Monday to Friday continuously, automatically Saturday and Sundays are treated as absent and shall be debited from the total entitlement of leaves. Unused Casual Leaves (CL) lapse at the end of the financial year and cannot be carried forward or encashed. *For (PE) No leaves allowed in the first month of joining Casual Leaves (CL) can be applied online using Leave Application Form as per the following schedule. 1 Day CL Application at least 1 Day in advance. 2 to 3 Days CL Application at least One week in advance. 4 to 7 Days CL Application at least 3 to 4 weeks in advance. Exceptions apply only in case of Emergency.",
    },
    {
        question: "What is Sick Leave (SL) ? How can I avail SL?",
        answer:
            "SICK LEAVE (SL) All employees including probationers* will be entitled to 7 (Seven) days Sick Leaves during a Financial year. These leaves will be credited to an individual's account at the beginning of the financial year and can accrued proportionately on a periodic basis. An employee can avail SL, subject to the following: â€¢ For more than three days of continuous sick leaves a certificate must accompany the leave application from a Medical Practitioner. â€¢ SL cannot be clubbed with any other leave. â€¢ In case CL is availed because of medical reasons it can be clubbed with Sick Leave (SL) if the duration of the leave is more than the SL balance in an individualâ€™s account. â€¢ Either suffixed or prefixed holidays and Sundays to the leave period shall not be accounted as leave. Saturdays or Sundays falling between the period of leave shall be treated as leave. If an employee is absent on Friday and Monday, Saturday and Sunday are treated as availed leaves (Only one exception* is given in a year, as part of planned holiday). *This is only applicable for Qualified Employees (QE). If eligible, an employee is required to apply in myVirtuos for the exception to sandwich leave policy, to avail this benefit. If an employee takes leave from Monday to Friday continuously, automatically Saturday and Sundays are treated as absent and shall be debited from the total entitlement of leaves. Unused SL lapse at the end of the financial year and cannot be carried forward or encashed. *For (PE) No leaves allowed in the first month of joining.",
    },
    {
        question: "What is Leave Policy (Paid or Unpaid Leaves)",
        answer:
            "Company has comprehensive Leave Policy in place for each Financial year (April to March) 1) Holidays and Restricted Holidays (RH) as per the Holiday Calendar 2) Qualified Employees (QE) can avail of 12 Casual Leaves (CL) 03 Congratulatory/Compassionate Leaves (CCL) 03 Sick Leaves (SL) 03 Restricted Holidays (RH) 3) Probationary Employees (PE) can avail of 03 Casual Leaves (CL) 01 Congratulatory/Compassionate Leaves (CCL) 01 Sick Leave (SL) QE can carry forward unveiled RH and SL to the next financial year or encase at the end of financial year. PE can carry forward CCL to the Post Probation Period Please refer to the Leave Policy in the Document Section on this Portal.",
    },
    {
        question: "How can I apply for Leave(s)?",
        answer:
            "Go to Leaves Section in this Portal and click New Leave Request. Please state the reason for availing the leave. Leaves are subject to approval by Manager and HR. You can check leave approval status under Leaves Section > My Applied Leaves.",
    },
    {
        question: "Can I cancel my leaves?",
        answer:
            "You can cancel or make changes to your leaves before they are approved. Should you wish to cancel after they are approved, please contact HR",
    },
    {
        question: "What happens if there is no leave balance and I need to take leaves?",
        answer:
            "Leaves are as per leave entitlement per trimester. Additional leaves may be treated as Leave without pay (LWP)",
    },
    {
        question: "How to Apply for a Half Day ?",
        answer:
            "Leaves -> New Leave Request -> Select Leave type & Dates - > Click on Save -> Next Screen asks for Half/Full Day -> Select Half day there & Save",
    },
    {
        question: "What is EL(Earned Leave)? How can I avail EL? Am I eligible for EL?",
        answer:
            "EARNED LEAVES (PL) All the Qualified Employees (QE) earn 7 (Seven days) Earned leaves (EL) during a Financial year. EL will be credited in three tranches (April, August and December). A Qualified Employee is an employee who has been confirmed after the initial six or twelve month probation period. EL can be availed only after putting in at least six months of work with the Company. EL can be accumulated maximum up to fourteen (14) days. An employee can have the option of encashing EL at the end of the financial year. The company shall do automatic encashment of unavailed EL once the balance exceeds 14 days as on 31st March every year. The EL can be encashed at the basic salary. Any holiday/weekly off falling during EL period shall be counted as Earned leave. Earned Leave (EL) can be applied online using Leave Application Form as per the following schedule. 1 Day EL Application at least 1 Day in advance. 2 to 3 Days EL Application at least One week in advance. 4 to 7 Days EL Application at least 3 to 4 weeks in advance. Exceptions apply only in case of Emergency.",
    },
    {
        question: "Can I adjust my leaves against my notice period?",
        answer:
            "Neither an employer nor an employee can adjust leaves against the notice period. In addition the required notice period is likely can not be reduced by taking leaves.",
    },
    // More questions...
]


export default function Leave() {
    type FaqType = {
        __typename: string;
        id: number;
        faq_ques: string;
        faq_ans: string;
    };

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
    const { loading:loading2, error:eror2, data } = useQuery(GET_ALL_FAq);
    const faqData = data?.faqs;
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
    const [formValues, setFormValues] = useState({
        leaveType: '',
        startDate: new Date(),
        endDate: new Date(),
        leaveReason: '',
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

        if(data){
            const faqData = data?.faqs;
            console.log("the data from api", faqData);
        }

        
    }, []);
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        // Log the form values
        console.log('Form Values:', formValues);
        const input = {
            user_id: userid,
            holiday_id: 1,
            leave_start_date: formValues.startDate,
            leave_end_date: formValues.endDate,
            manager_id: managerid1,
            leave_reason: formValues.leaveReason,
            leave_total_days: 1,
            leave_manager_approval: "",
            leave_hr_approval: "",
            leave_type: formValues.leaveType,
            leave_cancel_reason: "",
        }

        try {
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

                // Display an alert for successful submission
                alert('Form submitted successfully!');
            } else {
                // Handle any other response or error conditions as needed
                console.error('Unexpected response:', data);
            }
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

 // Get random FAQs again when the leave type changes
 getRandomFAQs();
    };
    // You can add further logic here to send the data to your backend or perform other actions

    return (
        <div className=' w-full rounded px-2'>
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
                        <form onSubmit={handleSubmit}>
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
                                                    selected={formValues.startDate}
                                                    onChange={(date: any) => handleInputChange({ target: { name: 'startDate', value: date } })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                                />


                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                End Date
                                            </label>

                                            <div className="mt-3">
                                                <DatePicker
                                                    name="endDate"
                                                    selected={formValues.endDate}
                                                    onChange={(date: any) => handleInputChange({ target: { name: 'endDate', value: date } })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                                />

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
                          
                            {randomFAQs?.map((faq:any) => (
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
                                                <p className="text-base leading-7 text-xs text-gray-600">{faq.faq_ans   }</p>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}


                        </dl>
                    </div>

                </div>

            </div>
        </div>
    )
}
