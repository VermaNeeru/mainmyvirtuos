import React, { Fragment, useState, useRef, useEffect } from 'react'
import { BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

const table_header = [
    { name: 'By' },
    { name: 'For' },
    { name: 'Type' },
    { name: 'Item' },
    { name: "Quantity" },
    { name: 'Req On' },
    { name: 'Status' },

];
const pending_leaves = [
    { id: 1, type: 'IT Related', by: 'Shivam Chawla', fordate: '04-07-2023', reqon: '12-07-2023', quantity: '1', item: 'Laptop..', status: 'Pending', mstatus: 'Pending' },
    { id: 2, type: 'IT Related', by: 'Zishan Khan', fordate: '04-07-2023', reqon: '12-07-2023', quantity: '1', item: 'Laptop..', status: 'Pending', mstatus: 'Pending' },
    { id: 3, type: 'Stationary', by: '	Ayushi Chandra', fordate: '04-07-2023', reqon: '12-07-2023', quantity: '1', item: 'pens..', status: 'Pending', mstatus: 'Pending' },
    // More people...
]

const approved_leaves = [
    { id: 1, type: 'Dongle', by: 'Neeru Verma', fordate: '04-07-2023', reqon: '12-07-2023', quantity: '1', item: 'GC-Order Task..', status: 'Pending', mstatus: 'Approved' },
    { id: 2, type: 'IT Related', by: 'Zishan Khan', fordate: '04-07-2023', reqon: '12-07-2023', quantity: '1', item: 'Laptop..', status: 'Pending', mstatus: 'Approved' },
    { id: 3, type: 'Stationary', by: '	Ayushi Chandra', fordate: '04-07-2023', reqon: '12-07-2023', quantity: '1', item: 'pens..', status: 'Pending', mstatus: 'Approved' },
    // More people...
]

const rejected_leaves = [
    { id: 1, type: 'IT Related', by: 'Bhumika Bist', fordate: '04-07-2023', reqon: '12-07-2023', quantity: '1', item: 'pens..', status: 'Pending', mstatus: 'Rejected' },
    { id: 2, type: 'IT Related', by: 'Zishan Khan', fordate: '04-07-2023', reqon: '12-07-2023', quantity: '1', item: 'pens..', status: 'Pending', mstatus: 'Rejected' },
    { id: 3, type: 'Stationary', by: '	Ayushi Chandra', fordate: '04-07-2023', reqon: '12-07-2023', quantity: '1', item: 'pens..', status: 'Pending', mstatus: 'Rejected' },
    // More people...
]

export default function AllRequisitions() {
    const [openTab, setOpenTab] = useState<number>(1);
    const [reqdetail, setReqDetail] = useState(false)
    const cancelButtonRef = useRef(null)

    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            All Requistions
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
                                                <div className="pb-4">
                                                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
                                                    {pending_leaves.map((person) => (
                                                        <tr key={person.id}>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.by}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.fordate}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.type}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.item}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.quantity}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.reqon}
                                                                <span onClick={() => setReqDetail(true)} className=" text-indigo-600 text-sm font-medium">..See More</span>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <div className=' rounded-lg border border-gray-300 bg-white mb-4'>
                                    <div className=" mb-4 px-4 py-4">

                                        <form>
                                            <div className="space-y-2">
                                                <div className=" pb-4">
                                                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
                                                    {approved_leaves.map((person) => (
                                                        <tr key={person.id}>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.by}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.fordate}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.type}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.item}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.quantity}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.reqon}
                                                                <span onClick={() => setReqDetail(true)} className=" text-indigo-600 text-sm font-medium">..See More</span>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={openTab === 3 ? "block" : "hidden"} id="link2">
                                <div className=' rounded-lg border border-gray-300 bg-white mb-4'>
                                    <div className=" mb-4 px-4 py-4">

                                        <form>
                                            <div className="space-y-2">
                                                <div className="pb-4">
                                                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
                                                    {rejected_leaves.map((person) => (
                                                        <tr key={person.id}>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.by}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.fordate}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.type}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.item}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.quantity}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.reqon}
                                                                <span onClick={() => setReqDetail(true)} className=" text-indigo-600 text-sm font-medium">..See More</span>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
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
            <Transition.Root show={reqdetail} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setReqDetail}>
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
                                            <h2 className="text-lg font-semibold leading-7 text-gray-900">Requisition Detail</h2>


                                            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                <div className="sm:col-span-2">
                                                    <div className="mt-1">
                                                        <table className="min-w-full divide-y divide-gray-300">
                                                            <tr key="1">
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                    By
                                                                </td>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                    Test A
                                                                </td>

                                                            </tr>
                                                            <tr key="1">
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                    For
                                                                </td>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                    0000-00-00
                                                                </td>

                                                            </tr>
                                                            <tr key="1">
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                    Item
                                                                </td>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                    Pens
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
                                                        onClick={() => setReqDetail(false)}
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
