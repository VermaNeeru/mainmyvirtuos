import React, { Fragment, useState, useRef, useEffect } from 'react'
import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_Travelrequest_MUTATION, GET_Travelrequest_BY_UID, GET_Travelrequests, REMOVE_MULTIPLE_Travelrequests, UPDATE_Travelrequest_MUTATION } from '@/graphql/Travel/queries';
import Alert from '@/components/Alert';
import { getUserData } from '@/components/UserData';

const table_header = [
    { name: 'Name' },
    { name: 'Type' },
    { name: 'Purpose' },
    { name: 'Date' },
    { name: 'Status' },
];
const user_attendance = [
    { id: 1, name: 'Neeru', type: 'CL', tdate: '04-07-2023', purpose: 'test', status: 'true', },
    { id: 2, name: 'Shivam', type: 'CL', tdate: '04-07-2023', purpose: 'test', status: 'true', },
    { id: 3, name: 'Gagan', type: 'CL', tdate: '04-07-2023', purpose: 'test', status: 'true', },
    // More people...
]
export default function Travel() {
    const [search, setSearch] = useState("");
    const [quickEdit, setQuickEdit] = useState(false)
    const cancelButtonRef = useRef(null)
    const [showDeletedMessage, setshowDeletedMessage] = useState(false);
    const [showUpdatedMessage, setshowUpdatedMessage] = useState(false);
    const [SelectedTravelrequests, setSelectedTravelrequests] = useState<number[]>([]);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const userData = getUserData();
    const [userId, setUserId] = useState<number | null | undefined>(userData?.id)

    const [removeQuery] = useMutation(DELETE_Travelrequest_MUTATION);
    const [removeMultipleQuery] = useMutation(REMOVE_MULTIPLE_Travelrequests);
    const [updateQuery, { loading: updateQueryLoading, error: updateQueryError }] = useMutation(UPDATE_Travelrequest_MUTATION);

    const [executeQueryByUid, { loading: loadingut, error: errorByUid, data: getQueryByUid, refetch }] = useLazyQuery(GET_Travelrequest_BY_UID);
    useEffect(() => {
        executeQueryByUid({ variables: { id: userId } });
        console.log(getQueryByUid);
    }, []);
    console.log(getQueryByUid);

    let itemlist: any[] = [];

    // useEffect(() => {
    if (getQueryByUid && getQueryByUid.travelrequestByUid) {
        console.log(getQueryByUid)
        const { travelrequestByUid } = getQueryByUid; // Destructure the division object
        // let quarters = [leavetype.quarter_one, leavetype.quarter_two, leavetype.quarter_three];
        // setSections1(quarters)
        itemlist = getQueryByUid.travelrequestByUid.map((data: { id: any; travel_type: any; travel_name: any; travel_mode: any; travel_notes: any; travel_status: any; travel_purpose: any; travel_assistance: any; travel_approved_by: any; distance: any; advance_amount: any; amount_approved: any; assistance_type: any; approvedby: { firstname: any; lastname: any; }; }) => ({
            id: data.id,
            travel_type: data.travel_type,
            travel_name: data.travel_name,
            travel_mode: data.travel_mode,
            travel_notes: data.travel_notes,
            travel_status: data.travel_status,
            travel_purpose: data.travel_purpose,
            travel_assistance: data.travel_assistance,
            travel_approved_by: data.travel_approved_by,
            distance: data.distance,
            advance_amount: data.advance_amount,
            amount_approved: data.amount_approved,
            assistance_type: data.assistance_type,
            approvedby_firstname: data.approvedby.firstname,
            approvedby_lastname: data.approvedby.lastname,
            // leave_count: data.leave_count
        }));
    }

    const handleDelete = async (type: string, Id: number) => {
        console.log(Id);
        if (type && type === 'one') {
            try {
                const response = await removeQuery({
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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, travelrequestId: string) => {
        if (travelrequestId === 'all') {
            if (event.target.checked) {
                const alltravelrequestIds = itemlist?.map(item => item.id) || [];
                setSelectedTravelrequests(alltravelrequestIds);
            } else {
                setSelectedTravelrequests([]);
            }
        } else {
            if (event.target.checked) {
                setSelectedTravelrequests(prevSelected => [...prevSelected, parseInt(travelrequestId, 10)]);
            } else {
                setSelectedTravelrequests(prevSelected => prevSelected.filter(id => id !== parseInt(travelrequestId, 10)));
            }
        }
    };
    const handleDeletes = async () => {
        console.log('SelectedTravelrequests', SelectedTravelrequests);
        // selectedTravelrequestIds
        try {
            const response = await removeMultipleQuery({
                variables: { ids: SelectedTravelrequests },
            });
            console.log(response.data);
            setshowDeletedMessage(true)
            refetch();
        } catch (error) {
            console.error('Error deleting divisions:', error);
            // Handle error message or any further actions
        }
    };

    const handleStatusChange = async (val: string, id: any) => {
        console.log('val', val);
        console.log('id', id);
        // selectedTravelrequestIds
        try {
            const { data } = await updateQuery({
                variables: {
                    updateTravelrequestInput: {
                        id: id,
                        travel_status: val,
                    },
                },
            });
            console.log('response', data);
            setshowUpdatedMessage(true)
            refetch();
        } catch (error) {
            setshowErrorMessage(true);

            console.log('Error :', error);
            // Handle error message or any further actions
        }
    };

    const filteredData = search === "" ? itemlist : itemlist.filter((item: { travel_name: string, travel_status: string }) => {
        const lowerSearch = search.toLowerCase();
        return (item.travel_name.toLowerCase().includes(lowerSearch) || item.travel_status.toLowerCase().includes(lowerSearch));
    });
    return (
        <div className=' w-full rounded px-2'>
            {showDeletedMessage && (
                <Alert message="Travel Request Deleted Successfully!" />
            )}
            {showUpdatedMessage && (
                <Alert message="Travel Request Updated Successfully!" />
            )}
            {showErrorMessage && (
                <Alert message="Something went wrong!" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            My Travel Requests
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className="px-4 sm:px-6 lg:px-8 mt-10 mb-10">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
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
                        <div className="mt-4 lg:ml-16 lg:ml-10 sm:mt-0 sm:flex-none">
                            <Link href="/add_travel_req" >
                                <span
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Travel Request
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4 flow-root">
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
                                            {filteredData.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        <input
                                                            id="comments"
                                                            aria-describedby="comments-description"
                                                            name="comments"
                                                            type="checkbox"
                                                            onChange={event => handleCheckboxChange(event, item.id)}
                                                            checked={SelectedTravelrequests.includes(item.id)}

                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.travel_name}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.travel_type}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.travel_purpose}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">26-09-2023</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.travel_status}</td>

                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                        <select
                                                            id="location"
                                                            name="location"
                                                            value={item.travel_status}
                                                            onChange={(e) => handleStatusChange(e.target.value, item.id)}
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue="Canada"
                                                        >
                                                            <option>Approved</option>
                                                            <option>Pending</option>
                                                            <option>Rejected</option>
                                                        </select>
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
