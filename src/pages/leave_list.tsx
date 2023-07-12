import React from 'react'
const table_header = [
    { name: 'Leave Type' },
    { name: 'From Date' },
    { name: 'To Date' },
    { name: 'No. of Days' },
    { name: 'Reason' },
    { name: 'Status' },

];
const user_attendance = [
    { id: 1, leave_type: 'SL', fromdate: '04-07-2023', todate: '04-07-2023', day: '1', reason: 'test', status: 'true', },
    { id: 2, leave_type: 'CL', fromdate: '04-07-2023', todate: '04-07-2023', day: '1', reason: 'test', status: 'true', },
    { id: 3, leave_type: 'CL', fromdate: '04-07-2023', todate: '04-07-2023', day: '1', reason: 'test', status: 'true', },
    // More people...
]


export default function LeaveList() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            My Applied Leaves
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className="px-4 sm:px-6 lg:px-8 mt-10 mb-10">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            {/* <h1 className="text-base font-semibold leading-6 text-gray-900">My Logon Hours - Current Month</h1> */}

                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {table_header.map((val, index) => (

                                                    <th scope="col" key={index} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        {val.name}
                                                    </th>
                                                ))}

                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {user_attendance.map((person) => (
                                                <tr key={person.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {person.leave_type}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.fromdate}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.todate}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.day}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.reason}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>

                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            Pending<span className="sr-only">, {person.id}</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
