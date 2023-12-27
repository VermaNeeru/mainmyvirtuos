import ActivityPart1 from '@/components/ActivityPart1'
import ActivityPost from '@/components/ActivityPost'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

import ActivityAllPost from '@/components/ActivityAllPost'

export default function activity() {

    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Activity Stream
                        </h2>

                    </div>
                </div>
            </div>
            <div className='lg:flex space-x-2'>
                <div className="lg:w-2/3 ...">
                    <div >
                        <div className=' rounded-lg border border-gray-300 bg-white'> <ActivityPart1 /></div>
                        <ActivityAllPost />
                    </div>
                </div>
                <div className="lg:w-1/3 ..."> <ActivityPost /></div>




            </div>

        </div>
    )
}