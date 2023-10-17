import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link';
import { MagnifyingGlassIcon, ChevronDownIcon, DocumentArrowDownIcon } from '@heroicons/react/20/solid'
import Cookies from 'js-cookie';
import { GET_ALL_DOCUMENTS } from '@/graphql/User/queries'; // Import 
import jwt from 'jsonwebtoken';
import { useMutation, useQuery } from '@apollo/client';
const table_header = [
    { name: 'Uploaded By' },
    { name: 'Document Name' },
    { name: 'Added On' },
    { name: '' },
];
const user_attendance = [
    { id: 1, doc_name: 'Cheque', uploadedby: 'Neeru', addedon: '04-07-2023' },
    { id: 1, doc_name: 'Cheque', uploadedby: 'Shivam', addedon: '04-07-2023' },
    { id: 1, doc_name: 'Cheque', uploadedby: 'Gagan', addedon: '04-07-2023' },
    // More people...
]
interface Document {
    id: number;
    document_name: string;
    document_attachment: string[];
    cdate: string; // Assuming you want to store the date and time as a JavaScript Date object
}
// Define a type for your decoded token
interface DecodedToken {
    role: string; // Replace with the actual properties of your decoded token
    firstname: string; // Replace with the actual properties of your decoded token
    lastname: string; // Replace with the actual properties of your decoded token
    // Add other properties as needed
}
export default function AdminDocumentList() {

    const [userRole, setUserRole] = useState<string | null>(null);
    const [getAllData, setgetAllData] = useState<Document[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [fullName, setFullName] = useState<string | null>(null); // State variable for the full name


    const { loading, error, data } = useQuery(GET_ALL_DOCUMENTS);
    console.log("the data from api", data);

    useEffect(() => {
        const authToken = Cookies.get('authToken');

        if (authToken) {
            const decodedToken = jwt.decode(authToken) as DecodedToken | null;
            console.log("decoded token", decodedToken)
            if (decodedToken) {
                setUserRole(decodedToken.role);
                console.log(decodedToken.role);
                // Concatenate firstname and lastname and store it in the state variable
                const fullName = `${decodedToken.firstname} ${decodedToken.lastname}`;
                setFullName(fullName);
            }
        } else {
            console.log('Cookie not found');
        }
    }, []);
    useEffect(() => {
        if (userRole) {
            if (userRole === "CEO") {
                //call the api to fetch the all the documents
                // Call the API to fetch all the documents when userRole is 'CEO'
                if (data) {
                    setgetAllData(data.documentuploads); // Assuming 'documents' is the field in the API response that contains the document data
                }
            }
            else {
                //call the api to fetch document role wise
            }
        }
    }, [userRole, data]);
      const filteredDocuments = getAllData.filter((document) =>
        document.document_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Shared Documents
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

                    </div>
                    <div className="mt-4 flow-root">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="border-2 lg:border-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">


                                    {userRole === 'CEO' && getAllData && getAllData.length > 0 ? (
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
                                                {filteredDocuments?.map((person) => (
                                                    <tr key={person.id}>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                            {fullName}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.document_name}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.cdate}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                            {/* <Link href={person.document_attachment[0]}>
                                                            <DocumentArrowDownIcon className="h-6 w-6 text-gray-500" />
                                                            </Link> */}
                                                            <a href={person.document_attachment[0]} target="_blank" rel="noreferrer">
                                                                <DocumentArrowDownIcon className="h-6 w-6 text-gray-500" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>No data available for this user role.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
