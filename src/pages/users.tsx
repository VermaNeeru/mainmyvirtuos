import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon, UserIcon } from '@heroicons/react/20/solid'
import Alert from '@/Component/Alert';
import Image from 'next/image';
const table_header = [
    { name: 'Name' },
    { name: 'Avtar' },
    { name: 'Email' },
    { name: 'Mobile' },
    { name: 'Joining Date' },
    { name: 'Status' },
    { name: 'Action' },
];
const active_extension_list = [
    { id: 1, ename: 'Shivam Chawla', department: 'PS', division: 'ACE', avtar: 'https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png', designation: 'Application Engineer II', email: 'test@virtuos.com', extn: '123', mobile: '1234567890', joining_date: '16-09-2021', status: 'Active' },
    { id: 2, ename: 'Gagan Bhatia', department: 'PS', division: 'ACE', avtar: 'https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png', designation: 'Business Development Consultant', email: 'test@virtuos.com', extn: '123', mobile: '1234567890', joining_date: '16-09-2021', status: 'Active' },
    { id: 3, ename: 'Neeru Verma', department: 'PS', division: 'ACE', avtar: 'https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png', designation: 'Application Engineer II', email: 'test@virtuos.com', extn: '123', mobile: '1234567890', joining_date: '16-09-2021', status: 'Active' },
    { id: 3, ename: 'Bhumika', department: 'PS', division: 'ACE', avtar: 'https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png', designation: 'Application Engineer II', email: 'test@virtuos.com', extn: '123', mobile: '1234567890', joining_date: '16-09-2021', status: 'Active' },
    { id: 3, ename: 'Rahul', department: 'PS', division: 'ACE', avtar: 'https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png', designation: 'Application Engineer II', email: 'test@virtuos.com', extn: '123', mobile: '1234567890', joining_date: '16-09-2021', status: 'Active' },
    // More people...
]

const inactive_extension_list = [
    { id: 1, ename: 'XYZ', department: 'PS', division: 'ACE', avtar: 'https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png', designation: 'Application Engineer II', email: 'test@virtuos.com', extn: '123', mobile: '1234567890', joining_date: '16-09-2021', status: 'Inactive' },
    { id: 2, ename: 'ABC', department: 'PS', division: 'ACE', avtar: 'https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png', designation: 'Business Development Consultant', email: 'test@virtuos.com', extn: '123', mobile: '1234567890', joining_date: '16-09-2021', status: 'Inactive' },
    // More people...
]

const ex_extension_list = [
    { id: 1, ename: 'Sristy', department: 'PS', division: 'ACE', avtar: 'https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png', designation: 'Application Engineer II', email: 'test@virtuos.com', extn: '123', mobile: '1234567890', joining_date: '16-09-2021', status: 'Ex' },
    { id: 2, ename: 'Ruman', department: 'PS', division: 'ACE', avtar: 'https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png', designation: 'Business Development Consultant', email: 'test@virtuos.com', extn: '123', mobile: '1234567890', joining_date: '16-09-2021', status: 'Ex' },
    // More people...
]

export default function Users() {
    const [openTab, setOpenTab] = useState<number>(1);
    const [showDeleteMessage, setshowDeleteMessage] = useState(false);
    const [updateLeaves, setUpdateLeaves] = useState(false)
    const [quickEdit, setQuickEdit] = useState(false)

    const cancelButtonRef = useRef(null)


    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Employee List <span className='text-xs text-gray-600'>2023</span>
                        </h2>

                    </div>
                </div>
            </div>
            <div>
                <div className="lg:w-full ">
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
                                <p className="font-normal text-base">Active Employees</p>
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
                                <p className="font-normal text-base">Inactive Employees</p>
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
                                <p className="font-normal text-base">Ex Employees</p>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded mt-6">
                    <div className=" py-3 px-4 flex-auto">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
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
                                                    {active_extension_list.map((person) => (
                                                        <tr key={person.id}>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.ename}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                <Image loader={({ src }) => `${src}`} src={person.avtar} width={100} height={100} alt='avtar' className='w-14 h-14 rounded-full' />
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.mobile}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.joining_date}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
                                                                                    <Link href="/edit_user">
                                                                                        <span className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Edit</span>
                                                                                    </Link>

                                                                                </Menu.Item>

                                                                                <Menu.Item>
                                                                                    <a onClick={() => setUpdateLeaves(true)} className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Update Leaves</a>
                                                                                </Menu.Item>

                                                                                <Menu.Item>
                                                                                    <a onClick={() => setQuickEdit(true)} className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Quick Edit</a>
                                                                                </Menu.Item>

                                                                                <Menu.Item>
                                                                                    <Link href="/profile">
                                                                                        <span className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">View Profile</span>
                                                                                    </Link>
                                                                                </Menu.Item>

                                                                                <Menu.Item>
                                                                                    <a onClick={() => setUpdateLeaves(true)} className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Active</a>
                                                                                </Menu.Item>

                                                                                <Menu.Item>
                                                                                    <a onClick={() => setUpdateLeaves(true)} className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Inactive</a>
                                                                                </Menu.Item>

                                                                                <Menu.Item>
                                                                                    <a onClick={() => setUpdateLeaves(true)} className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Upload Document</a>
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
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                Inactive
                            </div>
                            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                Ex
                            </div>

                        </div>

                        <Transition.Root show={updateLeaves} as={Fragment}>
                            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setUpdateLeaves}>
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
                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Update Annual Leaves</h2>
                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                            <div className="sm:col-span-2">
                                                                <div className="mt-1">
                                                                    <table className="min-w-full divide-y divide-gray-300">
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                Sick Leave
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                <input
                                                                                    type="email"
                                                                                    name="email"
                                                                                    id="email"
                                                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                    placeholder="SL"
                                                                                />
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                Casual Leave
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                <input
                                                                                    type="email"
                                                                                    name="email"
                                                                                    id="email"
                                                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                    placeholder="CL"
                                                                                />
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                Earned Leave
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                <input
                                                                                    type="email"
                                                                                    name="email"
                                                                                    id="email"
                                                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                    placeholder="EL"
                                                                                />
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
                                                                    className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className=" mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                    onClick={() => setUpdateLeaves(false)}
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
                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Quick Edit</h2>
                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                            <div className="sm:col-span-2">
                                                                <div className="space-y-2 px-2 py-2">
                                                                    <div className="pb-4">
                                                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                                            <div className="sm:col-span-1">
                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                        <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                    </div>
                                                                                    <input
                                                                                        type="email"
                                                                                        name="email"
                                                                                        id="email"
                                                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                        placeholder="you@example.com"
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="sm:col-span-1">
                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                        <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                    </div>
                                                                                    <input
                                                                                        type="email"
                                                                                        name="email"
                                                                                        id="email"
                                                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                        placeholder="you@example.com"
                                                                                    />
                                                                                </div>
                                                                            </div>




                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                                <button
                                                                    type="button"
                                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
    )
}
