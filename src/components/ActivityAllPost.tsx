import Image from 'next/image'
import React, { useEffect } from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@apollo/client'
import { GET_ACTIVITY_POST } from '@/graphql/Activity/queries'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
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
export default function ActivityAllPost() {
    const { loading: getActivityLoading, error: getActivityError, data: getActivityData } = useQuery(GET_ACTIVITY_POST);
    console.log("users", getActivityData);

    let itemlist: any[] = [];
    if (getActivityData && getActivityData.activities) {
        itemlist = getActivityData.activities.map((activities: { id: any; user_id: any; status: any; description: any; cdate: any; user: { firstname: any; lastname: any } }) => ({
            id: activities.id,
            user_id: activities.user_id,
            status: activities.status,
            description: activities.description,
            cdate: activities.cdate,
            firstname: activities.user.firstname,
            lastname: activities.user.lastname,
            avatarSrc: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
        }));
    }

    console.log(itemlist)
    return (
        <div>
            {itemlist.map((item, i) => (
                <div className=" mt-2" key={i}>

                    <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                    >
                        <div className='flex'>
                            <div className="flex-shrink-0">
                                <Image loader={({ src }) => `${src}`} className="h-10 w-10 rounded-full" height={100} width={100} src={item.avatarSrc} alt="" />
                            </div>
                            <div className="min-w-0 flex-1 px-2">
                                <a href="#" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900">{item.firstname} {item.lastname} </p>
                                    <p className="truncate text-sm text-gray-500 text-xs">{item.cdate}</p>
                                </a>

                            </div>
                        </div>

                        <div className="min-w-0 flex-1 mt-4">
                            <p className='text-sm'>{item.description}</p>

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
            ))}
        </div>
    )
}
