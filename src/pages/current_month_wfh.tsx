import React, { useState } from 'react'
import { BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

export default function CurrentMonthWfh() {
    const [openTab, setOpenTab] = useState<number>(1);
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Current Month - WFH/Short Leave
                        </h2>

                    </div>
                </div>
            </div>
            <div>
                <div className="w-96 ">
                    <ul
                        className="h-12 isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs"
                        role="tablist"
                    >
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
                                <p className="font-normal text-base"> Pending</p>
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
                                <p className="font-normal text-base"> Approved</p>
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
                                <p className="font-normal text-base"> Rejected</p>
                            </a>
                        </li>

                    </ul>

                </div>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded mt-6">
                    <div className=" py-3 px-4 flex-auto">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <div className=' rounded-lg border border-gray-300 bg-white mb-4'>
                                    <div className=" mb-4 px-4 py-4">

                                        <form>
                                            <div className="space-y-2">
                                                <div className="pb-4">
                                                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
                                                        <div className="sm:col-span-1">
                                                            <div className="w-96 mt-2 flex rounded-md shadow-sm">
                                                                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    </div>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="John Smith"
                                                                    />
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                                                >
                                                                    Search
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-1">
                                                            <div className='mt-2 text-right'>
                                                                <Link href="/search_wfh">
                                                                    <button
                                                                        type="button"
                                                                        className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex gap-x-1.5 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                                                    >
                                                                        Search WFH
                                                                    </button>
                                                                </Link>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>


                                            </div>


                                        </form>
                                    </div>


                                </div>
                                Pending WFH/Short Leave
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <div className=' rounded-lg border border-gray-300 bg-white mb-4'>
                                    <div className=" mb-4 px-4 py-4">

                                        <form>
                                            <div className="space-y-2">
                                                <div className=" pb-4">
                                                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
                                                        <div className="sm:col-span-1">
                                                            <div className="w-96 mt-2 flex rounded-md shadow-sm">
                                                                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    </div>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="John Smith"
                                                                    />
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                                                >
                                                                    Search
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <div className='mt-2 text-right'>
                                                                <Link href="/search_wfh">
                                                                    <button
                                                                        type="button"
                                                                        className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex gap-x-1.5 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                                                    >
                                                                        Search WFH
                                                                    </button>
                                                                </Link>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </div>


                                            </div>


                                        </form>
                                    </div>


                                </div>
                                Approved WFH/Short Leave
                            </div>
                            <div className={openTab === 3 ? "block" : "hidden"} id="link2">
                                <div className=' rounded-lg border border-gray-300 bg-white mb-4'>
                                    <div className=" mb-4 px-4 py-4">

                                        <form>
                                            <div className="space-y-2">
                                                <div className="pb-4">
                                                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
                                                        <div className="sm:col-span-1">
                                                            <div className="w-96 mt-2 flex rounded-md shadow-sm">
                                                                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    </div>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="John Smith"
                                                                    />
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                                                >
                                                                    Search
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <div className='mt-2 text-right'>
                                                                <Link href="/search_wfh">
                                                                    <button
                                                                        type="button"
                                                                        className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex gap-x-1.5 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                                                    >
                                                                        Search WFH
                                                                    </button>
                                                                </Link>
                                                            </div>

                                                        </div>



                                                    </div>

                                                </div>


                                            </div>


                                        </form>
                                    </div>


                                </div>
                                Rejected WFH/Short Leave
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
