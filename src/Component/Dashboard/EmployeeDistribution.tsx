import React from 'react'
import ExpenseLineChart2 from '../ExpenseLineChart2'
import ExpDistributionByD from '../DoughnutChart/EmpDistributionByD'

export default function EmployeeDistribution() {
    return (
        <div>
            <div className="mt-2 grid lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className=" mb-4 px-2 py-2">
                        <h3 className='text-gray-600 mb-2'>Employee Distribution by Department</h3>
                        <ExpDistributionByD />
                    </div>
                </div>
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className=" mb-4 px-2 py-2">
                        <h3 className='text-gray-600  mb-2'>Employee Leave Distribution by Department for Current Month</h3>
                        <ExpDistributionByD />
                    </div>
                </div>
            </div>
        </div>
    )
}
