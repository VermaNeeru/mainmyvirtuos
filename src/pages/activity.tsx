import ActivityPart1 from '@/Component/ActivityPart1'
import ActivityPost from '@/Component/ActivityPost'
import Image from 'next/image'
import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
const people = [
    {
        name: 'Leslie Alexander',
        comment: 'Congratulations Bhola',
        imageUrl:
            'https://myvirtuos.com/uploads/profile/medium_thumb/Sarika_1624601136_mediumthumb.png',
        href: '#',
        lastSeen: '3h ago',
        lastSeenDateTime: '09-01-2023 at 03:51:25',
    },
    {
        name: 'Michael Foster',
        comment: 'Congratulations Bhola',
        imageUrl:
            'https://myvirtuos.com/uploads/profile/medium_thumb/Sarika_1624601136_mediumthumb.png',
        href: '#',
        lastSeen: '3h ago',
        lastSeenDateTime: '09-01-2023 at 03:52:32',
    },


]
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

                        <div className=" mt-2">

                            <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                            >
                                <div className='flex'>
                                    <div className="flex-shrink-0">
                                        <Image loader={({ src }) => `${src}`} className="h-10 w-10 rounded-full" height={100} width={100} src='https://myvirtuos.com/assets/images/happiests-logo_white.svg' alt="" />
                                    </div>
                                    <div className="min-w-0 flex-1 px-2">
                                        <a href="#" className="focus:outline-none">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            <p className="text-sm font-medium text-gray-900">Ayushi Chandra</p>
                                            <p className="truncate text-sm text-gray-500 text-xs">09-01-2023 at 03:48:38</p>
                                        </a>

                                    </div>
                                </div>

                                <div className="min-w-0 flex-1 mt-4">
                                    <p className='text-sm'>Congratulations Bhola for being promoted to the Associate Lead Graphic Designer position.</p>

                                </div>

                                <div className="min-w-0 flex-1 mt-4">
                                    <ul role="list" className="divide-y divide-gray-100">
                                        {people.map((person, index) => (
                                            <li
                                                key={index}
                                                className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
                                            >
                                                <div className="flex gap-x-4">
                                                    <Image loader={({ src }) => `${src}`} height={100} width={100} className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                                            <a href={person.href}>
                                                                <span className="absolute inset-x-0 -top-px bottom-0 text-xs" />
                                                                {person.name}
                                                            </a>
                                                        </p>
                                                        <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                                            {person.comment}

                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-x-4">
                                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                        {/* <p className="text-sm leading-6 text-gray-900">{person.role}</p> */}
                                                        {person.lastSeen ? (
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                <time dateTime={person.lastSeenDateTime}>{person.lastSeenDateTime}</time>
                                                            </p>
                                                        ) : (
                                                            <div className="mt-1 flex items-center gap-x-1.5">
                                                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                </div>
                                                                <p className="text-xs leading-5 text-gray-500">Online</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" /> */}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
                <div className="lg:w-1/3 ..."> <ActivityPost /></div>




            </div>

        </div>
    )
}
