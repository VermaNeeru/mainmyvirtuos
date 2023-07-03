import React from 'react'

export default function Footer() {
    return (
        <div className='border-t-[1px] border-gray-200 shadow-lg ' >
            <footer className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-6">
                    <div className="flex justify-center space-x-6 md:order-2">

                        <p className="text-center text-xs leading-5 text-gray-500">
                            &copy; Calculate Time : 0.0484 and memory 0.64MB
                        </p>
                    </div>
                    <div className="mt-8 md:order-1 md:mt-0">
                        <p className="text-center text-xs leading-5">
                            <span className='font-semibold'>Copyright © 2023-2024</span>
                            <a href="http://virtuos.com" className="font-semibold text-blue-400 hover:text-gray-500 px-2">
                                Virtuos Solution Pvt Ltd

                            </a>
                            All rights reserved.
                        </p>

                    </div>
                </div>
            </footer>
        </div>
    )
}
