import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import Alert from '@/Component/Alert';
const table_header = [
    { name: 'User Name' },
    { name: 'Leave Type' },
    { name: 'Balance' },
];
const modules = [
    { id: 1, uname: 'Neeru', leave_type: 'SL', balance: '1' },
    { id: 1, uname: 'Gagan', leave_type: 'CL', balance: '1' },
    { id: 1, uname: 'Shivam', leave_type: 'EL', balance: '2' },
    { id: 1, uname: 'Neeru', leave_type: 'SL', balance: '1' },
    { id: 1, uname: 'Gagan', leave_type: 'CL', balance: '1' },
    { id: 1, uname: 'Shivam', leave_type: 'EL', balance: '2' },
    // More people...
]

export default function LeaveBalanceUpload() {
    const [showDeleteMessage, setshowDeleteMessage] = useState(false);
    const [quickEdit, setQuickEdit] = useState(false)
    const cancelButtonRef = useRef(null)

    return (
        <div className=' w-full rounded px-2'>
            {showDeleteMessage && (
                <Alert message="Are you sure you want to delete these Category(s)?" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Manage User Leaves
                        </h2>
                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className="px-4 sm:px-2 lg:px-1 mt-4 mb-10">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
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
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none lg:flex lg:space-x-2">
                                <button
                                    type="button"
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Bulk Upload
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
                                    {modules.map((person) => (
                                        <tr key={person.id}>

                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.uname}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.leave_type}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.balance}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
