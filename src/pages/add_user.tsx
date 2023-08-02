import DatePickerComp from '@/components/DatePickerComp/DatePickerComp'
import DepartmentSearch from '@/components/DepartmentSearch'
import DivisionSearch from '@/components/DivisionSearch'
import ManagerSearch from '@/components/ManagerSearch'
import RoleSearch from '@/components/RoleSearch'
import TeamSearch from '@/components/TeamSearch'
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
                    <div className='border-t-4 rounded-lg border border-gray-300 '>
                        <div className=" grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2 bg-white py-2 px-2">
                            <div className="sm:col-span-1">
                                <h3>Login Details</h3>
                            </div>
                        </div>

                        <div className="space-y-2 px-2 py-2 bg-gray-100 ">
                            <div className="pb-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2">
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
                    <div className='border-t-4 rounded-lg border border-gray-300 mt-4'>
                        <div className=" grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2 bg-white py-2 px-2">
                            <div className="sm:col-span-1">
                                <h3>Personal Information</h3>
                            </div>
                        </div>
                        <div className="space-y-2 px-2 py-2 bg-gray-100 ">
                            <div className="pb-4">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 lg:gap-y-4 gap-y-2">
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
                    <div className='border-t-4 rounded-lg border border-gray-300 mt-4'>
                        <div className=" grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2 bg-white py-2 px-2">
                            <div className="sm:col-span-1">
                                <h3>Official Information</h3>
                            </div>
                        </div>
                        <div className="space-y-2 px-2 py-2 bg-gray-100 ">
                            <div className="pb-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2">
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
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2 mt-2">
                                    <div className="sm:col-span-1">
                                        <TeamSearch />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <DepartmentSearch />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <DivisionSearch />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <RoleSearch />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 lg:gap-y-4 gap-y-2 mt-2">
                                    <div className="sm:col-span-1">
                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                            Date of Joining
                                        </label>

                                        <div className='mt-2'>
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
                                <div className="mt-8 mb-8 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-4 lg:grid-cols-2">
                                    <div className="sm:col-span-6">
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white px-2 text-sm text-indigo-500">User Type</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <fieldset className="mt-4">
                                                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                                    <div key="1" className="flex items-center">
                                                        <input
                                                            id="1"
                                                            name="user_type"
                                                            type="radio"
                                                            defaultChecked
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="PE" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            PE
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="user_type"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="QE" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            QE
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="user_type"
                                                            type="radio"
                                                            defaultChecked
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Intern" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Intern
                                                        </label>
                                                    </div>

                                                </div>
                                            </fieldset>

                                        </div>
                                    </div>

                                </div>

                                <div className="mt-8 mb-8 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-4 lg:grid-cols-2">
                                    <div className="sm:col-span-6">
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white px-2 text-sm text-indigo-500">Employee Access</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <fieldset className="mt-4">
                                                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                                    <div key="1" className="flex items-center">
                                                        <input
                                                            id="1"
                                                            name="emp_access"
                                                            type="radio"
                                                            defaultChecked
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="HR" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            HR
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="emp_access"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Manager" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Manager
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="emp_access"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Associate" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Associate
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="emp_access"
                                                            type="radio"
                                                            defaultChecked
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Director" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Director
                                                        </label>
                                                    </div>

                                                </div>
                                            </fieldset>

                                        </div>
                                    </div>

                                </div>

                                <div className="mt-8 mb-8 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-4 lg:grid-cols-2">
                                    <div className="sm:col-span-6">
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white px-2 text-sm text-indigo-500">User Status</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <fieldset className="mt-4">
                                                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                                    <div key="1" className="flex items-center">
                                                        <input
                                                            id="1"
                                                            name="user_status"
                                                            type="radio"

                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Active" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Active
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="user_status"
                                                            type="radio"
                                                            defaultChecked
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Inactive" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Inactive
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>

                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                    <div className=" lg:text-right mt-4">
                        <button
                            type="button"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="lg:ml-4 ml-2 mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Cancel
                        </button>

                    </div>
                </form>
            </div>

        </div>

    )
}
