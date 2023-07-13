import React, { useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
export default function StateSearch({ heading }: any) {

    const states = [
        { id: 1, name: 'Andaman and Nicobar Islands' },
        { id: 2, name: 'Andhra Pradesh' },
        { id: 3, name: 'Arunachal Pradesh' },
        { id: 4, name: 'Assam' },
        { id: 5, name: 'Bihar' },
        { id: 6, name: 'Chhattisgarh' },
        { id: 7, name: 'Dadra and Nagar Haveli' },
        { id: 8, name: 'Daman and Diu' },
        { id: 9, name: 'Delhi' },
        { id: 10, name: 'Goa' },
        { id: 11, name: 'Gujarat' },
        { id: 12, name: 'Haryana' },
        { id: 13, name: 'Himachal Pradesh' },
        { id: 14, name: 'Jammu and Kashmir' },
        { id: 15, name: 'Jharkhand' },
        { id: 16, name: 'Karnataka' },
        { id: 17, name: 'Kerala' },
        { id: 18, name: 'Lakshadweep' },
        { id: 19, name: 'Madhya Pradesh' },
        { id: 20, name: 'Maharashtra' },
        { id: 21, name: 'Manipur' },
        { id: 22, name: 'Meghalaya' },
        { id: 23, name: 'Mizoram' },
        { id: 24, name: 'Nagaland' },
        { id: 25, name: 'Odisha (Orissa)' },
        { id: 26, name: 'Puducherry' },
        { id: 27, name: 'Punjab' },
        { id: 28, name: 'Rajasthan' },
        { id: 29, name: 'Sikkim' },
        { id: 30, name: 'Tamil Nadu' },
        { id: 31, name: 'Telangana' },
        { id: 32, name: 'Tripura' },
        { id: 33, name: 'Uttar Pradesh' },
        { id: 34, name: 'Uttarakhand' }
    ];

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    const [query, setQuery] = useState('')
    const [selectedState, setSelectedState] = useState(null)

    const filteredPeople =
        query === ''
            ? states
            : states.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })
    return (
        <div>
            <Combobox as="div" value={selectedState} onChange={setSelectedState}>
                <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{(heading) ? heading : "State"}</Combobox.Label>
                <div className="relative">
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
