import Link from 'next/link'
import React from 'react'
const reports = [
    { id: 1, title: 'Late Arrival Report', url: '/late_arrival' },
    { id: 1, title: 'Access Report', url: '/current_user_access' },
    { id: 1, title: 'Absent Report', url: '/current_absent_report' },
    { id: 1, title: 'Early Departure Report', url: '/current_early_departure' },
    { id: 1, title: 'Total Hour Report', url: '/current_total_hour' },
    { id: 1, title: 'In-Out Report', url: '/current_in_out' },
    { id: 1, title: 'Logon Report', url: '/current_logon' },
]
export default function Attendance() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Attendance Reports
                        </h2>

                    </div>
                </div>
            </div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {reports.map((item) => (
                    <li

                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                        <div className="flex flex-1 flex-col p-8">
                            <h3 className="mt-6 text-sm font-medium text-gray-900">{item.title}</h3>
                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                <dd className="mt-3">
                                    <Link href={item.url}><button
                                        type="button"
                                        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        View Detail
                                    </button>
                                    </Link>

                                </dd>
                            </dl>
                        </div>

                    </li>

                ))}

            </ul>


        </div>
    )
}
