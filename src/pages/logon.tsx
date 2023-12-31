import React, { useState } from 'react'
import { BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import EmployeeSearch from '@/components/EmployeeSearch'
import DatePickerComp from '@/components/DatePickerComp/DatePickerComp'

const table_header = [
    { name: 'Name' },
    { name: 'Date' },
    { name: 'Day' },
    { name: 'In Time' },
    { name: 'Out Time' },
    { name: 'Logon Hours' },
    { name: 'Status' },
    { name: 'Shortfall' },
    { name: 'Excess' },
    { name: 'Reason' },
];
const user_attendance = [
    { id: 1, name: 'Shivam', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', logonhrs: '9.10', status: 'Pending', shortfall: '0:00', excess: 'excess', reason: 'Rain' },
    { id: 1, name: 'Gagan', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', logonhrs: '9.10', status: 'Pending', shortfall: '0:00', excess: 'excess', reason: 'Rain' },
    { id: 1, name: 'Neeru', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', logonhrs: '9.10', status: 'Pending', shortfall: '0:00', excess: 'excess', reason: 'Rain' },
    // More people...
]

export default function EarlyDeparture() {
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
                            Logon Report
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
                                        <EmployeeSearch onEmpValueChange={handleEmpValueChange} heading={''} />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            From Date
                                        </label>
                                        <div className="mt-2">
                                            <DatePickerComp onDateChange={handleStartDateChange} />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            To Date
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
            <div className="mt-4 flow-root">
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
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {user_attendance.map((person) => (
                                        <tr key={person.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {person.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.date}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.day}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.in}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.out}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.logonhrs}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.status}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.shortfall}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.excess}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.reason}</td>
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
