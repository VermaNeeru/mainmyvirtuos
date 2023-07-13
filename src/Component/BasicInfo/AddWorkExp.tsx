import React from 'react'
import CertificateSearch from './CertificateSearch'
import DatePickerComp from '../DatePickerComp/DatePickerComp'

export default function AddWorkExp() {
    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 sm:grid-cols-2">
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Previous Company Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Previous Company Name"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Worked from
                        </label>
                        <DatePickerComp />
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Worked To
                        </label>
                        <DatePickerComp />
                    </div>
                </div>

                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Designation
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Job Title"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Annual Salary (Rs)
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Salary"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1"></div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            HR Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="HR Name"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            HR Phone
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="HR Phone"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            HR Email
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="HR Email"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Manager Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Manager Name"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Manager Phone
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Manager Phone"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Manager Email
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Manager Email"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-1">
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Reasons for Leaving
                        </label>
                        <div className="mt-2">
                            <textarea
                                rows={2}
                                name="comment"
                                id="comment"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                                placeholder="Reasons for Leaving"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Job Responsibility
                        </label>
                        <div className="mt-2">
                            <textarea
                                rows={2}
                                name="comment"
                                id="comment"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                                placeholder="Job Responsibility"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>




    )
}