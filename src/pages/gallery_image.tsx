import Link from 'next/link'
import React from 'react'

export default function GalleryImage() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Images for Christmas Celebration 2019
                        </h2>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">

                    <div className=" px-2 py-2">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <Link href='/view_images'>
                                    <button
                                        type="button"
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className=" mb-4 px-2 py-2">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div key="1" className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src="https://myvirtuos.com/uploads/gallery/15795890430b8f18c7_71fa_4ed7_90cb_dbc070c9e00a.jpg"
                                        alt=""
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <div>
                                        <h3 className="text-sm text-gray-700 text-center">
                                            <a href="">
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                Christmas Celebration 2019
                                            </a>
                                            <div className=''>
                                                <p className="mt-1 text-sm text-gray-500">Year : 2019</p>
                                                <p className="text-sm font-medium text-gray-900">Christmas Celebration</p>
                                                <p className="text-sm text-gray-500 font-normal">
                                                    Christmas Celebration Pictures!!!
                                                </p>
                                            </div>
                                        </h3>


                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
