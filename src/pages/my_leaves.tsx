import AnnualLeaveChart from '@/Component/AnnualLeaveChart'
import React from 'react'

export default function MyLeaves() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            My Leave Balance
                        </h2>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <h4 className="text-blueGray-700 text-md font-semibold">
                        Annual Leave Balance
                    </h4>
                    <div className='rounded-lg border mt-2'>
                        <div className=" mb-4 px-4 py-2">
                            <table className="min-w-full divide-y divide-gray-300 ">
                                <thead>
                                    <tr className="divide-x divide-gray-200">
                                        <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Leave Type
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Balance
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">SL</td>
                                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">7</td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">CL</td>
                                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">7</td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">EL</td>
                                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <h4 className="text-blueGray-700 text-md font-semibold">
                        Annual Leave Balance for  2023
                    </h4>

                    <div className=' rounded-lg border mt-2'>
                        <div className=" mb-4 px-4 py-2">
                            <AnnualLeaveChart />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <h4 className="text-blueGray-700 text-md font-semibold">
                        Leave Entitlement for Financial Year 2023-2024
                    </h4>
                    <div className=' rounded-lg border mt-2'>
                        <div className=" mb-4 px-4 py-2">
                            <table className="min-w-full divide-y divide-gray-300 ">
                                <thead>
                                    <tr className="divide-x divide-gray-200">
                                        <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Leave Type
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Balance
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">SL</td>
                                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">7</td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">CL</td>
                                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">7</td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">EL</td>
                                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">

                    <h4 className="text-blueGray-700 text-md font-semibold">
                        Leave Entitlement for Financial Year 2023-2024
                    </h4>


                    <div className=' rounded-lg border mt-2'>

                        <div className=" mb-4 px-4 py-2">
                            <AnnualLeaveChart />
                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
}
