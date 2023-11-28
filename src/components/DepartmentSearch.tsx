import React, { useState, useEffect } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_Departments } from '@/graphql/Department/queries';

interface DepartmentSearchProps {
    heading: string; // Add the heading property
    onDepartmentChange: (selected: any) => void; // Replace 'any' with the actual type of 'selected'
}

const DepartmentSearch: React.FC<DepartmentSearchProps> = ({ heading, onDepartmentChange }) => {


    //export default function DepartmentSearch({ heading, onDepartmentChange }: any) {
    const people = [
        { id: 1, name: 'Department 1' },
        { id: 1, name: 'Department 2' },
        { id: 1, name: 'Department 3' },
        // More users...
    ]


    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState(null)

    const { loading: getAllDataLoading, error: getAllDataError, data: getAllData } = useQuery(GET_Departments);
    console.log("allData", getAllData);

    let itemlist: any[] = [];

    if (getAllData && getAllData.departments) {
        itemlist = getAllData.departments.map((data: { id: any; department_name: any; department_code: any; department_color: any; department_status: any; }) => ({
            id: data.id,
            department_name: data.department_name,
            department_code: data.department_code,
            department_color: data.department_color,
            department_status: data.department_status,

        }));
    }

    const filteredPeople =
        query === ''
            ? itemlist
            : itemlist.filter((item) => {
                return item.department_name.toLowerCase().includes(query.toLowerCase())
            })

    // const filteredPeople = query === "" ? itemlist : itemlist.filter((item: { department_name: string }) => {
    //     const lowerSearch = query.toLowerCase();
    //     return (item.department_name.toLowerCase().includes(lowerSearch));
    // });
    console.log(filteredPeople);
    useEffect(() => {
        console.log(selectedPerson);
        onDepartmentChange(selectedPerson)
    }, [selectedPerson, onDepartmentChange])
    return (
        <div>
            <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
                {(heading && heading == 'hidden') ? <></>
                    : <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{(heading) ? heading : "Department"}</Combobox.Label>

                }
                <div className="relative mt-2">
                    <Combobox.Input
                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(person: any) => person?.department_name}
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
                                            <span className={classNames('block truncate', selected && 'font-semibold')}>{person.department_name}</span>

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
export default DepartmentSearch;
