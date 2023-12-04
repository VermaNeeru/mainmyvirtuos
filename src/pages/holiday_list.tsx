import React, { Fragment, useState, useRef, useEffect } from 'react'
import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import EmployeeSearch from '@/components/EmployeeSearch'
import LeaveCalendarCompo from '@/components/LeaveCalendar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import YearViewCalendar from '@/components/Calendar/YearViewCalendar'
import HolidaysList from '@/components/HolidaysList'
export default function LeaveCalendar() {
    const [openTab, setOpenTab] = useState<number | null | undefined>(1);

    const [selectedYear, setSelectedYear] = useState<Date | null>(null);

    const handleYearChange = (date: Date) => {

        setSelectedYear(date);
    };
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Holiday Calendar
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
                                <p className="font-normal text-base"> Month View</p>
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
                                <p className="font-normal text-base"> Year View</p>
                            </a>
                        </li>

                    </ul>
                </div>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded mt-6">
                    <div className=" py-3 px-4 flex-auto">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <div className='lg:flex'>
                                    <div className="lg:w-1/3 ...  px-2">
                                        <div className=' rounded-lg border border-gray-300 bg-white'>
                                            <div className=" mb-4 px-4 py-4">
                                                <form>
                                                    <div className="space-y-2">
                                                        <div className=" pb-4">
                                                            <h2 className="text-base font-semibold leading-7 text-gray-900">  Filters</h2>
                                                            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                                <div className="sm:col-span-6">
                                                                    <label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                                        Select Month
                                                                    </label>

                                                                    <div className="mt-3">
                                                                        <DatePicker
                                                                            dateFormat="MMMM yyyy"
                                                                            showMonthYearPicker
                                                                            selected={selectedYear}
                                                                            onChange={handleYearChange}
                                                                            placeholderText="Select Year"
                                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                                                        />

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className=" items-center">
                                                        <button
                                                            type="submit"
                                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        >
                                                            Search
                                                        </button>
                                                        <div className='mt-2'>
                                                            <p className='text-sm font-normal text-gray-600'>
                                                                Holidays: Green<br />
                                                                Exceptional Holidays : Brown
                                                            </p>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="lg:w-2/3 ...  px-2 mt-4 lg:mt-0">
                                        <LeaveCalendarCompo />
                                    </div>

                                </div>
                            </div>

                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <div className=' rounded-lg border border-gray-300 bg-white py-6 mb-2'>
                                    <YearViewCalendar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <HolidaysList />
                </div>
            </div>
        </div >
    )
}
