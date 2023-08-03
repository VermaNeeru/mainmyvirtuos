import DatePickerComp from '@/components/DatePickerComp/DatePickerComp';
import Link from 'next/link';
import React, { useState } from 'react'



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
const shortfall = [
    { id: 1, color: '#ff0000', greater: '1:00', less: '4:30' },
    { id: 2, color: '#ff8300', greater: '0:30', less: '1:00' },
    { id: 3, color: '#ffff00', greater: '0:15', less: '0:30' },
    { id: 4, color: '#ffffb3', greater: '0:10', less: '0:15' },
    // More items...
]
const table_header = [
    { name: 'Name' },
    { name: 'Date' },
    { name: 'Day' },
    { name: 'In' },
    { name: 'Out' },
    { name: 'Status' },
    { name: 'Reason' },
    { name: 'Shortfall' },
    { name: 'Notes' },
];
const people = [
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9', reason: 'Traffic', shortfall: '30min', notes: 'Traffic' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9', reason: 'Traffic', shortfall: '30min', notes: 'Traffic' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9', reason: 'Traffic', shortfall: '30min', notes: 'Traffic' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9', reason: 'Traffic', shortfall: '30min', notes: 'Traffic' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9', reason: 'Traffic', shortfall: '30min', notes: 'Traffic' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9', reason: 'Traffic', shortfall: '30min', notes: 'Traffic' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9', reason: 'Traffic', shortfall: '30min', notes: 'Traffic' },
    { name: 'Lindsay Walton', ldate: '03-08-2023', day: 'Thursday', in: '9:00AM', out: '6:00PM', status: 'Active', logonHours: '9', reason: 'Traffic', shortfall: '30min', notes: 'Traffic' },

    // More people...
]
export default function CurrentMyAttendance() {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const displayData = people.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(people.length / itemsPerPage);
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            My Attendance - Current Month
                        </h2>
                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className=" mb-4 px-4 py-4">
                    <form>
                        <div className="space-y-2">
                            <div className=" lg:pb-4">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Search Attendance</h2>
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:gap-y-4 sm:grid-cols-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            Start Date
                                        </label>
                                        <div className="mt-3">
                                            <DatePickerComp />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            End Date
                                        </label>
                                        <div className="mt-3">
                                            <DatePickerComp />
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
                                <ul role="list" className="py-0 -mt-2">
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
                            <div className="flex -mt-2 lg:ml-16 ml-12  lg:-mt-40 ">
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
                                                {displayData.map((person) => (
                                                    <tr key="1">
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            {person.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.ldate}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.day}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.in}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.out}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.status}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.reason}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.shortfall}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.notes}</td>
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
