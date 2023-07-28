import React from 'react'
import { BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import EmployeeSearch from '@/Component/EmployeeSearch'
import DatePickerComp from '@/Component/DatePickerComp/DatePickerComp'
import MonthYear from '@/Component/DatePickerComp/MonthYear';
import Link from 'next/link';

const table_header = [
    { name: 'Name' },
    { name: 'Actual Worked Hours' },
    { name: 'No. of Days' },
    { name: 'Standard Total Hour' },
    { name: 'Total Office Hour' },
    { name: 'Shortfall/Surplus' },

];

const user_attendance = [
    { id: 1, name: 'Neeru', wh: '200', days: '20', sh: '180', toh: '180', shortfall: '0', },
    { id: 2, name: 'Shivam', wh: '200', days: '20', sh: '180', toh: '180', shortfall: '0', },
    { id: 3, name: 'Gagan', wh: '200', days: '20', sh: '180', toh: '180', shortfall: '0', },
    // More people...
]
export default function TourHour() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Total Hour Report
                        </h2>
                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white mb-4'>
                <div className=" mb-4 px-4 py-4">
                    <form>
                        <div className="space-y-2">
                            <div className="pb-4">
                                <div className="mt-2 grid lg:grid-cols-4 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="mt-2">
                                            <MonthYear />

                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className='mt-2 text-left'>
                                            <button
                                                type="button"
                                                className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex gap-x-1.5 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                            >
                                                Search
                                            </button>
                                            <Link href="/attendance" >
                                                <button
                                                    type="button"
                                                    className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex gap-x-1.5 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                                >
                                                    Back
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
            <div className="mt-4 flow-root">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                                    {user_attendance.map((person) => (
                                        <tr key={person.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {person.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.wh}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.days}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.sh}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.toh}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.shortfall}</td>
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
