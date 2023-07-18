import React, { Fragment, useState, useRef, useEffect } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EmployeeSearch from '@/Component/EmployeeSearch';

const table_header = [
    { name: 'Month' },
    { name: 'Total Advance Req' },
    { name: 'Total Advance Approved' },
    { name: 'Total Expenses' },
    { name: 'Details' },

];
const accounts_travel = [
    { id: 1, month: 'January', total_advance_req: '0', total_advance_approved: '0', total_expenses: '198' },
    { id: 2, month: 'February', total_advance_req: '2', total_advance_approved: '0', total_expenses: '208' },
    { id: 3, month: 'March', total_advance_req: '0', total_advance_approved: '0', total_expenses: '198' },
    // More people...
]
export default function SubordinateUserAdvanceList() {
    const [selectedYear, setSelectedYear] = useState<Date | null>(null);

    const handleYearChange = (date: Date) => {
        setSelectedYear(date);
    };
    const [trDetail, setTrDetail] = useState(false)
    const cancelButtonRef = useRef(null)

    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Subordinate Advance List
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className=" mb-4 px-4 py-4">

                    <form>
                        <div className="mt-2 grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                    Search by Year
                                </label>
                                <div className="mt-3">
                                    <DatePicker
                                        dateFormat="yyyy"
                                        showYearPicker
                                        selected={selectedYear}
                                        onChange={handleYearChange}
                                        placeholderText="Select Year"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                    />

                                </div>
                            </div>


                            <div className="sm:col-span-2">
                                <div className="mt-1">
                                    <EmployeeSearch />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="mt-8">
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
            <div className="mt-6 -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                                {accounts_travel.map((person) => (
                                    <tr key={person.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {person.month}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.total_advance_req}</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.total_advance_approved}</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.total_expenses}</td>
                                        <td className="flex whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <a onClick={() => setTrDetail(true)} className="bg-gray-100 text-gray-600 block px-4 py-2 ">Detail</a>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Transition.Root show={trDetail} as={Fragment}>
                            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setTrDetail}>
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
                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Update Advance Requested</h2>


                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                            <div className="sm:col-span-2">
                                                                <div className="mt-1">
                                                                    <div className=" mb-1 px-2 py-2">

                                                                        <form>
                                                                            <div className="space-y-2">
                                                                                <div className="border-b border-gray-900/10 pb-1">
                                                                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                                                                        <div className="sm:col-span-6">
                                                                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                                Amount Approved
                                                                                            </label>
                                                                                            <div className="mt-3">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    name="amount"
                                                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

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
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                                <button
                                                                    type="submit"
                                                                    className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                >
                                                                    Update and send Email
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                    onClick={() => setTrDetail(false)}
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
