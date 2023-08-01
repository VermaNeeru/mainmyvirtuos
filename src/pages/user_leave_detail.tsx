import EmployeeSearch from '@/Component/EmployeeSearch'
import React from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const users = [
    { name: "Senior HR" },
    { name: "Venky Reddi" },
    { name: "Shaloo Reddi" },
    { name: "Amarinder Singh" },


    // More questions...
]
export default function UserLeaveDetail() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            User Leave Detail
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white '>
                <div className=" mb-4 px-4 py-4">
                    <form>
                        <div className="space-y-2">
                            <div className="pb-4">
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2">
                                    <div className="col-span-1">
                                        <div className="mt-1">
                                            <EmployeeSearch heading="Search User" />
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
                                Search
                            </button>
                        </div>
                    </form>
                </div>

            </div>
            <div className="mt-6 relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                <h4>Employee Leave Details</h4>
                <div className=" mb-4 px-2 py-2">
                    <dl className="mt-2 space-y-6 divide-y divide-gray-900/10">
                        {users.map((user) => (
                            <Disclosure as="div" key={user.name} >
                                {({ open }) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                <span className="text-base font-semibold leading-7 text-xs text-gray-800">{user.name}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    {open ? (
                                                        <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                    ) : (
                                                        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 lg:pr-12">
                                            <div className="inline-block min-w-full py-2 align-middle lg:px-2">
                                                <div className="border-2 lg:border-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                                    <table className="min-w-full divide-y divide-gray-300">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                                    Leave Type
                                                                </th>
                                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                                    Remaining Leave
                                                                </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200 bg-white">
                                                            <tr key="1">
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">SL</td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">7</td>
                                                            </tr>
                                                            <tr key="2">
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">CL</td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">4</td>
                                                            </tr>
                                                            <tr key="3">
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">EL</td>
                                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">3</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>

            </div>
        </div>
    )
}
