import React from 'react'
import Link from 'next/link';


export default function CurrentMonthAttendance() {

    return (
        <div className=' w-full rounded px-2 py-3 '>
            <div className="rounded-t mb-4 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            My Attendance Reports
                        </h2>

                    </div>
                </div>
            </div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                <li

                    className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                >
                    <div className="flex flex-1 flex-col p-8">
                        <h3 className="mt-6 text-sm font-medium text-gray-900">Logon Hour Report</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between">
                            <dt className="sr-only">Title</dt>
                            <dt className="sr-only">Role</dt>
                            <dd className="mt-3">
                                <Link href="/current_my_logon_hours"><button
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
                <li

                    className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                >
                    <div className="flex flex-1 flex-col p-8">
                        <h3 className="mt-6 text-sm font-medium text-gray-900">In-Out Report</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between">
                            <dt className="sr-only">Title</dt>
                            <dt className="sr-only">Role</dt>
                            <dd className="mt-3">
                                <Link href="/current_my_attendance">
                                    <button
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

            </ul>

        </div>
    )
}
