import React from 'react'
import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/20/solid'
import Link from 'next/link'
export default function AddLeaveCategory() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h2 className="text-blueGray-700 text-xl font-semibold">
                                    Add Leave Type
                                </h2>
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <Link href='/leave_category_list'>
                                    <button
                                        type="button"
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='rounded-lg border border-gray-300 bg-white '>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded mt-6">
                    <div className=" py-3 px-4 flex-auto">
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Leave Type Name.."
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Leave Type Code.."
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Color"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">

                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <label className="text-sm text-gray-500 mt-2 text-gray-600 font-medium">Encashable</label>
                                    <fieldset className="mt-4">
                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                            <div key="1" className="flex items-center">
                                                <input
                                                    id="1"
                                                    name="encashable"
                                                    type="radio"
                                                    defaultChecked
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="Yes" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    Yes
                                                </label>
                                            </div>
                                            <div key="2" className="flex items-center">
                                                <input
                                                    id="2"
                                                    name="encashable"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="No" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    No
                                                </label>
                                            </div>

                                        </div>
                                    </fieldset>

                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <label className="text-sm text-gray-500 mt-2 text-gray-600 font-medium">Carry Forward</label>
                                    <fieldset className="mt-4">
                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                            <div key="1" className="flex items-center">
                                                <input
                                                    id="1"
                                                    name="carry_forward"
                                                    type="radio"
                                                    defaultChecked
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="Yes" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    Yes
                                                </label>
                                            </div>
                                            <div key="2" className="flex items-center">
                                                <input
                                                    id="2"
                                                    name="carry_forward"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="No" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    No
                                                </label>
                                            </div>

                                        </div>
                                    </fieldset>

                                </div>
                            </div>


                        </div>
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">

                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <label className="text-sm text-gray-500 mt-2 text-gray-600 font-medium">User Role</label>
                                    <fieldset className="mt-4">
                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                            <div key="1" className="flex items-center">
                                                <input
                                                    id="1"
                                                    name="user_role"
                                                    type="checkbox"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="HR" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    HR
                                                </label>
                                            </div>
                                            <div key="2" className="flex items-center">
                                                <input
                                                    id="2"
                                                    name="user_role"
                                                    type="checkbox"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="Manager" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    Manager
                                                </label>
                                            </div>
                                            <div key="2" className="flex items-center">
                                                <input
                                                    id="2"
                                                    name="user_role"
                                                    type="checkbox"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="Associate" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    Associate
                                                </label>
                                            </div>
                                            <div key="2" className="flex items-center">
                                                <input
                                                    id="2"
                                                    name="user_role"
                                                    type="checkbox"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="Director" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    Director
                                                </label>
                                            </div>

                                        </div>
                                    </fieldset>

                                </div>
                            </div>


                        </div>
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                            <div className="sm:col-span-1 mt-4">
                                <label className="text-sm text-gray-500 text-gray-600 font-medium">PE</label>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="April - July"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Aug - Nov"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Dec - March"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                            <div className="sm:col-span-1 mt-4">
                                <label className="text-sm text-gray-500 text-gray-600 font-medium">QE</label>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="April - July"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Aug - Nov"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Dec - March"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                            <div className="sm:col-span-1 mt-4">
                                <label className="text-sm text-gray-500 text-gray-600 font-medium">Intern</label>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="April - July"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Aug - Nov"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Dec - March"
                                        />
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
