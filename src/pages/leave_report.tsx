import Link from 'next/link';
import React, { useState } from 'react'
import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import EmployeeSearch from '@/components/EmployeeSearch';
import DatePickerComp from '@/components/DatePickerComp/DatePickerComp';

export default function LeaveReport() {
    const [empFor, setEmpFor] = useState('')
    const [stateDate, setStateDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const handleStartDateChange = (newDate: any) => {
        setStateDate(newDate); // Update parent component's state
        console.log(newDate)

    };
    const handleEndDateChange = (newDate: any) => {
        setEndDate(newDate); // Update parent component's state
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
                            Leave Report
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white mb-4'>
                <div className=" mb-4 px-4 py-4">

                    <form>
                        <div className="space-y-2">
                            <div className="pb-4">
                                <div className="mt-2 grid lg:grid-cols-4 grid-cols-2 gap-x-6 lg:gap-y-8 gap-y-2">
                                    <div className="sm:col-span-1">
                                        <EmployeeSearch onEmpValueChange={handleEmpValueChange} heading="Employee Name" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            Start Date
                                        </label>
                                        <div className="mt-2">
                                            <DatePickerComp onDateChange={handleStartDateChange} />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            End Date
                                        </label>
                                        <div className="mt-2">
                                            <DatePickerComp onDateChange={handleEndDateChange} />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className='mt-8 text-left'>
                                            <button
                                                type="button"
                                                className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex gap-x-1.5 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
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

        </div>
    )
}
