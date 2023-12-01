import UpcomingEvent from '@/components/UpcomingEvent'
import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import DatePickerComp from '@/components/DatePickerComp/DatePickerComp';
import TimePickerComp from '@/components/DatePickerComp/TimePickerComp';
import EmployeeSearch from '@/components/EmployeeSearch';

export default function GoogleCalendar() {
    const [empFor, setEmpFor] = useState('')
    const [openTab, setOpenTab] = useState<number>(1);
    const [quickEdit, setGoogleCal] = useState(false)
    const cancelButtonRef = useRef(null)
    const [stateDate, setStateDate] = useState('');
    const handleStartDateChange = (newDate: any) => {
        setStateDate(newDate); // Update parent component's state
        console.log(newDate)

    };
    const handleEmpValueChange = (newValue: { id: React.SetStateAction<string>; }) => {
        console.log(newValue);
        if (newValue) {
            setEmpFor(newValue.id);
        }

    };

    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Google Calendar
                        </h2>
                    </div>
                </div>
            </div>
            <div className='lg:flex space-x-2'>
                <div className="lg:w-2/3 ...">
                    <div className="mt-4 lg:mt-0 w-full relative items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                        <div className="rounded-t mb-4 px-4 py-3 bg-transparent">
                            <a onClick={() => setGoogleCal(true)}
                                className="w-32 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create Events
                            </a>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/3 ...">
                    <UpcomingEvent />
                </div>
            </div>
            <Transition.Root show={quickEdit} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setGoogleCal}>
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
                        <div className="flex min-h-full items-end justify-center lg:p-4 -mt-10 lg:mt-0 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full w-80 sm:max-w-xl sm:p-6">
                                    <div className="space-y-2">
                                        <div className="border-b border-gray-900/10 pb-4">
                                            <h2 className="text-lg font-semibold leading-7 text-gray-900">Add Event to Google Calendar</h2>
                                            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                <div className="sm:col-span-2">
                                                    <div className="space-y-2 px-2 py-2">
                                                        <div className="lg:w-96 ">
                                                            <ul
                                                                className="h-10 isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs"
                                                                role="tablist"
                                                            >
                                                                <li className="group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                                                                    <a
                                                                        className={
                                                                            "flex whitespace-nowrap py-2 px-1 lg:text-sm text-xs font-medium " +
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
                                                                        <p className="font-normal text-base"> Event</p>
                                                                    </a>
                                                                </li>
                                                                <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                                                                    <a
                                                                        className={
                                                                            "flex whitespace-nowrap py-2 px-1 lg:text-sm text-xs font-medium " +
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
                                                                        <p className="font-normal text-base"> Description</p>
                                                                    </a>
                                                                </li>
                                                                <li className="group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                                                                    <a
                                                                        className={
                                                                            "flex whitespace-nowrap py-2 px-1 lg:text-sm text-xs font-medium " +
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
                                                                        <p className="font-normal text-base"> Guests</p>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded mt-6">
                                                            <div className=" py-3 px-4 flex-auto">
                                                                <div className="tab-content tab-space">
                                                                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                                                        <form>
                                                                            <div className="lg:h-46 h-72 space-y-2">
                                                                                <div className="pb-4">
                                                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2">
                                                                                        <div className="sm:col-span-1">
                                                                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                                                    Event Summary:
                                                                                                </label>
                                                                                                <input
                                                                                                    type="email"
                                                                                                    name="email"
                                                                                                    id="email"
                                                                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                    placeholder=""
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="sm:col-span-1">
                                                                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                                                    Event Location:
                                                                                                </label>
                                                                                                <input
                                                                                                    type="email"
                                                                                                    name="email"
                                                                                                    id="email"
                                                                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                    placeholder=""
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2">
                                                                                        <div className="sm:col-span-1">
                                                                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                                                    Start Date :
                                                                                                </label>
                                                                                                <DatePickerComp onDateChange={handleStartDateChange} />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="sm:col-span-1">
                                                                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                                                    Start Time :
                                                                                                </label>
                                                                                                <TimePickerComp />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="sm:col-span-1">
                                                                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700"> End Date :
                                                                                                </label>
                                                                                                <DatePickerComp />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="sm:col-span-1">
                                                                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700"> End Time :
                                                                                                </label>
                                                                                                <TimePickerComp />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                                                        <div className="lg:h-46 h-72 space-y-2">
                                                                            <div className="pb-4">
                                                                                <div className="grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-4 lg:grid-cols-2">
                                                                                    <div className="sm:col-span-6">
                                                                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                                            Event Description:
                                                                                        </label>
                                                                                        <textarea
                                                                                            rows={4}
                                                                                            name="comment"
                                                                                            id="comment"
                                                                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                            defaultValue={''}
                                                                                            placeholder=""
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={openTab === 3 ? "block" : "hidden"} id="link2">
                                                                        <div className="lg:h-46 h-72 space-y-2">
                                                                            <div className="pb-4">
                                                                                <div className="grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-4 lg:grid-cols-2">
                                                                                    <div className="sm:col-span-6">
                                                                                        <EmployeeSearch onEmpValueChange={handleEmpValueChange} heading="Guest" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="lg:mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                                    <div className="lg:mt-5 sm:flex sm:flex-row-reverse">
                                                                        <button
                                                                            type="button"
                                                                            className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                        >
                                                                            Save
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="mt-3 ml-2 lg:ml-0 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                            onClick={() => setGoogleCal(false)}
                                                                            ref={cancelButtonRef}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
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
