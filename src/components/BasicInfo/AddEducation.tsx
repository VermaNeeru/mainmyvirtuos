import React from 'react'
import CertificateSearch from './CertificateSearch'
import DatePickerComp from '../DatePickerComp/DatePickerComp'

export default function AddEducation() {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-2 lg:gap-y-2">
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Qualification
                        </label>
                        <select
                            id="location"
                            name="location"
                            className="mt-2 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue="Canada"
                        >
                            <option>Bachelors Degree</option>
                            <option>Masters Degree</option>
                            <option>Xth</option>
                            <option>XIIth</option>
                            <option>Diploma</option>
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            School/Institute
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Institute"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            University/Board
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="University"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-2 lg:gap-y-2">

                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Percentage
                        </label>
                        <div className="mt-0">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Percentage"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Start Date
                        </label>
                        <DatePickerComp />
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            End Date
                        </label>
                        <DatePickerComp />
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                            Program type
                        </label>
                        <select
                            id="location"
                            name="location"
                            className="mt-0 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue="Canada"
                        >
                            <option>Part Time</option>
                            <option>Full Time</option>
                            <option>Correspondence</option>

                        </select>
                    </div>
                </div>

            </div>
        </div>

    )
}
