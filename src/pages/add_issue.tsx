import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon, ChatBubbleLeftRightIcon, ChevronUpDownIcon, CheckIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import EmployeeSearch from '@/components/EmployeeSearch';

const faqs = [
    {
        question: "LAN not working ?",
        answer:
            "If you are using Wired LAN, please check if the cable is properly connected to PC or Mac. Remove and connect again and give couple of minutes to automatically select the IP address. If the cable is loose or has broken connector, please raise incident to IT Admin. If you are using Wireless LAN, please ensure to select the correct Wi-Fi networks, and forget the other Wi-Fi networks to avoid frequent conflicts. If you find issues with password, please make sure Caps lock on keyboard is not enabled. Renter password carefully. If the problem persists raise incident to IT Admin.",
    },
    {
        question: "Browser not launching or has Issues ?",
        answer:
            "Manage your browserâ€™s cache. Make sure you know how to clear your browser cache, which includes your cookies, temporary internet files, browsing and download history, form data, and so on. You can also do an intensive clean by deleting your usage history on Windows.",
    },
    {
        question: "Mouse,Touch Pad & Keyboard Issues ?",
        answer:
            "Unplug USB cables and wait for a little while for the device driver to be unloaded by Windows, and then plug the device back in.Try using a different USB port on your PC. If you use a USB hub between the device and the PC, make sure the hub has power. If itâ€™s still not working, try removing the USB hub and plugging the device directly into a USB port on the PC. Make sure that the cables on your device aren't damaged in any way. Check any battery-powered devices to see if they are fully charged or have fresh batteries. Make sure thereâ€™s no dirt blocking keys or sensors. Check your wireless connections.Look on the bottom of the wireless device for a Reset button. Resetting the device will disconnect and then reconnect the wireless connection. There might also be a Reset button on the USB receiver for your device.For USB wireless devices, this might be as simple as unplugging the USB wireless receiver, waiting for about 10 seconds, and then plugging the USB wireless receiver back into the USB port. The wireless connection should be reestablished. Check the device. If the device doesn't appear to work at all (no lights appear on the device when itâ€™s plugged in, or the cursor doesn't move or doesn't appear on the screen), connect the device to another PC and make sure the device works on that PC. If the device doesn't work on the other PC, you might need to replace it.",
    },
    // More questions...
]

const issue = [
    { id: 1, name: 'Choose Issue For' },
    { id: 1, name: 'HR' },
    { id: 1, name: 'Network Admin' },
    { id: 1, name: 'Accounts' },
    { id: 1, name: 'Manager' },
    // More users...
]
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
export default function AddIssue() {
    const [selected, setSelected] = useState(issue[0])
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Add Issue
                        </h2>

                    </div>
                    <Link href='/issue'>
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Back
                        </button>
                    </Link>
                </div>
            </div>

            <div className="lg:flex grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className=" lg:w-2/3  lg:-my-2 overflow-x-auto lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className='rounded-lg border border-gray-300 bg-white'>
                            <div className=" mb-4 px-4 py-4">
                                <form>
                                    <div className="space-y-2">
                                        <div className="pb-4">
                                            <div className="mt-2 grid grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2 lg:grid-cols-6">
                                                <div className="sm:col-span-6">
                                                    <div className="mt-1">
                                                        <Listbox value={selected} onChange={setSelected}>
                                                            {({ open }) => (
                                                                <>
                                                                    <div className="relative mt-2">
                                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                                            <span className="block truncate">{selected.name}</span>
                                                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                            </span>
                                                                        </Listbox.Button>

                                                                        <Transition
                                                                            show={open}
                                                                            as={Fragment}
                                                                            leave="transition ease-in duration-100"
                                                                            leaveFrom="opacity-100"
                                                                            leaveTo="opacity-0"
                                                                        >
                                                                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                                {issue.map((person) => (
                                                                                    <Listbox.Option
                                                                                        key={person.id}
                                                                                        className={({ active }) =>
                                                                                            classNames(
                                                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                                            )
                                                                                        }
                                                                                        value={person}
                                                                                    >
                                                                                        {({ selected, active }) => (
                                                                                            <>
                                                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                                    {person.name}
                                                                                                </span>

                                                                                                {selected ? (
                                                                                                    <span
                                                                                                        className={classNames(
                                                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                                        )}
                                                                                                    >
                                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                                    </span>
                                                                                                ) : null}
                                                                                            </>
                                                                                        )}
                                                                                    </Listbox.Option>
                                                                                ))}
                                                                            </Listbox.Options>
                                                                        </Transition>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </Listbox>
                                                    </div>

                                                </div>
                                                <div className="sm:col-span-6">
                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </div>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder="Issue related to.."
                                                        />
                                                    </div>

                                                </div>
                                                <div className="sm:col-span-6">
                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <ChatBubbleLeftRightIcon className="mb-4 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </div>
                                                        <textarea
                                                            rows={2}
                                                            name="comment"
                                                            id="comment"
                                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={''}
                                                            placeholder="Description"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" lg:text-right">
                                        <button
                                            type="submit"
                                            className="lg:ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Save
                                        </button>

                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>
                </div>

                <div className=" lg:w-1/3 relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <h4 className='flex'>FAQ for Issues</h4>
                    <div className=" mb-4 px-2 py-2">
                        <dl className="mt-2 space-y-6 divide-y divide-gray-900/10">
                            {faqs.map((faq) => (
                                <Disclosure as="div" key={faq.question} >
                                    {({ open }) => (
                                        <>
                                            <dt>
                                                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                    <span className="text-base font-semibold leading-7 text-xs text-gray-800">{faq.question}</span>
                                                    <span className="ml-6 flex h-7 items-center">
                                                        {open ? (
                                                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                        ) : (
                                                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </dt>
                                            <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                <p className="text-base leading-7 text-xs text-gray-600">{faq.answer}</p>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </dl>
                    </div>

                </div>

            </div>
        </div>
    )
}
