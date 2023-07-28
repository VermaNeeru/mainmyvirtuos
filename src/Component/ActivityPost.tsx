import Image from 'next/image'
import React from 'react'
const popular_post = {
    average: 4,
    totalCount: 1624,
    counts: [
        { rating: 5, count: 1019 },
        { rating: 4, count: 162 },
        { rating: 3, count: 97 },
        { rating: 2, count: 199 },
        { rating: 1, count: 147 },
    ],
    featured: [
        {
            id: 1,
            rating: 5,
            content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
            author: 'Senior HR',
            avatarSrc:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
        },
        // More reviews...
    ],
}

const announcements = {
    average: 4,
    totalCount: 1624,
    counts: [
        { rating: 5, count: 1019 },
        { rating: 4, count: 162 },
        { rating: 3, count: 97 },
        { rating: 2, count: 199 },
        { rating: 1, count: 147 },
    ],
    featured: [
        {
            id: 1,
            rating: 5,
            content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
            author: 'Juhi Arora',
            avatarSrc:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
        },
        // More reviews...
    ],
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function ActivityPost() {
    return (
        <div>
            <div className="mt-4 lg:mt-0 w-full relative items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                <div className="rounded-t mb-4 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h2 className="text-blueGray-700 text-xl font-semibold">
                                Popular Post
                            </h2>

                        </div>
                    </div>
                </div>
                <div className="lg:col-span-7 lg:col-start-6 lg:mt-0">

                    <div className="flow-root">
                        <div className="-my-12 divide-y divide-gray-200">
                            {popular_post.featured.map((review) => (
                                <div key={review.id} className="py-12">
                                    <div className="flex items-center">
                                        <Image loader={({ src }) => `${src}`} height="100" width="100" src={review.avatarSrc} alt={`${review.author}.`} className="h-12 w-12 rounded-full" />
                                        <div className="ml-4">
                                            <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>

                                            <p className="sr-only">{review.rating} out of 5 stars</p>
                                        </div>
                                    </div>

                                    <div
                                        className="mt-4 space-y-6 text-base italic text-gray-600"
                                        dangerouslySetInnerHTML={{ __html: review.content }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 w-full relative items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                <div className="rounded-t mb-4 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h2 className="text-blueGray-700 text-xl font-semibold">
                                Announcements
                            </h2>

                        </div>
                    </div>
                </div>
                <div className="lg:col-span-7 lg:col-start-6 lg:mt-0">

                    <div className="flow-root">
                        <div className="-my-12 divide-y divide-gray-200">
                            {announcements.featured.map((review) => (
                                <div key={review.id} className="py-12">
                                    <div className="flex items-center">
                                        <Image loader={({ src }) => `${src}`} height="100" width="100" src={review.avatarSrc} alt={`${review.author}.`} className="h-12 w-12 rounded-full" />
                                        <div className="ml-4">
                                            <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
                                            <p className="sr-only">{review.rating} out of 5 stars</p>
                                        </div>
                                    </div>

                                    <div
                                        className="mt-4 space-y-6 text-base italic text-gray-600"
                                        dangerouslySetInnerHTML={{ __html: review.content }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
