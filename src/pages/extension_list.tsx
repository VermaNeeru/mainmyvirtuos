import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import Alert from '@/Component/Alert';
import Image from 'next/image';
const table_header = [
    { name: 'Name' },
    { name: 'Apartment' },
    { name: 'Division' },
    { name: 'Avtar' },
    { name: 'Designation' },
    { name: 'Email(Official)' },
    { name: 'Extn' },
    { name: 'Mobile(Official)' },
];
const extension_list = [
    { id: 1, ename: 'Shivam Chawla', department: 'PS', division: 'ACE', avtar: 'https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png', designation: 'Application Engineer II', email: 'test@virtuos.com', extn: '123', mobile: '1234567890' },
    { id: 2, ename: 'Gagan Bhatia', department: 'PS', division: 'ACE', avtar: 'https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png', designation: 'Business Development Consultant', email: 'test@virtuos.com', extn: '123', mobile: '1234567890' },
    { id: 3, ename: 'Neeru Verma', department: 'PS', division: 'ACE', avtar: 'https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png', designation: 'Application Engineer II', email: 'test@virtuos.com', extn: '123', mobile: '1234567890' },
    // More people...
]

export default function ExtensionList() {
    const [showDeleteMessage, setshowDeleteMessage] = useState(false);
    const [isuuedetail, setIssueDetail] = useState(false)

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
                            Company Directory <span className='text-xs text-gray-600'>2023</span>
                        </h2>
                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className="px-4 sm:px-2 lg:px-1 mt-4 mb-10">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
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

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {extension_list.map((person) => (
                                        <tr key={person.id}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.ename}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.department}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.division}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <Image loader={({ src }) => `${src}`} src={person.avtar} width={100} height={100} alt='avtar' className='w-14 h-14 rounded-full' />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.designation}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.extn}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.mobile}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Transition.Root show={isuuedetail} as={Fragment}>
                                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIssueDetail}>
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
                                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                            >
                                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                                    <div className="space-y-2">
                                                        <div className="border-b border-gray-900/10 pb-4">
                                                            <h2 className="text-lg font-semibold leading-7 text-gray-900">Issue Detail</h2>
                                                            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                                <div className="sm:col-span-2">
                                                                    <div className="mt-1">
                                                                        <table className="min-w-full divide-y divide-gray-300">
                                                                            <tr key="1">
                                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                    By
                                                                                </td>
                                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                    Aashima Narang
                                                                                </td>

                                                                            </tr>
                                                                            <tr key="1">
                                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                    Related To
                                                                                </td>
                                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                    Permission to access the shared folder on the server
                                                                                </td>

                                                                            </tr>
                                                                            <tr key="1">
                                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                    Description
                                                                                </td>
                                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                    We(Click team) were having problem in<br />  sharing the Click code, for solving our<br />  problem Yash created a shared folder<br />  on the server. We were able to access<br />  that folder in the old office, but in the <br />
                                                                                    new office there is some permission issue <br /> and we cannot access that folder.
                                                                                </td>

                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                                    <button
                                                                        type="button"
                                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                        onClick={() => setIssueDetail(false)}
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
    )
}
