import Link from 'next/link';
import React, { useState } from 'react'



function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const statuses = [
    { id: 1, name: 'WO', value: 'Weekly Off' },
    { id: 2, name: 'P', value: 'Present' },
    { id: 3, name: 'NS', value: 'No Show' },
    { id: 4, name: 'PH', value: 'Public Holiday' },
    { id: 5, name: 'HD', value: 'Half Day' },
    // More items...
]
export default function CurrentMyLogonHours() {
    const people = [
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        // More people...
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const displayData = people.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(people.length / itemsPerPage);
    return (
        <div>
            <div className=" sm:px-6 lg:px-8">
                <div className="flex sm:items-center">
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
                        </ul>
                    </div>
                    <div className="flex mt-4 lg:ml-16 ml-0 sm:mt-0 ">
                        <Link href="/view_faq">
                            <span
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                FAQ
                            </span>
                        </Link>

                        <button
                            type="button"
                            className="ml-2 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Search
                        </button>

                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="border-2 lg:border-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Title
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Email
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Role
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {displayData.map((person) => (
                                            <tr key={person.email}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {person.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.title}</td>
                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.email}</td>
                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.role}</td>
                                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                        Edit
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex absolute right-0 items-center mt-4  pb-6 pr-20">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={
                                        "px-3 py-2 text-sm font-medium" +
                                        (currentPage === 1
                                            ? " text-gray-400"
                                            : "px-3 py-2 text-sm font-medium text-gray-700")
                                    }
                                >
                                    Previous
                                </button>
                                <p className="h-8 w-8 mr-2 bg-sky-500 rounded-full text-white flex items-center justify-center font-semibold">
                                    {currentPage}
                                </p>
                                <p className="text-gray-500"> of</p>

                                <p className="ml-2 h-8 w-8 bg-gray-500 rounded-full text-white flex items-center justify-center font-semibold">
                                    {totalPages}
                                </p>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={
                                        "px-3 py-2 text-sm font-medium" +
                                        (currentPage === totalPages
                                            ? " text-gray-400"
                                            : "px-3 py-2 text-sm font-medium text-gray-700")
                                    }
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
