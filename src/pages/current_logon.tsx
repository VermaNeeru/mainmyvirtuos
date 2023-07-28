import React, { useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link';
const table_header = [
    { name: 'Name' },
    { name: 'Date' },
    { name: 'Day' },
    { name: 'In Time' },
    { name: 'Out Time' },
    { name: 'Logon Hours' },
    { name: 'Status' },
    { name: 'Shortfall' },
    { name: 'Excess' },
    { name: 'Reason' },
];
const user_attendance = [
    { id: 1, name: 'Shivam', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', logonhrs: '9.10', status: 'Pending', shortfall: '0:00', excess: 'excess', reason: 'Rain' },
    { id: 1, name: 'Gagan', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', logonhrs: '9.10', status: 'Pending', shortfall: '0:00', excess: 'excess', reason: 'Rain' },
    { id: 1, name: 'Neeru', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', logonhrs: '9.10', status: 'Pending', shortfall: '0:00', excess: 'excess', reason: 'Rain' },
    // More people...
]


export default function CurrentLogon() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const people = [
        { id: 1, name: 'Shivam Chawla' },
        { id: 1, name: 'Neeru Verma' },
        { id: 1, name: 'Poorva Sharma' },
        { id: 1, name: 'Sarika Sharma' },
        { id: 1, name: 'Bhumika' },
        { id: 1, name: 'Gagan' },
        // More users...
    ]

    function classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ')
    }

    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState(null)

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

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
                            Current Month - Logon Report
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white mt-4'>

                <div className="px-4 sm:px-6 lg:px-8 mt-2 mb-10">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <ul role="list" className="py-2">
                                {shortfall.map((item) => (
                                    <li key={item.id} className="py-0 text-gray-600 text-xs mt-2">
                                        <span style={{ background: item.color }} className='px-2 h-1'></span>&nbsp;
                                        Shortfall &gt; {item.greater} & Shortfall &lt; {item.less}
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>
                    <div className="sm:flex sm:items-center mt-4">
                        <div className="sm:flex-auto">
                            {/* <h1 className="text-base font-semibold leading-6 text-gray-900">My Logon Hours - Current Month</h1> */}
                            <div className="lg:w-96 mt-1 flex rounded-md shadow-sm">
                                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="John Smith"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 sm:ml-16 gap-x-2 sm:mt-0 flex">
                            <Link href="/logon" >
                                <span
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Search
                                </span>
                            </Link>
                            <Link href="/attendance" >
                                <span
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Back
                                </span>
                            </Link>

                        </div>
                    </div>

                    <div className="mt-2 flow-root">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {table_header.map((val, index) => (
                                                    <th key={index} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        {val.name}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {user_attendance.map((person) => (
                                                <tr key={person.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {person.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.date}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.day}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.in}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.out}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.logonhrs}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.status}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.shortfall}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.excess}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.reason}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}
