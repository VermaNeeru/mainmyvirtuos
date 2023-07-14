import DatePickerComp from '@/Component/DatePickerComp/DatePickerComp'
import DepartmentSearch from '@/Component/DepartmentSearch'
import DivisionSearch from '@/Component/DivisionSearch'
import ManagerSearch from '@/Component/ManagerSearch'
import RoleSearch from '@/Component/RoleSearch'
import TeamSearch from '@/Component/TeamSearch'
import React from 'react'

export default function AddUser() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Add New Employee
                        </h2>

                    </div>
                </div>
            </div>
            <div className=" mb-4 px-2 py-2">
                <form>
                    <div className=' rounded-lg border border-gray-300 bg-white '>
                        <div className="space-y-2 px-2 py-2">
                            <div className="border-b border-gray-700/10 pb-4">
                                <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <h3>Login Details</h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                User Name
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="User Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Password"
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className=' rounded-lg border border-gray-300 bg-white mt-4'>
                        <div className="space-y-2 px-2 py-2">
                            <div className="border-b border-gray-700/10 pb-4">
                                <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <h3>Personal Information</h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                First Name
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="First Name"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Middle Name
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Middle Name"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Last Name
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                    <div className=' rounded-lg border border-gray-300 bg-white mt-4'>
                        <div className="space-y-2 px-2 py-2">
                            <div className="border-b border-gray-700/10 pb-4">
                                <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <h3>Official Information</h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Employee Code
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Employee Code"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Official Mobile Number
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Official Mobile Number"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Official Landline Number
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Official Landline Number"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Official Extension
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Official Extension"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Official Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Official Email"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Designation
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Designation"
                                            />
                                        </div>
                                    </div>


                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <TeamSearch />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <DepartmentSearch />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <DivisionSearch />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <RoleSearch />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className='mt-8'>
                                            <DatePickerComp />
                                        </div>

                                    </div>
                                    <div className="sm:col-span-1">
                                        <ManagerSearch heading="Manager" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <ManagerSearch heading="Manager's Manager" />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </form>
            </div>

        </div>

    )
}
