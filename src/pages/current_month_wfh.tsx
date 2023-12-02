import React, { Fragment, useState, useRef, useEffect } from 'react'
import { BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

const table_header = [
    { name: 'Type' },
    { name: 'By' },
    { name: 'Date' },
    { name: 'Manager Status' },
    { name: "Manager's Manager Status" },
    { name: 'Detail' },

];
const pending_leaves = [
    { id: 1, type: 'Short Leave', by: 'Shivam Chawla', applieddate: '04-07-2023', status: 'Pending', mstatus: 'Pending' },
    { id: 2, type: 'Short Leave', by: 'Zishan Khan', applieddate: '04-07-2023', status: 'Pending', mstatus: 'Pending' },
    { id: 3, type: 'WFH', by: '	Ayushi Chandra', applieddate: '04-07-2023', status: 'Pending', mstatus: 'Pending' },
    // More people...
]

const approved_leaves = [
    { id: 1, type: 'WFH', by: 'Neeru Verma', applieddate: '04-07-2023', status: 'Pending', mstatus: 'Approved' },
    { id: 2, type: 'Short Leave', by: 'Zishan Khan', applieddate: '04-07-2023', status: 'Pending', mstatus: 'Approved' },
    { id: 3, type: 'WFH', by: '	Ayushi Chandra', applieddate: '04-07-2023', status: 'Pending', mstatus: 'Approved' },
    // More people...
]

const rejected_leaves = [
    { id: 1, type: 'Full Day', by: 'Bhumika Bist', applieddate: '04-07-2023', status: 'Pending', mstatus: 'Rejected' },
    { id: 2, type: 'Short Leave', by: 'Zishan Khan', applieddate: '04-07-2023', status: 'Pending', mstatus: 'Rejected' },
    { id: 3, type: 'WFH', by: '	Ayushi Chandra', applieddate: '04-07-2023', status: 'Pending', mstatus: 'Rejected' },
    // More people...
]

export default function CurrentMonthWfh() {
    const [openTab, setOpenTab] = useState<number | null | undefined>(1);
    const [leavedetail, setLeaveDetail] = useState(false)
    const cancelButtonRef = useRef(null)

    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Current Month - WFH/Short Leave
                        </h2>
                    </div>
                </div>
            </div>
            <div>
                <div className="lg:w-96 ">
                    <ul
                        className="h-12 isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs"
                        role="tablist"
                    >
                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                            <a
                                className={
                                    "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                    (openTab === 1
                                        ? "border-indigo-500 text-indigo-600 "
                                        : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 ")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                <p className="font-normal text-base"> Pending</p>
                            </a>
                        </li>
                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                            <a
                                className={
                                    "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                    (openTab === 2
                                        ? "border-indigo-500 text-indigo-600 "
                                        : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                <p className="font-normal text-base"> Approved</p>
                            </a>
                        </li>
                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                            <a
                                className={
                                    "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                    (openTab === 3
                                        ? "border-indigo-500 text-indigo-600 "
                                        : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                <p className="font-normal text-base"> Rejected</p>
                            </a>
                        </li>

                    </ul>
                </div>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded mt-6">
                    <div className=" py-3 px-4 flex-auto">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <div className=' rounded-lg border border-gray-300 bg-white mb-4'>
                                    <div className=" mb-4 px-4 py-4">
                                        <form>
                                            <div className="space-y-2">
                                                <div className="lg:pb-4">
                                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-8 lg:grid-cols-2">
                                                        <div className="sm:col-span-1">
                                                            <div className="lg:w-96 mt-2 flex rounded-md shadow-sm">
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

                                                        <div className="sm:col-span-1">
                                                            <div className='mt-2 lg:text-right'>
                                                                <Link href="/search_wfh">
                                                                    <button
                                                                        type="button"
                                                                        className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex gap-x-1.5 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                                                    >
                                                                        Search WFH
                                                                    </button>
                                                                </Link>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>


                                            </div>


                                        </form>
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


                                                            <th className="py-3.5 pl-4 pr-3"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {pending_leaves.map((person) => (
                                                            <tr key={person.id}>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                    {person.type}
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.by}</td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.applieddate}</td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.status}</td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.mstatus}</td>
                                                                <td className="flex whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    <a onClick={() => setLeaveDetail(true)} className="bg-gray-100 text-gray-600 block px-4 py-2 ">Detail</a>
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        id="comments"
                                                                        aria-describedby="comments-description"
                                                                        name="comments"
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                    />
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
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <div className=' rounded-lg border border-gray-300 bg-white mb-4'>
                                    <div className=" mb-4 px-4 py-4">
                                        <form>
                                            <div className="space-y-2">
                                                <div className="lg:pb-4">
                                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-8 lg:grid-cols-2">
                                                        <div className="sm:col-span-1">
                                                            <div className="lg:w-96 mt-2 flex rounded-md shadow-sm">
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

                                                        <div className="sm:col-span-1">
                                                            <div className='mt-2 lg:text-right'>
                                                                <Link href="/search_wfh">
                                                                    <button
                                                                        type="button"
                                                                        className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex gap-x-1.5 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                                                    >
                                                                        Search WFH
                                                                    </button>
                                                                </Link>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>


                                            </div>


                                        </form>
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


                                                            <th className="py-3.5 pl-4 pr-3"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {approved_leaves.map((person) => (
                                                            <tr key={person.id}>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                    {person.type}
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.by}</td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.applieddate}</td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.status}</td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.mstatus}</td>
                                                                <td className="flex whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    <a onClick={() => setLeaveDetail(true)} className="bg-gray-100 text-gray-600 block px-4 py-2 ">Detail</a>
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        id="comments"
                                                                        aria-describedby="comments-description"
                                                                        name="comments"
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                    />
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
                            <div className={openTab === 3 ? "block" : "hidden"} id="link2">
                                <div className=' rounded-lg border border-gray-300 bg-white mb-4'>
                                    <div className=" mb-4 px-4 py-4">
                                        <form>
                                            <div className="space-y-2">
                                                <div className="lg:pb-4">
                                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-8 lg:grid-cols-2">
                                                        <div className="sm:col-span-1">
                                                            <div className="lg:w-96 mt-2 flex rounded-md shadow-sm">
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

                                                        <div className="sm:col-span-1">
                                                            <div className='mt-2 lg:text-right'>
                                                                <Link href="/search_wfh">
                                                                    <button
                                                                        type="button"
                                                                        className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex gap-x-1.5 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                                                    >
                                                                        Search WFH
                                                                    </button>
                                                                </Link>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>


                                            </div>


                                        </form>
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


                                                            <th className="py-3.5 pl-4 pr-3"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {rejected_leaves.map((person) => (
                                                            <tr key={person.id}>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                    {person.type}
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.by}</td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.applieddate}</td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.status}</td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.mstatus}</td>
                                                                <td className="flex whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    <a onClick={() => setLeaveDetail(true)} className="bg-gray-100 text-gray-600 block px-4 py-2 ">Detail</a>
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        id="comments"
                                                                        aria-describedby="comments-description"
                                                                        name="comments"
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                    />
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
                </div>
            </div>
            <Transition.Root show={leavedetail} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setLeaveDetail}>
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
                        <div className="flex min-h-full items-end justify-center lg:p-4 -mt-36 lg:mt-0 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative w-80 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div className="space-y-2">
                                        <div className="border-b border-gray-900/10 pb-4">
                                            <h2 className="text-lg font-semibold leading-7 text-gray-900">  WFH Detail</h2>


                                            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                <div className="sm:col-span-2">
                                                    <div className="mt-1">
                                                        <table className="min-w-full divide-y divide-gray-300">
                                                            <tr key="1">
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                    Date
                                                                </td>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                    2023-07-10
                                                                </td>

                                                            </tr>
                                                            <tr key="1">
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                    Type
                                                                </td>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                    WFH
                                                                </td>

                                                            </tr>
                                                            <tr key="1">
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                    Day type
                                                                </td>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                    Full Day
                                                                </td>

                                                            </tr>
                                                            <tr key="1">
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                    Description
                                                                </td>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                    water logging
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
                                                        onClick={() => setLeaveDetail(false)}
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
    )
}
