import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon, DocumentArrowDownIcon } from '@heroicons/react/20/solid'
import Alert from '@/Component/Alert';
const table_header = [
    { name: 'Document Name' },
    { name: 'Added On' },
    { name: 'Attachment' },
    { name: 'Action' },
];
const modules = [
    { id: 1, dname: 'Anti harassment & Anti discrimination Policy', added_on: '2022-04-06 10:26:24' },
    { id: 2, dname: 'Books for Lending and Learning_Virtuos', added_on: '2022-04-08 12:15:11' },
    { id: 3, dname: 'Social Media Policy', added_on: '2022-04-12 08:38:55' },
    { id: 4, dname: 'The Health, Wellness & Safety Policy', added_on: '2022-04-19 04:39:33' },
    { id: 5, dname: 'Virtuos 360 Outlook', added_on: '2022-04-06 10:28:16' },
    // More people...
]

export default function AllPublicDocumentList() {
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
                            Manage Public Documents
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
                            <div className="mt-4 lg:ml-16 ml-10 sm:mt-0 sm:flex-none lg:flex lg:space-x-2">
                                <Link href="/upload_public_document" >
                                    <span
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Public Documents
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.dname}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.added_on}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                <DocumentArrowDownIcon className="h-6 w-6 text-gray-500" />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                <Menu as="div" className="relative inline-block text-left">
                                                    <div>
                                                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                            Actions
                                                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </Menu.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <div className="py-1">
                                                                <Menu.Item>
                                                                    <Link href="/upload_public_document" >
                                                                        <span className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Edit</span>
                                                                    </Link>
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    <a onClick={() => setshowDeleteMessage(true)} className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Delete</a>
                                                                </Menu.Item>
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
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
    )
}
