import React, { Fragment, useState } from 'react'
import Link from 'next/link';
import { GET_PUBLIC_DOCUMENTS } from '@/graphql/User/queries';
import { ApolloError, useMutation, useQuery } from '@apollo/client';

import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
const table_header = [
    { name: 'Document Name' },
    { name: 'Detail' },
    { name: 'Added On' },
];
const user_attendance = [
    { id: 1, doc_name: 'Short Leave', detail: '04-07-2023', addedon: '04-07-2023' },
    { id: 2, doc_name: 'Short Leave', detail: '04-07-2023', addedon: '04-07-2023' },
    { id: 3, doc_name: 'Short Leave', detail: '04-07-2023', addedon: '04-07-2023' },
    // More people...
]
// $q = $this->db->query("SELECT * FROM user_document  where user_document_access='Public'");
export default function MyDocument() {
        const [searchQuery, setSearchQuery] = useState<string>('');
    const { loading, error, data } = useQuery(GET_PUBLIC_DOCUMENTS);
    // console.log("GraphQL Query:", GET_PUBLIC_DOCUMENTS?.loc?.source?.body);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
    // Assuming data.publicDocuments is an array of documents
    const publicDocuments = data.publicDocuments;
    console.log(publicDocuments); 
    const filteredDocuments = publicDocuments.filter((publicDocuments: { document_name: string; }) =>
    publicDocuments.document_name.toLowerCase().includes(searchQuery.toLowerCase())
);// Log the data to the console
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            My Official Documents
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className="px-4 sm:px-6 lg:px-8 mt-10 mb-10">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            {/* <h1 className="text-base font-semibold leading-6 text-gray-900">My Logon Hours - Current Month</h1> */}
                            <div className="lg:w-96 mt-1 flex rounded-md shadow-sm">
                                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="John Smith"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="relative bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="mt-4 flow-root">
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
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {/* {user_attendance.map((person) => (
                                                <tr key={person.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {person.doc_name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.detail}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.addedon}</td>
                                                </tr>
                                            ))} */}
                                            {filteredDocuments.map((document: { id: React.Key | null | undefined; document_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; document_description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; cdate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
                                                <tr key={document.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {document.document_name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                        {document.document_description}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                        {document.cdate}
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
