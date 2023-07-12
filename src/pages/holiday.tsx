import YearViewCalendar from '@/Component/Calendar/YearViewCalendar'
import React from 'react'

export default function Template() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Holiday Calendar
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white  py-6 mb-2'>
                <YearViewCalendar />
            </div>
        </div>
    )
}