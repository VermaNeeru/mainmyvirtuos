import React, { useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const table_header = [
    { name: 'Name' },
    { name: 'Date' },
    { name: 'Day' },
    { name: 'In' },
    { name: 'Out' },
    { name: 'Status' },
    { name: 'Total Hours' },
    { name: 'Logon Hours' },
    { name: 'Shortfall' },
    { name: 'Excess' },
];
const user_attendance = [
    { id: 1, name: 'Lindsay Walton', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', status: '', totalhr: '9', logonhr: '9', shortfall: '0:00', excess: 'true' },
    { id: 2, name: 'Lindsay Walton', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', status: '', totalhr: '9', logonhr: '9', shortfall: '0:00', excess: 'true' },
    { id: 3, name: 'Lindsay Walton', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', status: '', totalhr: '9', logonhr: '9', shortfall: '0:00', excess: 'true' },
    { id: 4, name: 'Lindsay Walton', date: '04-07-2023', day: '1', in: '9:30 AM', out: '6:30 PM', status: '', totalhr: '9', logonhr: '9', shortfall: '0:00', excess: 'true' },
    // More people...
]


export default function AllAttendance() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const people = [
        { id: 1, name: 'Shivam Chawla' },
        { id: 1, name: 'Neeru Verma' },
        { id: 1, name: 'Poorva Sharma' },
        { id: 1, name: 'Sarika Sharma' },
        { id: 1, name: 'Bhumika' },
        { id: 1, name: 'Gagan' },
        // More users...
    ]


    function classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ')
    }

    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState(null)

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    const statuses = [
        { id: 1, name: 'WO', value: 'Weekly Off' },
        { id: 2, name: 'P', value: 'Present' },
        { id: 3, name: 'NS', value: 'No Show' },
        // More items...
    ]
    const shortfall = [
        { id: 1, color: '#ff0000', greater: '1:00', less: '4:30' },
        { id: 2, color: '#ff8300', greater: '0:30', less: '1:00' },
        { id: 3, color: '#ffff00', greater: '0:15', less: '0:30' },
        { id: 4, color: '#ffffb3', greater: '0:10', less: '0:15' },
        // More items...
    ]
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            All Attendance
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className=" mb-4 px-4 py-4">

                    <form>
                        <div className="space-y-2">
                            <div className=" pb-4">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">  Search Attendance</h2>
                                {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                                    This information will be displayed publicly so be careful what you share.
                                </p> */}

                                {/* <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-3 gap-x-6 gap-y-2 lg:gap-y-8 "> */}
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-2">
                                        <div className="mt-1">
                                            <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
                                                <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Employees</Combobox.Label>
                                                <div className="relative mt-2">
                                                    <Combobox.Input
                                                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        onChange={(event) => setQuery(event.target.value)}
                                                    // displayValue={(person) => person?.name}
                                                    />
                                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </Combobox.Button>

                                                    {filteredPeople.length > 0 && (
                                                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {filteredPeople.map((person) => (
                                                                <Combobox.Option
                                                                    key={person.id}
                                                                    value={person}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            'relative cursor-default select-none py-2 pl-3 pr-9',
                                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                                        )
                                                                    }
                                                                >
                                                                    {({ active, selected }) => (
                                                                        <>
                                                                            <span className={classNames('block truncate', selected && 'font-semibold')}>{person.name}</span>

                                                                            {selected && (
                                                                                <span
                                                                                    className={classNames(
                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                                        active ? 'text-white' : 'text-indigo-600'
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                </span>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </Combobox.Option>
                                                            ))}
                                                        </Combobox.Options>
                                                    )}
                                                </div>
                                            </Combobox>

                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            Start Date
                                        </label>
                                        <div className="mt-3">
                                            {/* <input
                                                        type="date"
                                                        name="start-date"
                                                        id="start-date"
                                                        autoComplete="given-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    /> */}
                                            <DatePicker selected={startDate} onChange=
                                                {(date: React.SetStateAction<Date>) => setStartDate(date)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                            />


                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
                                            End Date
                                        </label>

                                        <div className="mt-3">
                                            <DatePicker selected={endDate} onChange=
                                                {(date: React.SetStateAction<Date>) => setEndDate(date)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                            />

                                        </div>
                                    </div>



                                </div>
                            </div>


                        </div>

                        <div className=" items-center">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>


            </div>
            <div className=' rounded-lg border border-gray-300 bg-white mt-4'>
                <div className="px-4 sm:px-6 lg:px-8 mt-10 mb-10">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold leading-6 text-gray-900">My Logon Hours - Current Month</h1>
                            {/* <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your account including their name, title, email and role.
                        </p> */}
                            <ul role="list" className="py-2">
                                {statuses.map((item) => (
                                    <li key={item.id} className="py-0 text-gray-600 text-xs">
                                        {item.name} : {item.value}
                                    </li>
                                ))}
                                {shortfall.map((item) => (
                                    <li key={item.id} className="py-0 text-gray-600 text-xs mt-2">
                                        <span style={{ background: item.color }} className='px-2 h-1'></span>&nbsp;
                                        Shortfall &gt; {item.greater} & Shortfall &lt; {item.less}
                                    </li>
                                ))}

                            </ul>
                        </div>
                        {/* <div className="mt-4 lg:ml-16 ml-10 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Search
                            </button>
                        </div> */}
                    </div>
                    <div className="mt-2 flow-root">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="border-2 lg:border-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {table_header.map((val, index) => (

                                                    <th key={index} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        {val.name}
                                                    </th>
                                                ))}

                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Edit
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {user_attendance.map((person) => (
                                                <tr key={person.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {person.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.date}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.day}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.in}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.out}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.status}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.totalhr}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.logonhr}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.shortfall}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.excess}</td> <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            Edit
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}
