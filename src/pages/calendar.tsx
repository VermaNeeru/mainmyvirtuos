import React, { Fragment, useEffect, useRef } from 'react';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Calendar() {

    const container = React.useRef(null);
    const containerNav = useRef(null);
    const containerOffset = useRef(null);

    useEffect(() => {
        // Set the container scroll position based on the current time.
        const currentMinute = new Date().getHours() * 60;
        container.current.scrollTop =
            ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
                currentMinute) /
            1440;
    }, []);

    return (
        <div className="flex h-full flex-col">
            <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                    <time dateTime="2022-01">January 2022</time>
                </h1>
                <div className="flex items-center">
                    <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                        <div
                            className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300"
                            aria-hidden="true"
                        />
                        <button
                            type="button"
                            className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous week</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
                        >
                            Today
                        </button>
                        <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                        <button
                            type="button"
                            className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                        >
                            <span className="sr-only">Next week</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden md:ml-4 md:flex md:items-center">
                        <Menu as="div" className="relative">
                            <Menu.Button
                                type="button"
                                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Week view
                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Week view
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Month view
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Year view
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        <button
                            type="button"
                            className="ml-3.5 -mr-2.5 h-6 w-6 text-gray-400 hover:text-gray-500 focus:relative"
                        >
                            <span className="sr-only">More options</span>
                            <EllipsisHorizontalIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </header>
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                <div className="absolute inset-0 flex items-start" aria-hidden="true">
                    <div className="flex flex-col w-1/2">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div
                                key={i}
                                className={classNames(
                                    i !== 0 ? 'border-t border-gray-200' : '',
                                    'h-60 flex-shrink-0 flex'
                                )}
                            >
                                <span className="flex-shrink-0 w-14 py-4 text-right pr-4 border-r border-gray-200 text-sm font-medium text-gray-900">
                                    {i === 0 ? '12am' : `${i}am`}
                                </span>
                                <div className="flex-1 min-h-0">
                                    <div className="relative w-full h-full">
                                        <div
                                            ref={i === 0 ? containerOffset : null}
                                            className={classNames(
                                                i !== 0 ? 'border-t border-gray-200' : '',
                                                'absolute inset-0 overflow-hidden'
                                            )}
                                            aria-hidden="true"
                                        >
                                            <div
                                                ref={i === 0 ? containerNav : null}
                                                className="absolute inset-0 h-1/2"
                                                aria-hidden="true"
                                            />
                                            <div
                                                ref={i === 0 ? container : null}
                                                className="absolute inset-0 h-full"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
