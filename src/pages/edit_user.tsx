import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import Alert from '@/Component/Alert';
import Image from 'next/image';

export default function AllLeaves() {
    const [openTab, setOpenTab] = useState<number>(1);

    const [leavedetail, setLeaveDetail] = useState(false)
    const [changeleavestatus, setChangeLeaveStatus] = useState(false)

    const cancelButtonRef = useRef(null)

    const [showUpdateMessage, setshowUpdateMessage] = useState(false);
    const [showDeleteMessage, setshowDeleteMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('update', showUpdateMessage)
            console.log('delete', showDeleteMessage)
            setshowUpdateMessage(false);
            setshowDeleteMessage(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [showUpdateMessage, showDeleteMessage]);
    function setUpdateAlert(arg0: string): void {
        throw new Error('Function not implemented.');
    }

    function setDeleteAlert(arg0: string): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className=' w-full rounded px-2'>
            {showUpdateMessage && (
                <Alert message="Please select leaves/status to update!" />
            )}
            {showDeleteMessage && (
                <Alert message="Please select leaves to delete!" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Edit User
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
                                <p className="font-normal text-base">Basic Information</p>
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
                                <p className="font-normal text-base">Family Inforamtion</p>
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
                                <p className="font-normal text-base">Qualificaiton</p>
                            </a>
                        </li>
                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                            <a
                                className={
                                    "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                    (openTab === 4
                                        ? "border-indigo-500 text-indigo-600 "
                                        : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(4);
                                }}
                                data-toggle="tab"
                                href="#link4"
                                role="tablist"
                            >
                                <p className="font-normal text-base">Bank Information</p>
                            </a>
                        </li>
                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                            <a
                                className={
                                    "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                    (openTab === 5
                                        ? "border-indigo-500 text-indigo-600 "
                                        : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(5);
                                }}
                                data-toggle="tab"
                                href="#link5"
                                role="tablist"
                            >
                                <p className="font-normal text-base">Work Experience</p>
                            </a>
                        </li>
                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                            <a
                                className={
                                    "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                    (openTab === 6
                                        ? "border-indigo-500 text-indigo-600 "
                                        : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(6);
                                }}
                                data-toggle="tab"
                                href="#link6"
                                role="tablist"
                            >
                                <p className="font-normal text-base">Uploads</p>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded mt-6">
                    <div className=" py-3 px-4 flex-auto">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                Basic Information
                                <div className="flex ...">
                                    <div className="w-3/4 ...">  <div className=" mb-4 px-2 py-2">
                                        <form>
                                            <div className="space-y-2">
                                                <div className="border-b border-gray-900/10 pb-4">

                                                    <div className="mt-2 grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                        <div className="sm:col-span-1">
                                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    id="email"
                                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    placeholder="First Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    id="email"
                                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    placeholder="Middle Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    id="email"
                                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    placeholder="Last Name"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="mt-2 grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                        <div className="sm:col-span-1">
                                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    id="email"
                                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    placeholder="Password"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    id="email"
                                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    placeholder="Personal Email *"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="mt-8 mb-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">

                                                        <div className="sm:col-span-6">
                                                            <div className="relative">
                                                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                                    <div className="w-full border-t border-gray-300" />
                                                                </div>
                                                                <div className="relative flex justify-center">
                                                                    <span className="bg-white px-2 text-sm text-indigo-500">Permanent Address</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                        <div className="sm:col-span-6">
                                                            <textarea
                                                                rows={2}
                                                                name="comment"
                                                                id="comment"
                                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                defaultValue={''}
                                                                placeholder="Google Drive Link"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-8 mb-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">

                                                        <div className="sm:col-span-6">
                                                            <div className="relative">
                                                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                                    <div className="w-full border-t border-gray-300" />
                                                                </div>
                                                                <div className="relative flex justify-center">
                                                                    <span className="bg-white px-2 text-sm text-indigo-500">OR</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                        <div className="sm:col-span-1">
                                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-800">
                                                                Attachement
                                                            </label>


                                                            <input
                                                                type="file"
                                                                name="email"
                                                                id="email"
                                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                placeholder="Attachement"
                                                            />
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" items-center">
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div></div>
                                    <div className="w-1/4 ... ">
                                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 text-center sm:grid-cols-1 md:grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-1 xl:grid-cols-1">
                                            <div>
                                                <div className=' border-dashed border-2 border-sky-600 px-2 py-2'>
                                                    <Image loader={({ src }) => `${src}`} width={100} height={100} className="mx-auto h-32 w-32 rounded" src="https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png" alt="" />

                                                </div>
                                                {/* <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">person.name</h3>
                                                <p className="text-sm leading-6 text-gray-600">person.role</p> */}
                                                <button className="w-full mt-6 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >Change</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                Family Inforamtion
                            </div>
                            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                Qualificaiton
                            </div>
                            <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                                Bank Information
                            </div>
                            <div className={openTab === 5 ? "block" : "hidden"} id="link4">
                                Work Experience
                            </div>
                            <div className={openTab === 6 ? "block" : "hidden"} id="link4">
                                Uploads
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
                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">  Leave Days</h2>


                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                            <div className="sm:col-span-2">
                                                                <div className="mt-1">
                                                                    <table className="min-w-full divide-y divide-gray-300">
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                No. of Leaves Available
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                -3
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                No. of Leaves Requested
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                1
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                Reason for Applying leave
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                Fever
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                Leave Date
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                June 12th, 2023 (Monday)
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                Leave Type
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                Full Day
                                                                            </td>
                                                                        </tr>

                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                Status
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                Approved
                                                                            </td>
                                                                        </tr>

                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                By
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                Amarinder Singh
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
                        <Transition.Root show={changeleavestatus} as={Fragment}>
                            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setChangeLeaveStatus}>
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
                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">  Change Leave Status</h2>


                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                            <div className="sm:col-span-2">
                                                                <div className="mt-1">
                                                                    <form>
                                                                        <div className="space-y-2">
                                                                            <div className="border-b border-gray-900/10 pb-4">
                                                                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                                                    <div className="sm:col-span-6">
                                                                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                            Leave Status
                                                                                        </label>
                                                                                        <div className="mt-3">
                                                                                            <select
                                                                                                id="location"
                                                                                                name="location"
                                                                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                defaultValue="Canada"
                                                                                            >
                                                                                                <option>Approved</option>
                                                                                                <option>Pending</option>
                                                                                                <option>Rejected</option>
                                                                                            </select>

                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="sm:col-span-6">
                                                                                        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">

                                                                                            <textarea
                                                                                                rows={2}
                                                                                                name="description"
                                                                                                id="description"
                                                                                                className="h-36 px-2 py-2 block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                                                placeholder="Status Change Note"
                                                                                                defaultValue={''}
                                                                                            />


                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                                <button
                                                                    type="submit"
                                                                    className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                >
                                                                    Change Leave Status
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                    onClick={() => setChangeLeaveStatus(false)}
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
