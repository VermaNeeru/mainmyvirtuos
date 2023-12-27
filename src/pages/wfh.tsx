import React, { Fragment } from 'react'
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { GET_WFH, REMOVE_USER_WFH } from '@/graphql/User/queries';
import { useMutation, useQuery } from '@apollo/client';
const table_header = [
    { name: 'Type' },
    { name: 'Date' },
    { name: 'Day Type' },
    { name: 'Time' },
    { name: 'By Hours' },
    { name: 'Status' },

];

const user_attendance = [
    { id: 1, leave_type: 'Short Leave', date: '04-07-2023', type: '04-07-2023', time: '16:30', byhr: 'test', status: 'Pending', },
    { id: 2, leave_type: 'Full Day Leave', date: '04-07-2023', type: '04-07-2023', time: '16:30', byhr: 'test', status: 'Pending', },
    { id: 3, leave_type: 'Half Day Leave', date: '04-07-2023', type: '04-07-2023', time: '16:30', byhr: 'test', status: 'Pending', },
    // More people...
]

export default function WFH() {
    const { loading, error, data } = useQuery(GET_WFH);
    const [removeUserWfhMutation] = useMutation(REMOVE_USER_WFH);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const user_attendance = data.userWfhall;

    console.log(user_attendance);

    const handleRemove = async (id: any) => {
        try {
            await removeUserWfhMutation({
                variables: { id },
                refetchQueries: [{ query: GET_WFH }],
            });
            // Optionally, add a success notification or perform any other action
            alert("successfully removed");
        } catch (error: any) {
            console.error('Error deleting userWfh:', error.message);
            // Handle the error, e.g., show an error message
        }
    };

    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            WFH/Short Leave Section
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className="px-4 sm:px-6 lg:px-8 mt-2 mb-10">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            {/* <h1 className="text-base font-semibold leading-6 text-gray-900">My Logon Hours - Current Month</h1> */}

                        </div>
                        <div className="mt-4 lg:ml-16  sm:mt-0 sm:flex-none">
                            <Link href='/add_wfh'>
                                <button
                                    type="button"
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add New Request
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-2 flow-root">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="border-2 lg:border-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {table_header.map((val, index) => (

                                                    <th scope="col" key={index} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        {val.name}
                                                    </th>
                                                ))}

                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {user_attendance.map((person: any) => (
                                                <tr key={person.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {person.day_type}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.date}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.type}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.time_slot}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.hours_slot}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.status}</td>

                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                        <Menu as="div" className="align-baseline inline-block text-left">
                                                            <div>
                                                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                                    Actions
                                                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </Menu.Button>
                                                            </div>

                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute lg:right-52 right-12 sm:right:10 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                    <div className="py-1">
                                                                        <Menu.Item>
                                                                            {/* <a href="#"  className="bg-gray-100 text-gray-900 block px-4 py-2 text-sm">Remove</a> */}
                                                                            <button
                                                                                onClick={() => handleRemove(person.id)}
                                                                                className="bg-gray-100 text-gray-900 block px-4 py-2 text-sm"
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </Menu.Item>


                                                                    </div>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
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
        </div>
    )
}
