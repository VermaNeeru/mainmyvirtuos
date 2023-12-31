import React, { Fragment, useState, useRef, useEffect } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Dialog, Menu, Combobox, Transition } from '@headlessui/react'
import DatePicker from "react-datepicker";

import { GET_USER_ATTENDANCE, GET_USER_ATTENDANCE_BY_ID } from '@/graphql/Userattendance/queries';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from 'next/dist/shared/lib/constants';
import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/20/solid'

import Link from 'next/link';
import { XMarkIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import Alert from '@/components/Alert';

import "react-datepicker/dist/react-datepicker.css";
import EmployeeSearch from '@/components/EmployeeSearch';

const table_header = [
    { name: 'Name' },
    { name: 'Date' },
    { name: 'Day' },
    { name: 'In' },
    { name: 'Out' },
    { name: 'Status' },
    { name: 'Total Hours' },
    { name: 'Logon Hours' },
    { name: 'Shortfall' },
    { name: 'Excess' },
];
const user_attendance = [
    { id: 1, name: 'Lindsay Walton', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', status: '', totalhr: '9', logonhr: '9', shortfall: '0:00', excess: 'true' },
    { id: 2, name: 'Lindsay Walton', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', status: '', totalhr: '9', logonhr: '9', shortfall: '0:00', excess: 'true' },
    { id: 3, name: 'Lindsay Walton', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', status: '', totalhr: '9', logonhr: '9', shortfall: '0:00', excess: 'true' },
    { id: 4, name: 'Lindsay Walton', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', status: '', totalhr: '9', logonhr: '9', shortfall: '0:00', excess: 'true' },
    // More people...
]


export default function AllAttendance() {
    const [empFor, setEmpFor] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [quickEdit, setQuickEdit] = useState(false)
    const [userattendanceId, setUserattendanceId] = useState<number | null>()
    const [inTime, setInTime] = useState('')
    const [outTime, setOutTime] = useState('')
    const [empName, setEmpName] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [search, setSearch] = useState(false)
    const cancelButtonRef = useRef(null)

    const [executeQuery, { loading, error, data: getUserattendanceById }] = useLazyQuery(GET_USER_ATTENDANCE_BY_ID);
    const { loading: getUserattendanceLoading, error: getUserattendanceError, data: getUserattendanceData, refetch } = useQuery(GET_USER_ATTENDANCE);

    console.log(getUserattendanceData);

    let itemlist = [];

    if (getUserattendanceData && getUserattendanceData.userattendences) {
        itemlist = getUserattendanceData.userattendences;
    }
    console.log(itemlist);
    // const people = [
    //     { id: 1, name: 'Shivam Chawla' },
    //     { id: 1, name: 'Neeru Verma' },
    //     { id: 1, name: 'Poorva Sharma' },
    //     { id: 1, name: 'Sarika Sharma' },
    //     { id: 1, name: 'Bhumika' },
    //     { id: 1, name: 'Gagan' },
    //     // More users...
    // ]


    function classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ')
    }

    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState(null)

    const handleButtonClick = (type: string, id: number | null) => {
        setQuickEdit(true)
        // setformType(type)
        console.log("id", id);
        // Add your logic here
        console.log("type", type);
        setUserattendanceId(id)
        console.log("userattendanceId", userattendanceId);


    };
    useEffect(() => {
        if (userattendanceId) {
            console.log(userattendanceId);
            executeQuery({ variables: { id: userattendanceId } });
            // console.log(getDivisionById);
        }
    }, [userattendanceId ,executeQuery]);

    useEffect(() => {
        if (getUserattendanceById && getUserattendanceById.userattendence) {
            const { userattendence } = getUserattendanceById; // Destructure the division object
            setInTime(userattendence.swipe_in);
            setOutTime(userattendence.swipe_out);
        }
    }, [getUserattendanceById]);

    // const filteredItemList =
    //     query === ''
    //         ? itemlist
    //         : itemlist.filter((item: { employee_name: string; }) => {
    //             return item.employee_name.toLowerCase().includes(query.toLowerCase())
    //         })
    const handleEmpValueChange = (newValue: { id: React.SetStateAction<string>; }) => {
        console.log(newValue);
        if (newValue) {
            setEmpFor(newValue.id);
        }

    };


    const filteredItemList = (empName === "") ? itemlist : itemlist.filter((item: { employee_name: string; attendance_date: Date }) => {
        const lowerEmpName = empName.toLowerCase();
        const itemDate = new Date(item.attendance_date);

        const matchesName = !empName || item.employee_name.toLowerCase().includes(lowerEmpName);

        const isDateInRange =
            (!fromDate || itemDate >= new Date(fromDate)) &&
            (!toDate || itemDate <= new Date(toDate));

        return matchesName && isDateInRange;
    });


    const statuses = [
        { id: 1, name: 'WO', value: 'Weekly Off' },
        { id: 2, name: 'P', value: 'Present' },
        { id: 3, name: 'NS', value: 'No Show' },
        // More items...
    ]
    const shortfall = [
        { id: 1, color: '#ff0000', greater: '1:00', less: '4:30' },
        { id: 2, color: '#ff8300', greater: '0:30', less: '1:00' },
        { id: 3, color: '#ffff00', greater: '0:15', less: '0:30' },
        { id: 4, color: '#ffffb3', greater: '0:10', less: '0:15' },
        // More items...
    ]
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            All Attendance
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className=" mb-4 px-4 py-4">

                    <form>
                        <div className="space-y-2">
                            <div className=" pb-4">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">  Search Attendance</h2>
                                {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                                    This information will be displayed publicly so be careful what you share.
                                </p> */}

                                {/* <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-3 gap-x-6 gap-y-2 lg:gap-y-8 "> */}
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-2">
                                        <div className="mt-1">
                                            <EmployeeSearch onEmpValueChange={handleEmpValueChange} heading={''} />
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
                                            <DatePicker selected={startDate} onChange=
                                                {(date: React.SetStateAction<Date>) => setStartDate(date)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                            />


                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            End Date
                                        </label>

                                        <div className="mt-3">
                                            <DatePicker selected={endDate} onChange=
                                                {(date: React.SetStateAction<Date>) => setEndDate(date)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
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
                                Search
                            </button>
                        </div>
                    </form>
                </div>


            </div>
            <div className=' rounded-lg border border-gray-300 bg-white mt-4'>
                <div className="px-4 sm:px-6 lg:px-8 mt-10 mb-10">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold leading-6 text-gray-900">My Logon Hours - Current Month</h1>
                            {/* <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your account including their name, title, email and role.
                        </p> */}
                            <ul role="list" className="py-2">
                                {statuses.map((item) => (
                                    <li key={item.id} className="py-0 text-gray-600 text-xs">
                                        {item.name} : {item.value}
                                    </li>
                                ))}
                                {shortfall.map((item) => (
                                    <li key={item.id} className="py-0 text-gray-600 text-xs mt-2">
                                        <span style={{ background: item.color }} className='px-2 h-1'></span>&nbsp;
                                        Shortfall &gt; {item.greater} & Shortfall &lt; {item.less}
                                    </li>
                                ))}

                            </ul>
                        </div>
                        {/* <div className="mt-4 lg:ml-16 ml-0 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Search
                            </button>
                        </div> */}
                    </div>
                    <div className="mt-2 flow-root">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="border-2 lg:border-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {table_header.map((val, index) => (

                                                    <th key={index} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        {val.name}
                                                    </th>
                                                ))}

                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Edit
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {itemlist.map((item: { id: any; employee_name: any; attendence_date: any; attendence_day: any; swipe_in: any; swipe_out: any; attendence_status: any; total_hours: any; late_hours: any; shortfall: any; excess_hours: any; }) => (
                                                <tr key={item.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {item.employee_name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.attendence_date}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.attendence_day}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.swipe_in}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.swipe_out}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.attendence_status}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.total_hours}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.late_hours}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.shortfall}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.excess_hours}</td> <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                        <a onClick={() => handleButtonClick('update', item.id)} className="text-indigo-600 hover:text-indigo-900">
                                                            Edit
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Transition.Root show={quickEdit} as={Fragment}>
                                    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setQuickEdit}>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                        </Transition.Child>

                                        <div className="fixed inset-0 z-10 overflow-y-auto">
                                            <div className="flex min-h-full items-end justify-center lg:p-4 -mt-32 lg:mt-0 text-center sm:items-center sm:p-0">
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                >
                                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 lg:w-full w-80 sm:max-w-lg sm:p-6">
                                                        <div className="space-y-2">
                                                            <div className="border-b border-gray-900/10 pb-4">
                                                                <h2 className="text-lg font-semibold leading-7 text-gray-900"> Add Attendance Notes</h2>
                                                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-1">
                                                                    <div className="sm:col-span-2">
                                                                        <div className="space-y-2 px-2 py-2">
                                                                            <div className="pb-4">
                                                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-4 ">
                                                                                    <div className="sm:col-span-1">
                                                                                        <div className="relative mt-2 rounded-md shadow-sm">
                                                                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                            </div>
                                                                                            <input
                                                                                                type="time"
                                                                                                name="email"
                                                                                                id="email"
                                                                                                // onChange={(e) => setDivisionName(e.target.value)}
                                                                                                // value={(formType == "update") ? divisionName : ""}
                                                                                                value={inTime}
                                                                                                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                placeholder="In Time"
                                                                                            />
                                                                                            {/* {dnameError && <p className="text-red-500 text-xs" >*Name is required</p>} */}
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="sm:col-span-1">
                                                                                        <div className="relative mt-2 rounded-md shadow-sm">
                                                                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                            </div>
                                                                                            <input
                                                                                                type="time"
                                                                                                name="email"
                                                                                                id="email"
                                                                                                // onChange={(e) => setDivisionCode(e.target.value)}
                                                                                                // value={(formType == "update") ? divisionCode : ""}
                                                                                                value={outTime}
                                                                                                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                placeholder="Out Time"
                                                                                            />
                                                                                            {/* {dcodeError && <p className="text-red-500 text-xs" >*Code is required</p>} */}
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="sm:col-span-2">
                                                                                        <div className="relative mt-2 rounded-md shadow-sm">
                                                                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                <Bars3Icon className="h-5 w-5 lg:-mt-16 text-gray-400" aria-hidden="true" />
                                                                                            </div>

                                                                                            <textarea
                                                                                                rows={4}
                                                                                                name="comment"
                                                                                                // onChange={(e) => setDivisionColor(e.target.value)}
                                                                                                // value={(formType == "update") ? divisionColor : ""}
                                                                                                // value={divisionColor}
                                                                                                id="comment"
                                                                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                defaultValue={''}
                                                                                                placeholder="Notes"
                                                                                            />
                                                                                        </div>
                                                                                    </div>



                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="lg:mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                                    <div className="lg:mt-5 sm:flex sm:flex-row-reverse">
                                                                        <button
                                                                            type="button"
                                                                            // onClick={handleSubmit}
                                                                            className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                        >
                                                                            Save
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="mt-3 ml-2 lg:ml-0 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                            onClick={() => setQuickEdit(false)}
                                                                            ref={cancelButtonRef}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition.Root>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}
