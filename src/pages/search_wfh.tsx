import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link';
const table_header = [
    { name: 'Type' },
    { name: 'By' },
    { name: 'Date' },
    { name: 'Manager Status' },
    { name: "Manager's Manager Status" },


];
const user_attendance = [
    { id: 1, type: 'Short Leave', by: 'Zishan Khan', wfhdate: '04-07-2023', mstatus: 'Pending', mmstatus: 'Pending' },
    { id: 2, type: 'Short Leave', by: 'Zishan Khan', wfhdate: '04-07-2023', mstatus: 'Pending', mmstatus: 'Pending' },
    { id: 3, type: 'WFH', by: '	Ayushi Chandra', wfhdate: '04-07-2023', mstatus: 'Approved', mmstatus: 'Approved' },
    // More people...
]

export default function SearchWfh() {

    const [wfhdate, setwfhdate] = useState(new Date());
    const [fromdate, setfromdate] = useState(new Date());
    const [todate, settodate] = useState(new Date());

    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Search WFH
                        </h2>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div className="relative  items-center rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">

                    <div className=" mb-4 px-2 py-2">
                        <form>
                            <div className="space-y-2">
                                <div className="border-b border-gray-900/10 pb-4">

                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                                        <div className="sm:col-span-2">
                                            <label htmlFor="from-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                Start Date
                                            </label>
                                            <div className="mt-3">
                                                {/* <input
                                                            type="date"
                                                            name="from-date"
                                                            id="from-date"
                                                            autoComplete="given-name"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        /> */}
                                                <DatePicker selected={fromdate} onChange=
                                                    {(date: React.SetStateAction<Date>) => setfromdate(date)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                                />


                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="to-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                End Date
                                            </label>

                                            <div className="mt-3">
                                                <DatePicker selected={todate} onChange=
                                                    {(date: React.SetStateAction<Date>) => settodate(date)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                                />

                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">

                                            <div className=" items-center mt-8">
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Search
                                                </button>
                                                <Link href="/current_month_wfh">
                                                    <button
                                                        type="button"
                                                        className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                    <div className=" mb-4 px-2 py-2">
                        <div className="mt-2 flow-root">
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

                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        Detail
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {user_attendance.map((person) => (
                                                    <tr key={person.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            {person.type}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.by}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.wfhdate}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.mstatus}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.mmstatus}</td>

                                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                                                            <a className="text-indigo-600 hover:text-indigo-900" onClick={() => setOpen(true)}>
                                                                See Detail<span className="sr-only">, {person.id}</span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <Transition.Root show={open} as={Fragment}>
                                            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                                    <div className="flex min-h-full items-end justify-center lg:p-4 -mt-32 lg:mt-0 text-center sm:items-center sm:p-0">
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
                                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">  WFH Detail</h2>


                                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                                            <div className="sm:col-span-2">
                                                                                <div className="mt-1">
                                                                                    <table className="min-w-full divide-y divide-gray-300">
                                                                                        <tr key="1">
                                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                                Date
                                                                                            </td>
                                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                                2023-06-30
                                                                                            </td>

                                                                                        </tr>
                                                                                        <tr key="1">
                                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                                Type
                                                                                            </td>
                                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                                Short Leave
                                                                                            </td>

                                                                                        </tr>
                                                                                        <tr key="1">
                                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                                Time slot
                                                                                            </td>
                                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                                16:10
                                                                                            </td>

                                                                                        </tr>
                                                                                        <tr key="1">
                                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                                Description
                                                                                            </td>
                                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                                Personal Work.
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
                                                                                    onClick={() => setOpen(false)}
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

                    </div>
                </div>


            </div>
        </div>

    )
}
