import React, { useState, useEffect } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'


interface CitySearchProps {
    onCityValueChange: (selected: any) => void; // Replace 'any' with the actual type of 'selected'
}

const CitySearch: React.FC<CitySearchProps> = ({ onCityValueChange }) => {


    // export default function CitySearch({ onCityValueChange }: any) {
    const city = [
        { id: 1, name: 'Delhi' },
        { id: 2, name: 'Gurgaon' },
        { id: 3, name: 'Kanpur' },
        { id: 4, name: 'Mumbai' },
        { id: 5, name: 'Pune' },
        { id: 6, name: 'Bangalore' },

        // More users...
    ]


    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    const [query, setQuery] = useState('')
    const [selectedCity, setSelectedCity] = useState(null)

    const filteredcity =
        query === ''
            ? city
            : city.filter((ct) => {
                return ct.name.toLowerCase().includes(query.toLowerCase())
            })

    useEffect(() => {
        console.log(selectedCity)
        onCityValueChange(selectedCity);
    }, [selectedCity, onCityValueChange])

    return (
        <div>
            <Combobox as="div" value={selectedCity} onChange={setSelectedCity}>
                <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">City</Combobox.Label>
                <div className="relative mt-2">
                    <Combobox.Input
                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(event) => setQuery(event.target.value)}
                    // displayValue={(ct) => ct?.name}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Combobox.Button>

                    {filteredcity.length > 0 && (
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredcity.map((ct) => (
                                <Combobox.Option
                                    key={ct.id}
                                    value={ct}
                                    className={({ active }) =>
                                        classNames(
                                            'relative cursor-default select-none py-2 pl-3 pr-9',
                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                        )
                                    }
                                >
                                    {({ active, selected }) => (
                                        <>
                                            <span className={classNames('block truncate', selected && 'font-semibold')}>{ct.name}</span>

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
export default CitySearch;