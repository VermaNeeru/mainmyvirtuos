import AssetSearch from '@/Component/AssetSearch'
import EmployeeSearch from '@/Component/EmployeeSearch'
import React from 'react'
import { TableCellsIcon } from '@heroicons/react/20/solid'

const table_header = [
    { name: 'Employee Name' },
    { name: 'Name' },
    { name: 'Model' },
    { name: 'Assigned On' },
];

const accessories = [
    { id: 1, emp_name: 'Gagan', aname: 'Laptop', model: '17987', assigned_on: '14-07-2023' },
    { id: 2, emp_name: 'Shivam', aname: 'Mouse', model: '8000', assigned_on: '14-07-2023' },
    { id: 3, emp_name: 'Neeru', aname: 'Keyboard', model: '13000', assigned_on: '14-07-2023' },
    // More people...
]

const consumables = [
    { id: 1, emp_name: 'Gagan', aname: 'Laptop', model: '17987', assigned_on: '14-07-2023' },
    { id: 2, emp_name: 'Shivam', aname: 'Mouse', model: '8000', assigned_on: '14-07-2023' },
    { id: 3, emp_name: 'Neeru', aname: 'Keyboard', model: '13000', assigned_on: '14-07-2023' },
    // More people...
]

const asset = [
    { id: 1, emp_name: 'Gagan', aname: 'Laptop', model: '17987', assigned_on: '14-07-2023' },
    { id: 2, emp_name: 'Shivam', aname: 'Mouse', model: '8000', assigned_on: '14-07-2023' },
    { id: 3, emp_name: 'Neeru', aname: 'Keyboard', model: '13000', assigned_on: '14-07-2023' },
    // More people...
]


export default function AssetReport() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Asset Report
                        </h2>

                    </div>
                </div>
            </div>
            <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                <div className=" mb-4 px-2 py-2">
                    <form>
                        <div className="space-y-2">
                            <div className="border-b border-gray-900/10 pb-4">
                                <div className="mt-2 grid lg:grid-cols-3 grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                    <div className="sm:col-span-1">
                                        <EmployeeSearch heading="Employee Name" />
                                    </div>

                                    <div className="sm:col-span-1">
                                        <AssetSearch heading="Asset Name" />
                                    </div>
                                    <div className="sm:col-span-1 text-left mt-8">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
            <div className="mt-4 relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                <div className='flex mb-2'>
                    <TableCellsIcon className="mt-1 h-6 w-6 text-gray-800" />
                    <h3 className='ml-2 font-medium text-xl text-gray-800'>Accessories</h3>
                </div>

                <table className="min-w-full divide-y divide-gray-300 ">
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
                        {accessories.map((person) => (
                            <tr key={person.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {person.emp_name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.aname}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.model}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.assigned_on}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                <div className='flex mb-2'>
                    <TableCellsIcon className="mt-1 h-6 w-6 text-gray-800" />
                    <h3 className='ml-2 font-medium text-xl text-gray-800'>Consumables</h3>
                </div>
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
                        {consumables.map((person) => (
                            <tr key={person.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {person.emp_name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.aname}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.model}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.assigned_on}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                <div className='flex mb-2'>
                    <TableCellsIcon className="mt-1 h-6 w-6 text-gray-800" />
                    <h3 className='ml-2 font-medium text-xl text-gray-800'>Assets</h3>
                </div>
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
                        {asset.map((person) => (
                            <tr key={person.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {person.emp_name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.aname}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.model}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.assigned_on}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    )
}
