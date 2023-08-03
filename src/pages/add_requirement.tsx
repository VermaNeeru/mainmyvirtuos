import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Disclosure } from '@headlessui/react'
import { ChatBubbleLeftRightIcon, ChevronUpDownIcon, CheckIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
const requisitiontype = [
    { id: 1, name: 'Choose Type' },
    { id: 1, name: 'Dongle' },
    { id: 1, name: 'IT Related' },
    { id: 1, name: 'Stationary' },
    { id: 1, name: 'Other' },
    // More users...
]
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
export default function AddRequirement() {
    const [selected, setSelected] = useState(requisitiontype[0])
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Official Requisition
                        </h2>

                    </div>
                </div>
            </div>
            <div className='lg:w-1/2 rounded-lg border border-gray-300 bg-white '>
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className=" mb-4 px-4 py-4">
                        <h3 className='font-medium leading-6 text-gray-900'>Requisition for Official Requirement</h3>
                        <form>
                            <div className="space-y-2">
                                <div className="pb-4">
                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-2 lg:grid-cols-1">
                                        <div className="sm:col-span-1">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-800">
                                                Requisition Type:
                                            </label>

                                            <div className="mt-1">
                                                <Listbox value={selected} onChange={setSelected}>
                                                    {({ open }) => (
                                                        <>
                                                            <div className="relative mt-2">
                                                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                                    <span className="block truncate">{selected.name}</span>
                                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    </span>
                                                                </Listbox.Button>

                                                                <Transition
                                                                    show={open}
                                                                    as={Fragment}
                                                                    leave="transition ease-in duration-100"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                >
                                                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                        {requisitiontype.map((person) => (
                                                                            <Listbox.Option
                                                                                key={person.id}
                                                                                className={({ active }) =>
                                                                                    classNames(
                                                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                                    )
                                                                                }
                                                                                value={person}
                                                                            >
                                                                                {({ selected, active }) => (
                                                                                    <>
                                                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                            {person.name}
                                                                                        </span>

                                                                                        {selected ? (
                                                                                            <span
                                                                                                className={classNames(
                                                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                                )}
                                                                                            >
                                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </>
                                                                                )}
                                                                            </Listbox.Option>
                                                                        ))}
                                                                    </Listbox.Options>
                                                                </Transition>
                                                            </div>
                                                        </>
                                                    )}
                                                </Listbox>
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
                                                    placeholder="Description"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" items-center">
                                <button
                                    type="submit"
                                    className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
