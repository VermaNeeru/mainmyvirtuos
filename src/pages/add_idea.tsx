import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MagnifyingGlassIcon, MinusSmallIcon, PlusSmallIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import EmployeeSearch from '@/Component/EmployeeSearch';
import CategorySearch from '@/Component/CategorySearch';

const faqs = [
    {
        question: "Who can you send Ideas ?",
        answer:
            "Anyone in the organization.",
    },
    // More questions...
]


export default function AddIdea() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Add Idea
                        </h2>
                    </div>
                </div>
            </div>
            <div className="lg:flex grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className=" px-6 py-2 lg:w-2/3 -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className=' rounded-lg border border-gray-300 bg-white'>
                        <div className=" mb-4 px-4 py-4">
                            <form>
                                <div className="space-y-2">
                                    <div className="pb-4">
                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-4 lg:grid-cols-6">
                                            <div className="sm:col-span-6">
                                                <div className="mt-1">
                                                    <EmployeeSearch heading="For :" />
                                                </div>
                                                <div className="relative flex items-start mt-2">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                            id="comments"
                                                            aria-describedby="comments-description"
                                                            name="comments"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm leading-6">
                                                        <label htmlFor="comments" className="font-medium text-gray-600">
                                                            All Employees
                                                        </label>{' '}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <CategorySearch />
                                            </div>

                                            <div className="sm:col-span-6">
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
                                                        placeholder="Idea Description"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" items-center">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save & Submit Later
                                    </button>
                                    <button
                                        type="submit"
                                        className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Submit
                                    </button>

                                </div>
                            </form>
                        </div>


                    </div>

                </div>

                <div className=" lg:w-2/3 relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <h4 className='flex'>FAQ for Ideas</h4>
                    <div className=" mb-4 px-2 py-2">
                        <dl className="mt-2 space-y-6 divide-y divide-gray-900/10">
                            {faqs.map((faq) => (
                                <Disclosure as="div" key={faq.question} >
                                    {({ open }) => (
                                        <>
                                            <dt>
                                                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                    <span className="text-base font-semibold leading-7 text-xs text-gray-800">{faq.question}</span>
                                                    <span className="ml-6 flex h-7 items-center">
                                                        {open ? (
                                                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                        ) : (
                                                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </dt>
                                            <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                <p className="text-base leading-7 text-xs text-gray-600">{faq.answer}</p>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </dl>
                    </div>

                </div>

            </div>
        </div>
    )
}
