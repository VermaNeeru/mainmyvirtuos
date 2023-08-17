import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import TextEditor from "@/components/TextEditor";

import { useQuery } from "@apollo/client";
import { GET_Employees } from '@/graphql/User/queries';


export default function ActivityPart1() {
    const [openTab, setOpenTab] = useState<number>(1);

    const { loading, error, data } = useQuery(GET_Employees);
    const employees = data.getalluser;
    console.log("users", employees);
    // return
    let people = [];
    people = employees.map((employee: { id: any; firstname: any; lastname: any; }) => ({
        id: employee.id,
        name: `${employee.firstname} ${employee.lastname}`,
    }));
    console.log("people", people);
    // return
    // const people = [
    //     { id: 1, name: 'Shivam Chawla' },
    //     { id: 1, name: 'Neeru Verma' },
    //     { id: 1, name: 'Poorva Sharma' },
    //     { id: 1, name: 'Sarika Sharma' },
    //     { id: 1, name: 'Bhumika' },
    //     { id: 1, name: 'Gagan' },
    //     // More users...
    // ]

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState(null)

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person: { name: string; }) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div className="flex ">
            <div className="w-full ">
                <ul
                    className="-mb-px flex space-x-8" aria-label="Tabs"
                    role="tablist"
                >
                    <li className=" mr-2 last:mr-0 p-1 flex-auto text-center ">
                        <a
                            className={
                                "flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium " +
                                (openTab === 1
                                    ? "border-indigo-500 text-indigo-600 "
                                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 ")
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(1);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                        >
                            <p className="font-normal text-base"> Message</p>
                        </a>
                    </li>
                    <li className="mr-2 p-1 last:mr-0 flex-auto text-center ">
                        <a
                            className={
                                "flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium " +
                                (openTab === 2
                                    ? "border-indigo-500 text-indigo-600 "
                                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(2);
                            }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                        >
                            <p className="font-normal text-base"> Announcement</p>
                        </a>
                    </li>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                    <div className=" py-3 px-4 flex-auto">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <form>
                                    <div className="space-y-12">
                                        <div className="pb-2">
                                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="col-span-full">
                                                    <div className="mt-2">
                                                        <TextEditor />
                                                    </div>
                                                    <div className="mt-4 lg:mt-2 ">
                                                        <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
                                                            <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">To</Combobox.Label>
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
                                                                        {filteredPeople.map((person: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
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

                                            </div>
                                        </div>



                                    </div>

                                    <div className="flex items-center ">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <form>
                                    <div className="space-y-12">
                                        <div className="pb-2">
                                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="col-span-full">
                                                    <div className="mt-2">
                                                        <textarea
                                                            id="about"
                                                            name="about"
                                                            rows={3}
                                                            className="h-52 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={''}
                                                        />
                                                    </div>
                                                    <div className="mt-2 ">
                                                        <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
                                                            <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">To</Combobox.Label>
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
                                                                        {filteredPeople.map((person: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
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
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center ">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

