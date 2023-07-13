import React from 'react'

export default function AddFamily() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                        Prefix
                    </label>
                    <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue="Mr"
                    >
                        <option>Mr</option>
                        <option>Ms</option>
                        <option>Mrs</option>
                        <option>Late</option>
                        <option>Dr</option>
                    </select>
                </div>
            </div>
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                        Name
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Name"
                    />
                </div>
            </div>
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                        Relation
                    </label>
                    <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue="Canada"
                    >
                        <option>Father</option>
                        <option>Mother</option>
                        <option>Spouse</option>
                        <option>Friends/Relatives</option>
                        <option>Siblings</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                        Phone
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Phone"
                    />
                </div>
            </div>
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Email"
                    />
                </div>
            </div>
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                        Occupation
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Occupation"
                    />
                </div>
            </div>

        </div>
    )
}
