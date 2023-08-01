import React, { Fragment, useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon, UserIcon, ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Alert from '@/Component/Alert';
import { Bars2Icon } from '@heroicons/react/24/outline';
import DatePickerComp from '@/Component/DatePickerComp/DatePickerComp';

const table_header = [
    { name: 'Employee Name' },
    { name: 'Exception Availed' },
    { name: 'Availed On' },
    { name: 'Leave Period' },
];
const accounts_travel = [
    { id: 1, emp_name: 'Shivam', exception_avalied: '0', avalied_on: '0', leave_period: '198' },
    { id: 2, emp_name: 'Gagan', exception_avalied: '2', avalied_on: '0', leave_period: '208' },
    { id: 3, emp_name: 'Neeru', exception_avalied: '0', avalied_on: '0', leave_period: '198' },
    // More people...
]
export default function SearchOte() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Search - OTE
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className=" mb-4 px-4 py-4">

                    <form>
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 sm:gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                    From Date
                                </label>
                                <div className="mt-3">
                                    <DatePickerComp />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                    To Date
                                </label>
                                <div className="mt-3">
                                    <DatePickerComp />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="sm:mt-8 mt-2">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="lg:mt-4 lg:-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center mb-4">
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
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {accounts_travel.map((person) => (
                                                <tr key={person.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {person.emp_name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.exception_avalied}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.avalied_on}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.leave_period}</td>
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
    )
}
