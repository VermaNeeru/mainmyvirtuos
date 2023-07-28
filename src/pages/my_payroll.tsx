import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MagnifyingGlassIcon, MinusSmallIcon, PlusSmallIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
const table_header = [
    { name: 'Year' },
    { name: 'Month' },
    { name: 'View' },
];
const user_attendance = [
    { id: 1, year: '2023', month: 'January' },
    { id: 1, year: '2023', month: 'Fabruary' },
    { id: 1, year: '2023', month: 'March' },
    // More people...
]

const faqs = [
    {
        question: "What is Payroll ?",
        answer:
            "AÂ payrollÂ is a company's list of its employees entitled to receive salary every month. Temporary and Contract or Freelance employees are not part of Payroll. But the term is commonly used to refer to the compensation size or number of employees as per company's bonafide records. Payroll responsibilities are distributed between Accounts/Finance and Human Resources. HR is responsible for the correctness of employee data, profile or compliances and Accounts/Finance is responsible for tax deduction and calculation of payables every month.",
    },
    {
        question: "What are Payroll Heads ?",
        answer:
            "Payroll Heads are the components every User/Employee is entitled. Some of the Payroll heads are: Basic Salary; House Rent Allowance; Special Allowance; Conveyance Allowance; Mobile Allowance; Other Allowances; PF (Optional); Please refer to your package for complete payroll heads which are subject to change from time to time.",
    },
    // More questions...
]


export default function MyPayroll() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            My Payslip
                        </h2>

                    </div>
                </div>
            </div>
            <div className="lg:flex grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="lg:w-2/3 lg:-my-2 overflow-x-auto lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                {/* <h1 className="text-base font-semibold leading-6 text-gray-900">My Logon Hours - Current Month</h1> */}
                                <div className="lg:w-96 mt-1 flex rounded-md shadow-sm">
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

                        </div>

                        <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <div className="border-2 lg:border-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {table_header.map((val, index) => (

                                                <th scope="col" key={index} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    {val.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {user_attendance.map((person) => (
                                            <tr key={person.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {person.year}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.month}</td>
                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                    <Link href="/my_payroll">
                                                        <span className='text-indigo-600'>View Payslip</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" lg:w-1/3 relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <h4 className='flex'>FAQ for Payroll <BanknotesIcon className="ml-2 h-6 w-6 text-gray-500" /></h4>
                    <div className=" mb-4 py-2">
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
