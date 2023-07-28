import Link from 'next/link'
import React from 'react'

export default function EmployeeReferral() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Candidate Referral
                        </h2>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className=" px-2 py-2">
                        <div className="flex items-center">
                            <div className="sm:flex-auto">
                                <h3 className='font-medium lg:text-base text-sm'>Candidate Referral form</h3>
                            </div>
                            <div className="mt-4 lg:ml-16 ml-10 sm:mt-0 sm:flex-none">
                                <Link href='/view_terms'>
                                    <button
                                        type="button"
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        View T&C
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className=" mb-4 lg:px-2 lg:py-2">
                        <form>
                            <div className="space-y-2">
                                <div className="pb-4">

                                    <div className="mt-2 grid grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2 lg:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Candidate Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Candidate Phone"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Candidate Email"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <select
                                                id="location"
                                                name="location"
                                                className="mt-2 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue="Canada"
                                            >
                                                <option value="">Choose Post</option>
                                                <option value="10">Other</option>
                                                <option value="9">Interns / Trainees</option>
                                                <option value="8">Digital Marketing</option>
                                                <option value="7">Inside Sales development</option>
                                                <option value="6">Business Analyst / Pre Sales</option>
                                                <option value="5">Project Manager / Delivery Lead</option>
                                                <option value="4">Business Development Manager</option>
                                                <option value="3">Application Engineer</option>
                                                <option value="2">Technical / Solution Consultant</option>
                                                <option value="1">Software Developer/Architect</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-8 mb-8 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">

                                        <div className="sm:col-span-6">
                                            <div className="relative">
                                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                    <div className="w-full border-t border-gray-300" />
                                                </div>
                                                <div className="relative flex justify-center">
                                                    <span className="bg-white px-2 text-sm text-indigo-500">Submit the cover letter or resume</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
                                        <div className="sm:col-span-6">
                                            <textarea
                                                rows={2}
                                                name="comment"
                                                id="comment"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={''}
                                                placeholder="Google Drive Link"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-8 mb-8 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">

                                        <div className="sm:col-span-6">
                                            <div className="relative">
                                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                    <div className="w-full border-t border-gray-300" />
                                                </div>
                                                <div className="relative flex justify-center">
                                                    <span className="bg-white px-2 text-sm text-indigo-500">OR</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-800">
                                                Attachement
                                            </label>


                                            <input
                                                type="file"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Attachement"
                                            />
                                        </div>
                                        <div className="sm:col-span-1">
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className=" items-center">
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>

                </div>


            </div>
        </div>
    )
}
