import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Disclosure } from '@headlessui/react'
import { Bars4Icon, CheckIcon, ChevronUpDownIcon, ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}
export default function AdminDocument() {
    const category = [
        { id: 1, name: 'FRIBDAY' },
        { id: 2, name: 'FRIMO' },
        { id: 3, name: 'FRISK' },
    ]
    const [selected, setSelected] = useState(category[0])
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Upload Document
                        </h2>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className=" px-2 py-2">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                            </div>
                            <div className="mt-4 lg:ml-16 ml-10 sm:mt-0 sm:flex-none">
                                <Link href='/admin_document_list'>
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
                    <div className=" mb-4 px-2 py-2">
                        <form>
                            <div className="space-y-2">
                                <div className="border-b border-gray-900/10 pb-4">
                                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Document Name.."
                                                />
                                            </div>


                                        </div>
                                        <div className="sm:col-span-1">
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <ChatBubbleLeftRightIcon className="mb-4 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <textarea
                                                    rows={2}
                                                    name="comment"
                                                    id="comment"
                                                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue={''}
                                                    placeholder="User Document Description"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-1">
                                        <div className="sm:col-span-1">
                                            <input
                                                type="file"
                                                name="email"
                                                id="email"
                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder=""
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
        </div>
    )
}
