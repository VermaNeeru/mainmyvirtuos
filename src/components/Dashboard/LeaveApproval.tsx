import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

const statuses = {
    Complete: 'text-green-700 bg-green-50 ring-green-600/20',
    'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}
const leaves = [
    {
        id: 1,
        name: 'WFH/Short Leave request by Neeru Verma',
        dueDate: '20-07-2023',

    },
    {
        id: 2,
        name: 'WFH/Short Leave request by Bhumika Bist',
        dueDate: '20-07-2023',

    },

]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function LeaveApproval() {
    return (
        <div>
            <div className="mt-2 grid lg:grid-cols-2 grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-6">
                <div className="relative  items-center rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className=" mb-4 px-2 py-2">
                        <h3 className='text-gray-900 mb-2'>Pending Approvals</h3>
                        <ul role="list" className="divide-y divide-gray-100">
                            {leaves.map((leave) => (
                                <li key={leave.id} className="lg:flex  items-center justify-evenly gap-x-6 py-5">
                                    <div className="min-w-0">
                                        <div className="flex items-start gap-x-3">
                                            <p className="text-sm font-semibold leading-6 text-gray-600">{leave.name}</p>
                                        </div>
                                        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                            <p className="whitespace-nowrap">
                                                Date <time dateTime="leave.dueDateTime">{leave.dueDate}</time>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-none items-center gap-x-4 mt-2 lg:mt-0">
                                        <button
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Approved <span className="sr-only">, {leave.name}</span>
                                        </button>

                                        <button
                                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        >
                                            Rejected <span className="sr-only">, {leave.name}</span>
                                        </button>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className=" mb-4 px-2 py-2">

                    </div>
                </div>
            </div>
        </div>
    )
}
