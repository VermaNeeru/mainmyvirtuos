import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useMutation, useQuery } from '@apollo/client';
import { GET_PUBLIC_DOCUMENTS_BY_ID } from '@/graphql/User/queries'; // Import your GraphQL query
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
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

interface Document {

    id: number;
    document_name: string;
    document_description: string;
    cdate: string;
    document_attachment: string;
}
export default function Document() {
    const [tokenPayload, setTokenPayload] = useState<number | null>(null);
    const [getPublicDocuments, { data, loading, error }] = useMutation(GET_PUBLIC_DOCUMENTS_BY_ID);
    const [documents, setDocuments] = useState<Document[]>([]); // State to store fetched documents
    const [searchQuery, setSearchQuery] = useState<string>('');
    console.log("GraphQL Query:", GET_PUBLIC_DOCUMENTS_BY_ID?.loc?.source?.body);

    const fetchPublicDocuments = async (userId: any) => {
        console.log(userId);
        try {
            const result = await getPublicDocuments({
                variables: {
                    userId, // Pass the userId variable here
                },
            });

            // Extract the documents from the result and update the state
            setDocuments(result.data.getPublicDocumentsByUserId);
            console.log('Data:', result);
        } catch (e: any) {
            // Handle any errors
            console.error('Error:', e.message);
        }
    };

    // Call fetchPublicDocuments with the desired userId
    useEffect(() => {
        const authToken = Cookies.get('authToken'); // Replace with your actual cookie name

        if (authToken) {
            // If the cookie exists, you can use it or decode it
            console.log('Auth Token:', authToken);
            const decodedToken = jwt.decode(authToken);
            if (typeof decodedToken === 'string') {
                // Handle the case where decodedToken is a string (e.g., an invalid token)
                console.error('Invalid token:', decodedToken);
            } else if (decodedToken) {
                // Handle the case where decodedToken is a JWT payload
                setTokenPayload(decodedToken.id);
                console.log(decodedToken?.id);
                fetchPublicDocuments(decodedToken.id);
            }
            //   setTokenPayload(decodedToken.id);
        } else {
            // Handle the case where the cookie doesn't exist
            console.log('Cookie not found');
        }
        // Replace 1 with the actual userId
        // fetchPublicDocuments(tokenPayload); // Replace 1 with the actual userId
    }, [tokenPayload]);
    // Create a filteredDocuments array based on the search query
    const filteredDocuments = documents.filter((document) =>
        document.document_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Upload Document List
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
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="John Smith"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="relative   bg-indigo-600  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 lg:ml-16 ml-0 sm:mt-0 sm:flex-none">
                            <Link href="/add_document" >
                                <span
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add New Document
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4 flow-root">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="border-2 lg:border-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p>Error: {error.message}</p>
                                    ) : (
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
                                                {filteredDocuments.map((document) => (
                                                    <tr key={document.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            {document.document_name}
                                                        </td>
                                                        <td className="whitespace-wrap px-3 py-2 text-sm text-gray-500">
                                                            {document.document_description}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                            {document.cdate}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
