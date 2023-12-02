import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, PlusCircleIcon, EyeIcon, DocumentArrowDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_PUBLIC_DOCUMENTS_BY_ID, GET__DOCUMENTS_BY_ID } from '@/graphql/User/queries'; // Import your GraphQL query
const table_header = [
    { name: 'Document Name' },
];
const documents = [
    { id: 1, by: 'Aakash Sharma', dname: 'Virtuos Spectacular Handbook' },
    { id: 1, by: 'Aakash Sharma', dname: 'Virtuos Programs Guide' },
    { id: 1, by: 'Aakash Sharma', dname: 'Virtuos Policies' },
    { id: 1, by: 'Aakash Sharma', dname: 'Virtuos Policies' },
    // More people...
]
interface Document {
    id: number;
    dname: string;
    // Add other properties as needed
}

export default function PublicDocument() {
    const [trDetail, setTrDetail] = useState(false)
    const [doc, setDoc] = useState(false)
    const [button, setButton] = useState(false)
    const [docname, setDocumentName] = useState("");
    const [docdesc, setDocumentDesc] = useState("")
    const [doccdate, setDocumentCdate] = useState("")
    const [docattachment, setDocumentAttachment] = useState("")
    const cancelButtonRef = useRef(null)
    const [getPublicDocuments, { data, loading, error }] = useMutation(GET_PUBLIC_DOCUMENTS_BY_ID);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedDocumentId, setSelectedDocumentId] = useState<number | null | undefined>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    interface Document {
        document_name: string;
        id: number;
        dname: string;
        // Add other properties as needed
    }// State to store fetched documents
    const [executeQuery, { loading: getdocloading, error: getdocerror, data: getDocumentById }] = useLazyQuery(GET__DOCUMENTS_BY_ID);
    console.log("GraphQL Query:", GET__DOCUMENTS_BY_ID?.loc?.source?.body);


    const fetchPublicDocuments = async (userId: any) => {
        // console.log(userId);
        try {
            const result = await getPublicDocuments({
                variables: {
                    userId,
                },
            });

            // Extract the documents from the result and update the state
            setDocuments(result.data.getPublicDocumentsByUserId);
            setDocuments(result.data.getPublicDocumentsByUserId);
            // console.log('Data:', result);
            // console.log('Data:', documents);
        } catch (e: any) {
            // Handle any errors
            console.error('Error:', e.message);
        }
    };

    const handleDocumentClick = (documentId: number) => {
        setSelectedDocumentId(documentId); // Set the selected document data
        setDoc(true); // Show the dialog
    };
    useEffect(() => {
        if (selectedDocumentId !== null) {
            console.log(selectedDocumentId)
            executeQuery({ variables: { id: selectedDocumentId } });
            console.log("data of that particular doc", getDocumentById);
        }
    }, [selectedDocumentId]);

    console.log("data of that particular doc", getDocumentById);
    useEffect(() => {
        if (getDocumentById && getDocumentById.documentupload) {

            console.log("data of that particular doc", getDocumentById.documentupload.document_name);
            // const { division } = getDivisionById; // Destructure the division object
            setDocumentName(getDocumentById.documentupload.document_name);
            setDocumentDesc(getDocumentById.documentupload.document_description);
            setDocumentCdate(getDocumentById.documentupload.cdate);
            setDocumentAttachment(getDocumentById.documentupload.document_attachment[0]);
            // setDivisionStatus(division.status);
        }
    }, [getDocumentById]);

    const handleIconClick = () => {
        // Define the URL you want to open in a new tab or window
        const newLink = 'https://example.com';

        // Open the link in a new tab
        if (docattachment) {

            window.open(docattachment, '_blank');
        }
    };
    useEffect(() => {
        // console.log('Data:', documents); // Log the documents state here
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

                console.log(decodedToken?.id);
                fetchPublicDocuments(decodedToken.id);
            }
            //   setTokenPayload(decodedToken.id);
        } else {
            // Handle the case where the cookie doesn't exist
            console.log('Cookie not found');
        }

        // // If the cookie exists, you can use it or decode it
        // // console.log('Auth Token:', authToken);
        // const decodedToken = jwt.decode(authToken);
        // // console.log(decodedToken?.id);
        // //   setTokenPayload(decodedToken.id);

        // fetchPublicDocuments(decodedToken?.id);
    }, []); // This effect will trigger whenever 'documents' changes
    const filteredDocuments = documents.filter((document) =>
        document.document_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Public Documents
                        </h2>
                    </div>
                </div>
            </div>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center ">
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
                    </div>

                    <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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

                                        {filteredDocuments.map((document) => {
                                            // console.log(document); // Log the document object

                                            return (
                                                <tr key={document.id}>
                                                    <td className="flex whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        <PlusCircleIcon onClick={() => handleDocumentClick(document.id)} className="h-6 w-6 text-gray-500" />
                                                        <span>{document.document_name}</span>
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                    </tbody>
                                </table>
                            )}

                        </div>
                        <Transition.Root show={doc} as={Fragment}>
                            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setDoc}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-10 overflow-y-auto">
                                    <div className="flex min-h-full items-end justify-center lg:p-4 -mt-32 lg:mt-0 text-center sm:items-center sm:p-0">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        >
                                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 lg:w-full w-80 sm:max-w-lg sm:p-6">
                                                <div className="space-y-2">
                                                    <div className="border-b border-gray-900/10 pb-4">
                                                        <h2 className="lg:text-lg text-sm font-semibold leading-7 text-gray-900">Details for Virtuos Spectacular Handbook Spectacular Handbook</h2>


                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 lg:gap-y-8  gap-y-2 lg:grid-cols-1">
                                                            <div className="sm:col-span-2">
                                                                <div className="mt-1">
                                                                    <table className="min-w-full divide-y divide-gray-300">
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 lg:text-sm text-xs text-gray-600 sm:pl-6">
                                                                                Document Name
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 lg:text-sm text-xs font-medium text-gray-500 sm:pl-6">
                                                                                {/* Virtuos Spectacular <br />Handbook */}
                                                                                {docname}
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 lg:text-sm text-xs text-gray-600 sm:pl-6">
                                                                                Detail
                                                                            </td>
                                                                            <td className="whitespace-wrap py-4 pl-4 pr-3 lg:text-sm text-xs font-medium text-gray-500 sm:pl-6">
                                                                                {docdesc}
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 lg:text-sm text-xs text-gray-600 sm:pl-6">
                                                                                Added on
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 lg:text-sm text-xs font-medium text-gray-500 sm:pl-6">
                                                                                {doccdate}
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 lg:text-sm text-xs text-gray-600 sm:pl-6">

                                                                            </td>
                                                                            <td className="flex whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                {/* <EyeIcon className="h-6 w-6 text-gray-500"     onClick={handleIconClick}/> | */}
                                                                                <DocumentArrowDownIcon className="h-6 w-6 text-gray-500" onClick={handleIconClick} />

                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-1">
                                                            <div className="lg:mt-5  sm:flex sm:flex-row-reverse">
                                                                <button
                                                                    type="button"
                                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                    onClick={() => setDoc(false)}
                                                                    ref={cancelButtonRef}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>





                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>

                    </div>
                </div>
            </div>
        </div>
    )
}
