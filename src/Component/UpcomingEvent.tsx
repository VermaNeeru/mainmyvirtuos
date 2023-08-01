import React from 'react'

export default function UpcomingEvent() {
    return (
        <div className="mt-4 lg:mt-0 w-full relative items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
            <div className="rounded-t mb-4 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Upcoming Events
                        </h2>

                    </div>
                </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 lg:mt-0">

            </div>
        </div>

    )
}
