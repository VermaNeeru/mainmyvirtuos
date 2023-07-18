import ExpenseDC2 from '@/Component/DoughnutChart/ExpenseDC2';
import EmployeeSearch from '@/Component/EmployeeSearch';
import ExpenseLineChart2 from '@/Component/ExpenseLineChart2';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const table_header = [
    { name: 'Employee Name' },
    { name: 'Expense Type' },
    { name: 'Amount' },
    { name: 'Date' },
    { name: 'Status' },
];

const expense = [
    { id: 1, emp_name: 'Gagan', exp_type: 'Office Supplies', amount: '17987', edate: '14-07-2023', status: 'Approved' },
    { id: 2, emp_name: 'Shivam', exp_type: 'Office Supplies', amount: '8000', edate: '14-07-2023', status: 'Approved' },
    { id: 3, emp_name: 'Neeru', exp_type: 'Other', amount: '13000', edate: '14-07-2023', status: 'Approved' },
    // More people...
]

export default function Expense() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Expense Report
                        </h2>
                    </div>
                </div>
            </div>
            <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                <div className=" mb-4 px-2 py-2">
                    <form>
                        <div className="space-y-2">
                            <div className="border-b border-gray-900/10 pb-4">
                                <div className="mt-2 grid lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                    <div className="sm:col-span-1">
                                        <EmployeeSearch heading="Employee Name" />
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            Status
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="location"
                                                name="location"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue="Canada"
                                            >
                                                <option >Choose type</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Rejected">Rejected</option>
                                                <option value="Paid">Paid</option>
                                                <option value="Advance">Advance</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            From Date
                                        </label>
                                        <div className="mt-1">
                                            <DatePicker selected={startDate} onChange=
                                                {(date: React.SetStateAction<Date>) => setStartDate(date)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            To Date
                                        </label>

                                        <div className="mt-1">
                                            <DatePicker selected={endDate} onChange=
                                                {(date: React.SetStateAction<Date>) => setEndDate(date)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
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
                                Search
                            </button>
                        </div>
                    </form>
                </div>

            </div>

            <div className="mt-2 grid lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className=" mb-4 px-2 py-2">
                        <h3 className='text-gray-600'>Expense Report</h3>
                        <ExpenseDC2 />
                    </div>
                </div>
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className=" mb-4 px-2 py-2">
                        <h3 className='text-gray-600'>Expense Report</h3>
                        <ExpenseLineChart2 />
                    </div>
                </div>
            </div>
            <div className="mt-4 relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
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
                        {expense.map((person) => (
                            <tr key={person.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {person.emp_name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.exp_type}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.amount}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.edate}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
