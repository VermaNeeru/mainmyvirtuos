import ActivityPart1 from '@/Component/activityPart1'
import React from 'react'

export default function activity() {
    return (
        <div className=' w-full rounded px-2 py-3 '>
            <div className="rounded-t mb-4 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Activity Stream
                        </h2>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
                <ActivityPart1 />
            </div>
        </div>
    )
}
