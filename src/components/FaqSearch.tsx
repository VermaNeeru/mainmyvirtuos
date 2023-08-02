import React, { useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
export default function FaqSearch({ heading }: any) {
    const people = [
        { id: 1, name: 'LAN not working?' },
        { id: 2, name: 'Browser not launching or has issues?' },
        { id: 3, name: 'Mouse, Touch Pad & Keyboard issues?' },
        { id: 4, name: 'What is Casual Leave (CL)? How can I avail CL? Am I eligible for CL?' },
        { id: 5, name: 'What is Sick Leave (SL)? How can I avail SL?' },
        { id: 6, name: 'What are the office timings?' },
        { id: 7, name: 'What is Payroll?' },
        { id: 8, name: 'What are Payroll Heads?' },
        { id: 9, name: 'Who can I send ideas to?' },
        { id: 10, name: 'What is the Leave Policy (Paid or Unpaid Leaves)?' },
        { id: 11, name: 'How can I apply for Leave(s)?' },
        { id: 12, name: 'Work From Home (WFH) & (WFH-S) Policy' },
        { id: 13, name: 'Can I cancel my leaves?' },
        { id: 14, name: 'What happens if there is no leave balance and I need to take leaves?' },
        { id: 15, name: 'When is Shortfall in attendance or Short Leave treated as Half Day (HD)?' },
        { id: 16, name: 'How to Apply for a Half Day?' },
        { id: 17, name: 'What is EL (Earned Leave)? How can I avail EL? Am I eligible for EL?' },
        { id: 18, name: 'What is Short Leave? What is Emergency Leave? How can I avail Short leave?' },
        { id: 19, name: 'What is Active Employment?' },
        { id: 20, name: 'Can I adjust my leaves against my notice period?' },
        { id: 21, name: 'I fear COVID-19, can I work from home?' },
        { id: 22, name: 'Can I work from home permanently?' }
    ];


    function classNames(...classes: any) {
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
    return (
        <div>
            <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
                <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{(heading) ? heading : "FAQ"}</Combobox.Label>
                <div className="relative mt-2">
                    <Combobox.Input
                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(person: any) => person?.name}
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
    )
}
