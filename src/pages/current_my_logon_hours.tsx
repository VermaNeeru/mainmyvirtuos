import DatePickerComp from '@/components/DatePickerComp/DatePickerComp';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER_ATTENDANCE_BY_DATE } from '@/graphql/Userattendance/queries';
import { getUserData } from '@/components/UserData';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const statuses = [
    { id: 1, name: 'WO', value: 'Weekly Off' },
    { id: 2, name: 'P', value: 'Present' },
    { id: 3, name: 'NS', value: 'No Show' },
    { id: 4, name: 'PH', value: 'Public Holiday' },
    { id: 5, name: 'HD', value: 'Half Day' },
    // More items...
]
const table_header = [
    { name: 'Name' },
    { name: 'Date' },
    { name: 'Day' },
    { name: 'In' },
    { name: 'Out' },
    { name: 'Status' },
    { name: 'Logon Hours' },
];
const people = [
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9' },

    // More people...
]
export default function CurrentMyLogonHours() {
    // const [executeQuery, { loading, error, data }] = useLazyQuery(GET_USER_ATTENDANCE_BY_DATE);
    const [startDate, setStartDate] = useState('');

    const handleStartDateChange = (newDate: any) => {
        setStartDate(newDate); // Update parent component's state
        console.log(newDate)

    };
    // console.log(startDate)
    const [endDate, setEndDate] = useState('');

    const handleEndDateChange = (newDate: any) => {
        setEndDate(newDate); // Update parent component's state
        console.log(endDate)
    };

    const [currentPage, setCurrentPage] = useState(1);
    const userData = getUserData();
    const [userId, setUserId] = useState<number | null | undefined>(userData?.id)
    const itemsPerPage = 3;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const displayData = people.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const fromDate = new Date();
    fromDate.setDate(1);
    const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);

    const date1 = (startDate && startDate !== "") ? startDate : fromDate.toISOString().split('T')[0];
    const date2 = (endDate && endDate !== "") ? endDate : toDate.toISOString().split('T')[0];

    // const date1 = "2023-08-01";
    // const date2 = "2023-08-30";


    // console.log('userId:', userId);
    // console.log('date_1:', date1);
    // console.log('date_2:', date2);
    const { loading, error, data } = useQuery(GET_USER_ATTENDANCE_BY_DATE, {
        variables: { userId: userId, startDate: date1, endDate: date2 },
    });

    if (loading) return <p>Loading...</p>;
    // console.log(error)
    if (error) return <p>Error: {error.message}</p>;
    // console.log(data);
    const itemList = data.findUserAttendance;
    console.log(itemList)

    // useEffect(() => {
    //     if (userId) {
    //         console.log(userId);
    //         console.log(date1);
    //         console.log(date2);

    //         // executeQuery({ variables: { userId: userId, startDate: date1, endDate: date2 } });
    //         // console.log(data);

    //     }
    // }, []);

    // useEffect(() => {
    //     if (userId) {
    //         executeQuery({ variables: { userId: userId, startDate: date1, endDate: date2 } });
    //     }
    // }, []);


    // useEffect(() => {
    //     try {
    //         if (data && data.findUserAttendance) {
    //             const { findUserAttendance } = data; // Destructure the division object
    //             console.log(findUserAttendance);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, [data]);

    const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(people.length / itemsPerPage);

    // if (loading) return <p>loading</p>; if (error) return <p>Error: {error.message}</p>;
    // console.log(data)
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            My Logon Hours - Current Month
                        </h2>
                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className=" mb-4 px-4 py-4">
                    <form>
                        <div className="space-y-2">
                            <div className=" lg:pb-4">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Search Logon Hours Report</h2>
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:gap-y-4 sm:grid-cols-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            Start Date
                                        </label>
                                        <div className="mt-3">
                                            <DatePickerComp onDateChange={handleStartDateChange} />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            End Date
                                        </label>
                                        <div className="mt-3">
                                            <DatePickerComp onDateChange={handleEndDateChange} />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <div className="lg:mt-8">
                                            <button
                                                type="submit"
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white mt-4'>
                <div className="px-4 mt-10 mb-10">
                    <div className=" sm:px-2 lg:px-2">
                        <div className="flex sm:items-center">
                            <div className="sm:flex-auto">
                                <ul role="list" className="py-0">
                                    {statuses.map((item) => (
                                        <li key={item.id} className="py-0 text-gray-600 text-xs">
                                            {item.name} : {item.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex mt-4 lg:ml-16 ml-40 sm:mt-0 ">
                                <Link href="/view_faq">
                                    <span
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        FAQ
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 flow-root">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="border-2 lg:border-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    {table_header.map((val, index) => (

                                                        <th scope="col" key={index} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                            {val.name}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {itemList.map((item: { employee_name: any; attendence_date: any; attendence_day: any; swipe_in: any; swipe_out: any; attendence_status: any; total_hours: any; }) => (
                                                    <tr key="1">
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            {item.employee_name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.attendence_date}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.attendence_day}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.swipe_in}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.swipe_out}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.attendence_status}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.total_hours}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                            </div>

                        </div>
                        <div className='mb-20 mt-6'>
                            <div className="flex absolute right-0 items-center pb-10 pr-20">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={
                                        "px-3 py-2 text-sm font-medium" +
                                        (currentPage === 1
                                            ? " text-gray-400"
                                            : "px-3 py-2 text-sm font-medium text-gray-700")
                                    }
                                >
                                    Previous
                                </button>
                                <p className="h-8 w-8 mr-2 bg-sky-500 rounded-full text-white flex items-center justify-center font-semibold">
                                    {currentPage}
                                </p>
                                <p className="text-gray-500"> of</p>

                                <p className="ml-2 h-8 w-8 bg-gray-500 rounded-full text-white flex items-center justify-center font-semibold">
                                    {totalPages}
                                </p>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={
                                        "px-3 py-2 text-sm font-medium" +
                                        (currentPage === totalPages
                                            ? " text-gray-400"
                                            : "px-3 py-2 text-sm font-medium text-gray-700")
                                    }
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
