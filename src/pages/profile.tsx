import React, { useState } from 'react'

export default function Profile() {
    const [openTab, setOpenTab] = useState<number>(1);

    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            User Profile
                        </h2>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div className="relative items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex ">
                        <div className='col-span-1 lg:w-1/5'>
                            <span className="relative inline-block">
                                <img
                                    className="h-36 w-36 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <span className="absolute right-0 top-0 block h-4 w-4 rounded-full bg-green-400 ring-2 ring-white" />
                            </span>
                        </div>
                        <div className="col-span-1 lg:w-4/5">
                            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Gagan Bhatia</h2>
                            <p className="mt-2 text-base leading-7 text-gray-600">
                                Sr. Software Developer
                            </p>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex mt-4">
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-white-800"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                    </svg>

                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-x-1.5 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-white-800"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>

                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-white-800"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd" />
                                    </svg>

                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-x-1.5 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-white-800"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                    </svg>

                                </button>

                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex mt-4">
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Change Profile Picture
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Change Password
                                </button>

                            </div>
                        </div>

                    </div>
                    <div className="lg:w-full mt-4">

                        <ul
                            className="h-12 isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs"
                            role="tablist">
                            <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                                <a
                                    className={
                                        "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                        (openTab === 1
                                            ? "border-indigo-500 text-indigo-600 "
                                            : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 ")
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(1);
                                    }}
                                    data-toggle="tab"
                                    href="#link1"
                                    role="tablist"
                                >
                                    <p className="font-normal text-base">About Me</p>
                                </a>
                            </li>
                            <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                                <a
                                    className={
                                        "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                        (openTab === 2
                                            ? "border-indigo-500 text-indigo-600 "
                                            : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(2);
                                    }}
                                    data-toggle="tab"
                                    href="#link2"
                                    role="tablist"
                                >
                                    <p className="font-normal text-base">Official Information</p>
                                </a>
                            </li>
                            <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                                <a
                                    className={
                                        "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                        (openTab === 3
                                            ? "border-indigo-500 text-indigo-600 "
                                            : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(3);
                                    }}
                                    data-toggle="tab"
                                    href="#link3"
                                    role="tablist"
                                >
                                    <p className="font-normal text-base">Qualificaiton</p>
                                </a>
                            </li>
                            <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10">
                                <a
                                    className={
                                        "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                        (openTab === 4
                                            ? "border-indigo-500 text-indigo-600 "
                                            : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(4);
                                    }}
                                    data-toggle="tab"
                                    href="#link4"
                                    role="tablist"
                                >
                                    <p className="font-normal text-base">Activity</p>
                                </a>
                            </li>

                        </ul>
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded mt-6">
                            <div className=" py-3 px-4 flex-auto">
                                <div className="tab-content tab-space">
                                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                        <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                            {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                                We’re changing the way people connect.
                                            </h1> */}
                                            <p className="relative mt-2 text-sm leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                                Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis cupidatat mollit aute velit. Et
                                                labore commodo nulla aliqua proident mollit ullamco exercitation tempor. Sint aliqua anim nulla sunt
                                                mollit id pariatur in voluptate cillum. Eu voluptate tempor esse minim amet fugiat veniam occaecat
                                                aliqua.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex ">
                                            <div className='col-span-1 '>
                                                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm  hover:border-gray-400">
                                                    <h3 className='text-sm font-semibold py-2'>Basic Information</h3>
                                                    <table className="min-w-full divide-y divide-gray-300 ">
                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Gender
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                Male
                                                            </td>
                                                        </tr>
                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Employee Code
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                VINVR08
                                                            </td>
                                                        </tr>
                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Email
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                vir@virtuos.com
                                                            </td>
                                                        </tr>
                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Designation
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                CEO
                                                            </td>
                                                        </tr>
                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Department
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                Virtuos Consultare Executive Management
                                                            </td>
                                                        </tr>

                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Division
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                Virtuos Corporate
                                                            </td>
                                                        </tr>

                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Team
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                Team
                                                            </td>
                                                        </tr>

                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Manager 1
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                Senior HR
                                                            </td>
                                                        </tr>

                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Manager 2
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                Senior HR
                                                            </td>
                                                        </tr>

                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Employment Status
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                QE
                                                            </td>
                                                        </tr>

                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Date of Joining
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                30-11--0001
                                                            </td>
                                                        </tr>

                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Official Mobile Number
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                9810075996
                                                            </td>
                                                        </tr>

                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Date of Birth
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                30 November
                                                            </td>
                                                        </tr>

                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                PAN Card
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                PAN Card
                                                            </td>
                                                        </tr>

                                                        <tr key="1">
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                Adhaar
                                                            </td>
                                                            <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                Adhaar
                                                            </td>
                                                        </tr>
                                                    </table>

                                                </div>
                                            </div>
                                            <div className='col-span-1 w-full space-y-2'>
                                                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm  hover:border-gray-400">
                                                    <h3 className='text-sm font-semibold'>My Programs</h3>
                                                    <ul role="list" className="divide-y divide-gray-100">
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                Program-1
                                                            </p>
                                                        </li>
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                Program-2
                                                            </p>
                                                        </li>
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                Program-3
                                                            </p>
                                                        </li>

                                                    </ul>
                                                </div>
                                                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm  hover:border-gray-400">
                                                    <h3 className='text-sm font-semibold'>My Projects</h3>
                                                    <ul role="list" className="divide-y divide-gray-100">
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                Project-1
                                                            </p>
                                                        </li>
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                Project-2
                                                            </p>
                                                        </li>
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                Project-3
                                                            </p>
                                                        </li>

                                                    </ul>
                                                </div>
                                                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm  hover:border-gray-400">
                                                    <h3 className='text-sm font-semibold'>My Skills</h3>
                                                    <ul role="list" className="divide-y divide-gray-100">
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                Skill-1
                                                            </p>
                                                        </li>
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                Skill-2
                                                            </p>
                                                        </li>
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                Skill-3
                                                            </p>
                                                        </li>

                                                    </ul>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 mt-4">
                                            <div className='col-span-1 '>
                                                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm  hover:border-gray-400">
                                                    <h3 className='text-sm font-semibold'>Experience</h3>
                                                    <ul role="list" className="divide-y divide-gray-100">
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">

                                                            </p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className='col-span-1 '>
                                                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm  hover:border-gray-400">
                                                    <h3 className='text-sm font-semibold'>Education</h3>
                                                    <ul role="list" className="divide-y divide-gray-100">
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">

                                                            </p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className='col-span-1 '>
                                                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm  hover:border-gray-400">
                                                    <h3 className='text-sm font-semibold'>Certifications</h3>
                                                    <ul role="list" className="divide-y divide-gray-100">
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">

                                                            </p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className='col-span-1 '>
                                                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm  hover:border-gray-400">
                                                    <h3 className='text-sm font-semibold'>Languages</h3>
                                                    <ul role="list" className="divide-y divide-gray-100">
                                                        <li key="1" className="flex justify-between gap-x-6 py-1">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">

                                                            </p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                                        Activity
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
