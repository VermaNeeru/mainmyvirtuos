import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon, DocumentArrowDownIcon } from '@heroicons/react/20/solid'
import Alert from '@/components/Alert';

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_CURRENT_MY_ATTENDANCE } from '@/graphql/Userattendance/queries';
import { getUserData } from '@/components/UserData';

const table_header = [
    { name: 'Uploaded For' },
    { name: 'Uploaded On' },
    { name: 'Type' },
    { name: 'Comments' },
    { name: 'Attachment' },
];
const modules = [
    { id: 1, uname: 'Shivam Chawla', stype: "In-Out", comment: "Test", uploaded_on: '2022-04-06 10:26:24' },
    { id: 2, uname: 'Gagan Bhatia', stype: "In-Out", comment: "Test", uploaded_on: '2022-04-08 12:15:11' },
    { id: 3, uname: 'Poorva Sharma', stype: "Logon", comment: "Test", uploaded_on: '2022-04-12 08:38:55' },
    { id: 4, uname: 'Sarika Sharma', stype: "In-Out", comment: "Test", uploaded_on: '2022-04-19 04:39:33' },
    { id: 5, uname: 'Bhumika Bist', stype: "In-Out", comment: "Test", uploaded_on: '2022-04-06 10:28:16' },
    // More people...
]

export default function UploadAttendance() {
    const [showDeleteMessage, setshowDeleteMessage] = useState(false);
    const [quickEdit, setQuickEdit] = useState(false)
    const userData = getUserData();
    const [userId, setUserId] = useState<number | null | undefined>(userData?.id)
    const cancelButtonRef = useRef(null)

    const fromDate = new Date();
    fromDate.setDate(1);
    const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);

    const date1 = fromDate.toISOString().split('T')[0];
    const date2 = toDate.toISOString().split('T')[0];

    const { loading, error, data } = useQuery(GET_CURRENT_MY_ATTENDANCE, {
        variables: { userId: userId, startDate: date1, endDate: date2 },
    });

    if (loading) return <p>Loading...</p>;
    // console.log(error)
    if (error) return <p>Error: {error.message}</p>;
    // console.log(data);
    const itemList = data.currentMyAttendance;
    console.log(itemList)
    return (
        <div className=' w-full rounded px-2'>
            {showDeleteMessage && (
                <Alert message="Are you sure you want to delete these Category(s)?" alertState={false} onAlertStateChange={function (newState: boolean): void {
                    throw new Error('Function not implemented.');
                } } />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Upload Attendance Sheet
                        </h2>
                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className="px-4 sm:px-2 lg:px-1 mt-4 mb-10">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <div className="lg:w-96 mt-1 lg:ml-2  flex rounded-md shadow-sm">
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
                                    className="relative bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 lg:ml-16 ml-0 sm:mt-0 sm:flex-none lg:flex lg:space-x-2">
                            <Link href="/upload_attendance_sheet" >
                                <span
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Upload Attendance Sheet
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-2 flow-root">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="border-2 lg:border-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="flex py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    <input
                                                        id="comments"
                                                        aria-describedby="comments-description"
                                                        name="comments"
                                                        type="checkbox"
                                                        className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <TrashIcon className="h-6 w-6 text-gray-500" />
                                                </th>

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
                                                    <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        <input
                                                            id="comments"
                                                            aria-describedby="comments-description"
                                                            name="comments"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.uname}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.uploaded_on}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.stype}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.comment}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                        <DocumentArrowDownIcon className="h-6 w-6 text-gray-500" />
                                                    </td>

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

        </div>
    )
}
