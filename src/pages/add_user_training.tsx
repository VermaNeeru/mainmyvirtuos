import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Disclosure } from '@headlessui/react'
import { EnvelopeIcon, Bars4Icon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import CitySearch from '@/components/CitySearch';
import Link from 'next/link';
import TextEditor from '@/components/TextEditor';

const trainigstatus = [
    { id: 1, name: 'Choose Training Status' },
    { id: 2, name: 'Completed' },
    { id: 2, name: 'Not Completed' },
    { id: 3, name: 'Hold' },
]

const companysponser = [
    { id: 1, name: 'Choose Company Sponsered' },
    { id: 2, name: 'Yes' },
    { id: 2, name: 'No' },

]

const reimbursement = [
    { id: 1, name: 'Choose Reimbursible' },
    { id: 2, name: 'Yes' },
    { id: 3, name: 'No' },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function AddTravelReq() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [selected, setSelected] = useState(trainigstatus[0])
    const [selectedCS, setSelectedCS] = useState(companysponser[0])
    const [selectedRI, setSelectedRI] = useState(reimbursement[0])


    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-2 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Training
                        </h2>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div className="relative items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className=" px-2 py-2">
                        <div className="sm:flex flex sm:items-center">
                            <div className="sm:flex-auto flex-auto">
                                <h2 className="text-blueGray-700 lg:text-xl text-sm font-semibold">
                                    Add Training
                                </h2>
                            </div>
                            <div className="-mt-2 lg:ml-10 ml-46 lg:mt-0 lg:flex-none">
                                <Link href='/training'>
                                    <button
                                        type="button"
                                        className="block rounded-md bg-indigo-600 lg:px-3 px-2 py-2 text-center lg:text-sm text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div className="space-y-2">
                            <div className="pb-4">
                                <div className="-ml-2 lg:ml-0 mt-2 grid grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2 lg:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Bars4Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Training Title..."
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Bars4Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Trainer..."
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Bars4Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Venue..."
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Bars4Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Training Period..."
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
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
                                                                {trainigstatus.map((person) => (
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
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Bars4Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Training Cost..."
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Bars4Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Training Source..."
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <Listbox value={selectedCS} onChange={setSelectedCS}>
                                            {({ open }) => (
                                                <>
                                                    <div className="relative mt-2">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                            <span className="block truncate">{selectedCS.name}</span>
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
                                                                {companysponser.map((person) => (
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
                                                                                <span className={classNames(selectedCS ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                    {person.name}
                                                                                </span>

                                                                                {selectedCS ? (
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
                                    <div className="sm:col-span-1">
                                        <Listbox value={selectedRI} onChange={setSelectedRI}>
                                            {({ open }) => (
                                                <>
                                                    <div className="relative mt-2">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                            <span className="block truncate">{selectedRI.name}</span>
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
                                                                {reimbursement.map((person) => (
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
                                                                                <span className={classNames(selectedRI ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                    {person.name}
                                                                                </span>

                                                                                {selectedRI ? (
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

                                    <div className="sm:col-span-1"></div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Start Date
                                        </label>
                                        <DatePicker selected={startDate} onChange=
                                            {(date: React.SetStateAction<Date>) => setStartDate(date)} className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            End Date
                                        </label>
                                        <DatePicker selected={endDate} onChange=
                                            {(date: React.SetStateAction<Date>) => setEndDate(date)} className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <TextEditor />
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className=" items-center lg:-mt-5 mt-5 -ml-2 lg:ml-0">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
