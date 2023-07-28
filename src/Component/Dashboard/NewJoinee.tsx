import React from 'react'

export default function NewJoinee() {
    return (
        <div className="w-full relative items-center space-x-3 rounded-lg border border-gray-300 bg-white lg:px-6 px-4 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
            {/* <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40"> */}
            <div className="mx-auto max-w-7xl lg:px-4  px-2 py-2">
                <div className="rounded-t lg:mb-4 mb-2 px-0 lg:px-1 py-2 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h2 className="text-blueGray-700 text-xl font-semibold">
                                Add New Joinee
                            </h2>

                        </div>
                    </div>
                </div>
                <div className=" mb-4 px-0 lg:px-2 py-2">
                    <form>
                        <div className="space-y-2">
                            <div className="pb-4">

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
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
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Last Name"
                                            />
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
                                                            name="notification-method"
                                                            type="radio"
                                                            defaultChecked
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Female" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Female
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="notification-method"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Male" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Male
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Designation
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Designation"
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
                                                Education
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Education"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Extension Number
                                            </label>
                                            <input
                                                type="number"
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Extension Number"
                                            />
                                        </div>
                                    </div>


                                </div>

                                <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">

                                    <div className="lg:col-span-6 col-span-1">
                                        <textarea
                                            rows={2}
                                            name="comment"
                                            id="comment"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                            placeholder="Hobbies"
                                        />
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
    )
}
