import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, ComputerDesktopIcon, Bars3Icon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import Alert from '@/components/Alert';
const table_header = [
    { name: 'User Name' },
    { name: 'Leave Type' },
    { name: 'Balance' },
];
const modules = [
    { id: 1, uname: 'Neeru', leave_type: 'SL', balance: '1' },
    { id: 1, uname: 'Gagan', leave_type: 'CL', balance: '1' },
    { id: 1, uname: 'Shivam', leave_type: 'EL', balance: '2' },
    { id: 1, uname: 'Neeru', leave_type: 'SL', balance: '1' },
    { id: 1, uname: 'Gagan', leave_type: 'CL', balance: '1' },
    { id: 1, uname: 'Shivam', leave_type: 'EL', balance: '2' },
    // More people...
]

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ADD_Useryearlyleavebalance_MUTATION, UPDATE_Useryearlyleavebalance_MUTATION, DELETE_Useryearlyleavebalance_MUTATION, REMOVE_MULTIPLE_Useryearlyleavebalances, GET_FILTERED_UseryearlyleavebalanceS, GET_Useryearlyleavebalances, GET_Useryearlyleavebalance_BY_ID } from '@/graphql/LeaveBalance/queries';

export default function LeaveBalanceUpload() {
    const [csvData, setCSVData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [search, setSearch] = useState("");
    const [selectedUseryearlyleavebalances, setSelectedUseryearlyleavebalances] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showDeleteMessage, setshowDeleteMessage] = useState(false);
    const [showDeletedMessage, setshowDeletedMessage] = useState(false);
    const [quickEdit, setQuickEdit] = useState(false)
    const [formType, setformType] = useState('')
    const [leavetypeName, setleavetypeName] = useState('')
    const [leavetypeCode, setleavetypeCode] = useState('')
    const [leavetypeCount, setleavetypeCount] = useState('')
    const [leavetypeStatus, setleavetypeStatus] = useState('')
    const [leavetypeId, setleavetypeId] = useState<number>()

    const [dnameError, setDnameError] = useState(false);
    const [dcodeError, setDcodeError] = useState(false);
    const [dstatusError, setDstatusError] = useState(false);

    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    const cancelButtonRef = useRef(null)

    const [alertState, setAlertState] = useState(true);

    // Function to update alertState when called from Alert component
    const handleAlertStateChange = (newState: boolean | ((prevState: boolean) => boolean)) => {
        setAlertState(newState);
    };

    const [executeQuery, { loading, error, data: getUseryearlyleavebalanceById }] = useLazyQuery(GET_Useryearlyleavebalance_BY_ID);
    // const [fExecuteQuery, { loading: fLoading, error: fError, data: fData }] = useLazyQuery(GET_FILTERED_UseryearlyleavebalanceS);
    const [createUseryearlyleavebalance, { loading: createUseryearlyleavebalanceLoading, error: createUseryearlyleavebalanceError }] = useMutation(ADD_Useryearlyleavebalance_MUTATION);
    const [updateUseryearlyleavebalance, { loading: updateUseryearlyleavebalanceLoading, error: updateUseryearlyleavebalanceError }] = useMutation(UPDATE_Useryearlyleavebalance_MUTATION);
    // const [deleteUseryearlyleavebalance, { loading: deleteUseryearlyleavebalanceLoading, error: deleteUseryearlyleavebalanceError }] = useMutation(DELETE_Useryearlyleavebalance_MUTATION);
    const [removeUseryearlyleavebalance] = useMutation(DELETE_Useryearlyleavebalance_MUTATION);
    const [removeMultipleUseryearlyleavebalances] = useMutation(REMOVE_MULTIPLE_Useryearlyleavebalances);

    const { loading: getUseryearlyleavebalanceLoading, error: getUseryearlyleavebalanceError, data: getUseryearlyleavebalanceData, refetch } = useQuery(GET_Useryearlyleavebalances);
    console.log("leavebalance", getUseryearlyleavebalanceData);

    let itemlist: any[] = [];

    if (getUseryearlyleavebalanceData && getUseryearlyleavebalanceData.useryearlyleavebalances) {
        itemlist = getUseryearlyleavebalanceData.useryearlyleavebalances.map((data: { id: any; user: { firstname: any; lastname: any; }; leavetype: { leave_type_name: any; leave_type_code: any; }; leave_count: any; status: any; }) => ({
            id: data.id,
            firstname: data.user.firstname,
            lastname: data.user.lastname,
            leave_type_name: data.leavetype.leave_type_name,
            leave_type_code: data.leavetype.leave_type_code,
            leave_count: data.leave_count,
            leave_type_status: data.status,

        }));
    }
    console.log(itemlist);
    const handleDelete = async (type: string, Id: number) => {
        console.log(Id);
        if (type && type === 'one') {
            try {
                const response = await removeUseryearlyleavebalance({
                    variables: { id: Id },
                });
                console.log(response.data);
                setshowDeletedMessage(true)
                refetch();
            } catch (error) {
                console.log(error);
                setshowErrorMessage(true);
            }
        }
    }
    const handleButtonClick = (type: string, id: number) => {
        setQuickEdit(true)
        setformType(type)
        console.log("id", id);
        // Add your logic here
        console.log("type", type);
        if (type && type === 'update') {
            setleavetypeId(id)
            console.log("leavetypeId", leavetypeId);
        } else {

            setleavetypeName('');
            setleavetypeCode('');
            setleavetypeCount('');
            setleavetypeStatus('');
            setleavetypeId(null);
        }

    };

    useEffect(() => {
        if (leavetypeId) {
            console.log(leavetypeId);
            executeQuery({ variables: { id: leavetypeId } });
            console.log(getUseryearlyleavebalanceById);
        }
    }, [leavetypeId]);

    console.log(getUseryearlyleavebalanceById);
    useEffect(() => {
        if (getUseryearlyleavebalanceById && getUseryearlyleavebalanceById.useryearlyleavebalance) {
            const { useryearlyleavebalance } = getUseryearlyleavebalanceById; // Destructure the useryearlyleavebalance object
            setleavetypeName(useryearlyleavebalance.useryearlyleavebalance_name);
            setleavetypeCode(useryearlyleavebalance.useryearlyleavebalance_code);
            setleavetypeCount(useryearlyleavebalance.useryearlyleavebalance_color);
            setleavetypeStatus(useryearlyleavebalance.status);
        }
    }, [getUseryearlyleavebalanceById]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        console.log('called');
        // if (csvData.length == 0) {
        //     return;
        // }
        // (!csvData) ? setErrorMessage(true) : setErrorMessage(false);

        // if (errorMessage == true) {
        //     return;
        // }

        console.log('Submit');
        e.preventDefault();
        // const currentDate = new Date();
        // const formattedDate = currentDate.toISOString();

        try {
            console.log('Try to submit');

            // Create an array of promises for GraphQL mutations
            const mutationPromises = csvData.map(async (item) => {
                // Check if the item has all required values
                if (item[0] && item[1] && item[2] && item[3]) {
                    console.log('user_id', item[0]);
                    console.log('leave_type_id', item[1]);
                    console.log('leave_count', item[2]);
                    console.log('status', item[3]);

                    const { data: { createUseryearlyleavebalance: { id } } } = await createUseryearlyleavebalance({
                        variables: {
                            createUseryearlyleavebalanceInput: {
                                user_id: parseInt(item[0]),
                                leave_type_id: parseInt(item[1]),
                                leave_count: parseInt(item[2]),
                                status: item[3]
                            },
                        },
                    });
                    console.log(id)
                    // return id;
                } else {
                    // Handle the case where an item is missing values (e.g., log an error or skip)
                    console.error('Skipping item:', item);
                    // return null; // You can choose to return something else or omit the return statement
                }
            });


            // Wait for all GraphQL mutations to complete
            // const ids = await Promise.all(mutationPromises);

            // console.log('Created Useryearlyleavebalance records:', ids);

            // Continue with any additional logic or actions here

            // Example: Reset form fields, show success message, etc.
            setshowSuccessMessage(true);
            setshowErrorMessage(false);

            console.log('showSuccessMessage', showSuccessMessage);
            // console.log('response', data);

            setQuickEdit(false);
            refetch();
        } catch (error) {
            setshowErrorMessage(true);
            console.log('catchError', error);
        }


        // console.log(category);

    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, leavetypeId: string) => {
        if (leavetypeId === 'all') {
            if (event.target.checked) {
                const allleavetypeIds = itemlist.map(item => item.id);
                setSelectedUseryearlyleavebalances(allleavetypeIds);
            } else {
                setSelectedUseryearlyleavebalances([]);
            }
        } else {
            if (event.target.checked) {
                setSelectedUseryearlyleavebalances(prevSelected => [...prevSelected, leavetypeId]);
            } else {
                setSelectedUseryearlyleavebalances(prevSelected =>
                    prevSelected.filter(id => id !== leavetypeId)
                );
            }
        }
    };
    const handleDeletes = async () => {
        console.log('selectedUseryearlyleavebalances', selectedUseryearlyleavebalances);
        // selectedleavetypeIds
        try {
            const response = await removeMultipleUseryearlyleavebalances({
                variables: { ids: selectedUseryearlyleavebalances },
            });
            console.log(response.data);
            setshowDeletedMessage(true)
            refetch();
        } catch (error) {
            console.error('Error deleting useryearlyleavebalances:', error);
        }
    };


    const filteredUseryearlyleavebalance = search === "" ? itemlist : itemlist.filter((item: { firstname: string; lastname: string }) => {
        const lowerSearch = search.toLowerCase();
        return (item.firstname.toLowerCase().includes(lowerSearch) || item.lastname.toLowerCase().includes(lowerSearch));
    });

    const handleFileChange = (event: { target: { files: any[]; }; }) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // Call a function to read the CSV file content
            readCSVFile(selectedFile);
        }
    };

    const readCSVFile = (file: Blob) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            // Parse the CSV content into an array of rows and columns
            const rows = content.split('\n').map((row: string) => row.split(','));
            setCSVData(rows);
        };
        reader.onerror = () => {
            setErrorMessage('Error reading the CSV file.');
        };
        reader.readAsText(file); // Read the file as text

        console.log(csvData)
    };

    // useEffect(() => {
    //     console.log(csvData)
    // }, [csvData]);
    return (
        <div className=' w-full rounded px-2'>
            {showDeleteMessage && (
                <Alert message="Are you sure you want to delete these Category(s)?" />
            )}
            {showSuccessMessage && (
                // <Alert message="Useryearlyleavebalance Added Successfully!" alertState={alertState} onAlertStateChange={handleAlertStateChange} />
                <Alert message="Useryearlyleavebalance Added Successfully!" />
            )}
            {showErrorMessage && (
                <Alert message="Something went wrong!" />
            )}
            {showDeletedMessage && (
                <Alert message="Useryearlyleavebalance Deleted Successfully!" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Manage User Leaves
                        </h2>
                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className="px-4 sm:px-2 lg:px-1 mt-4 mb-10">
                    <div className="py-2 align-middle sm:px-6 lg:px-8">
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
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        // onChange={(e) => handleFilter(e.target.value)}
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


                                <a
                                    // onClick={() => setQuickEdit(true)}
                                    onClick={() => handleButtonClick('add', '')}

                                    type="button"
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Bulk Upload
                                </a>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="border-2 lg:border-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="flex py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        <input
                                                            id="selectAll"
                                                            aria-describedby="comments-description"
                                                            name="comments"
                                                            type="checkbox"
                                                            onChange={event => handleCheckboxChange(event, 'all')}
                                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <TrashIcon className="h-6 w-6 text-gray-500" onClick={handleDeletes} />
                                                    </th>

                                                    {table_header.map((val, index) => (
                                                        <th scope="col" key={index} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                            {val.name}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {filteredUseryearlyleavebalance.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            <input
                                                                id={`checkbox-${item.id}`}
                                                                aria-describedby="comments-description"
                                                                name="comments"
                                                                type="checkbox"
                                                                onChange={event => handleCheckboxChange(event, item.id)}
                                                                checked={selectedUseryearlyleavebalances.includes(item.id)}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                        </td>

                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.firstname} {item.lastname}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.leave_type_code}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.leave_count}</td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <Transition.Root show={quickEdit} as={Fragment}>
                                            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setQuickEdit}>
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
                                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Upload Leave Balance Sheet</h2>
                                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-1">
                                                                            <div className="sm:col-span-2">
                                                                                <div className="space-y-2 px-2 py-2">
                                                                                    <div className="pb-4">
                                                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-4 ">
                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                        <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                    </div>
                                                                                                    <input
                                                                                                        type="file"
                                                                                                        name="email"
                                                                                                        onChange={handleFileChange}
                                                                                                        id="email"
                                                                                                        className="block w-full roussnded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        placeholder="Choose File"
                                                                                                    />
                                                                                                    {errorMessage && <p className="error-message">Select file first</p>}
                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="lg:mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                                            <div className="lg:mt-5 sm:flex sm:flex-row-reverse">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={handleSubmit}
                                                                                    className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                                >
                                                                                    Save
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    className="mt-3 ml-2 lg:ml-0 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                                    onClick={() => setQuickEdit(false)}
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
                    </div>
                </div>
            </div>

        </div>
    )
}
