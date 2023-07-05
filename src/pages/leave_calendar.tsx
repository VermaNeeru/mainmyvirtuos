import EmployeeSearch from '@/Component/EmployeeSearch'
import LeaveCalendar from '@/Component/LeaveCalendar'
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function LeaveCalendar() {
    const [selectMonth, setSelectMonth] = useState(new Date());
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Leave Calendar
                        </h2>

                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className="w-1/3 ...  px-2">
                    <div className=' rounded-lg border border-gray-300 bg-white'>
                        <div className=" mb-4 px-4 py-4">

                            <form>
                                <div className="space-y-2">
                                    <div className="border-b border-gray-900/10 pb-4">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">  Filters</h2>
                                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                                    This information will be displayed publicly so be careful what you share.
                                </p> */}

                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-6">
                                                <div className="mt-1">
                                                    <EmployeeSearch />

                                                </div>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Leave Type
                                                </label>
                                                <div className="mt-3">
                                                    <select
                                                        id="location"
                                                        name="location"
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        defaultValue="Canada"
                                                    >
                                                        <option>Choose Type</option>
                                                        <option>Sick Leave</option>
                                                        <option>Casual Leave</option>
                                                        <option>Earned Leave</option>
                                                    </select>

                                                </div>
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Status
                                                </label>
                                                <div className="mt-3">
                                                    <select
                                                        id="location"
                                                        name="location"
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        defaultValue="Canada"
                                                    >
                                                        <option>Select Status</option>
                                                        <option>Pending</option>
                                                        <option>Approved</option>
                                                        <option>Rejected</option>
                                                        <option>Cancelled</option>
                                                    </select>

                                                </div>
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Select Month
                                                </label>

                                                <div className="mt-3">
                                                    <DatePicker selected={selectMonth} onChange=
                                                        {(date: React.SetStateAction<Date>) => setselectMonth(date)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
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
                                </div>
                            </form>
                        </div>


                    </div>
                </div>
                <div className="w-2/3 ...  px-2">
                    <LeaveCalendar />
                </div>

            </div>
        </div>
    )
}
