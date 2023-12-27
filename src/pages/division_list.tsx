import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import Alert from '@/components/Alert';

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ADD_DIVISION_MUTATION, UPDATE_DIVISION_MUTATION, DELETE_DIVISION_MUTATION, REMOVE_MULTIPLE_DIVISIONS, GET_FILTERED_DIVISIONS, GET_DIVISIONS, GET_DIVISION_BY_ID } from '@/graphql/Division/queries';

const table_header = [
    { name: 'Division Name' },
    { name: 'Division Code' },
    { name: 'Status' },
    { name: 'Action' },
];
const ideas = [
    { id: 1, dtype: 'Application Consulting & Engineering', dname: 'ACE', dcode: 'Active' },
    { id: 1, dtype: 'Business 3 Operations', dname: 'B3O', dcode: 'Active' },
    { id: 1, dtype: 'CX.Digital Consulting', dname: 'CXD', dcode: 'Active' },
    // More people...
]

export default function DivisionList() {
    const [search, setSearch] = useState("");
    const [selectedDivisions, setSelectedDivisions] = useState<number[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showDeleteMessage, setshowDeleteMessage] = useState(false);
    const [showDeletedMessage, setshowDeletedMessage] = useState(false);
    const [quickEdit, setQuickEdit] = useState(false)
    const [formType, setformType] = useState('')
    const [divisionName, setDivisionName] = useState('')
    const [divisionCode, setDivisionCode] = useState('')
    const [divisionColor, setDivisionColor] = useState('')
    const [divisionStatus, setDivisionStatus] = useState('')
    const [divisionId, setDivisionId] = useState<number | null>()

    const [dnameError, setDnameError] = useState(false);
    const [dcodeError, setDcodeError] = useState(false);
    const [dstatusError, setDstatusError] = useState(false);

    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    const cancelButtonRef = useRef(null)


    const [alertState, setAlertState] = useState(true);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Function to update alertState when called from Alert component
    const handleAlertStateChange = (newState: boolean | ((prevState: boolean) => boolean)) => {
        setAlertState(newState);
    };


    const [executeQuery, { loading, error, data: getDivisionById }] = useLazyQuery(GET_DIVISION_BY_ID);
    // const [fExecuteQuery, { loading: fLoading, error: fError, data: fData }] = useLazyQuery(GET_FILTERED_DIVISIONS);
    const [createDivision, { loading: createDivisionLoading, error: createDivisionError }] = useMutation(ADD_DIVISION_MUTATION);
    const [updateDivision, { loading: updateDivisionLoading, error: updateDivisionError }] = useMutation(UPDATE_DIVISION_MUTATION);
    // const [deleteDivision, { loading: deleteDivisionLoading, error: deleteDivisionError }] = useMutation(DELETE_DIVISION_MUTATION);
    const [removeDivision] = useMutation(DELETE_DIVISION_MUTATION);
    const [removeMultipleDivisions] = useMutation(REMOVE_MULTIPLE_DIVISIONS);


    const { loading: getDivisionLoading, error: getDivisionError, data: getDivisionData, refetch } = useQuery(GET_DIVISIONS);
    console.log("users", getDivisionData);

    let itemlist: any[] = [];

    if (getDivisionData && getDivisionData.divisions) {
        itemlist = getDivisionData.divisions.map((division: { id: any; division_name: any; division_code: any; division_color: any; status: any; }) => ({
            id: division.id,
            dname: division.division_name,
            dcode: division.division_code,
            dcolor: division.division_color,
            dstatus: division.status,

        }));
    }




    const handleDelete = async (type: string, Id: number) => {
        console.log(Id);
        if (type && type === 'one') {
            try {
                const response = await removeDivision({
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
    const handleButtonClick = (type: string, id: number | null) => {
        setQuickEdit(true)
        setformType(type)
        console.log("id", id);
        // Add your logic here
        console.log("type", type);
        if (type && type === 'update') {
            setDivisionId(id)
            console.log("divisionId", divisionId);
        } else {

            setDivisionName('');
            setDivisionCode('');
            setDivisionColor('');
            setDivisionStatus('');
            setDivisionId(null);
        }

    };

    useEffect(() => {
        if (divisionId) {
            console.log(divisionId);
            executeQuery({ variables: { id: divisionId } });
            console.log(getDivisionById);
        }
    }, [divisionId,getDivisionById,executeQuery]);

    console.log(getDivisionById);
    useEffect(() => {
        if (getDivisionById && getDivisionById.division) {
            const { division } = getDivisionById; // Destructure the division object
            setDivisionName(division.division_name);
            setDivisionCode(division.division_code);
            setDivisionColor(division.division_color);
            setDivisionStatus(division.status);
        }
    }, [getDivisionById]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        console.log('called');
        (!divisionName) ? setDnameError(true) : setDnameError(false);
        (!divisionCode) ? setDcodeError(true) : setDcodeError(false);
        (!divisionStatus) ? setDstatusError(true) : setDstatusError(false);

        if (dnameError == true || dcodeError == true || dstatusError == true) {
            return;
        }

        console.log('Submit');
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        if (divisionId != null && divisionId != undefined) { //Update division
            try {
                console.log('Try to submit')
                console.log('divisionName', divisionName)
                console.log('divisionCode', divisionCode)
                console.log('divisionStatus', divisionStatus)
                const { data } = await updateDivision({
                    variables: {
                        updateDivisionInput: {
                            id: divisionId,
                            division_name: divisionName,
                            division_code: divisionCode,
                            division_color: divisionColor,
                            status: divisionStatus
                        },
                    },
                });


                setDivisionName('');
                setDivisionCode('');
                setDivisionColor('');
                setDivisionStatus('');

                setshowSuccessMessage(true);
                setshowErrorMessage(false);

                console.log('showSuccessMessage', showSuccessMessage);
                console.log('response', data);
                // console.log('response', response.data);
                setQuickEdit(false)
                refetch();
            } catch (error) {
                setshowErrorMessage(true);

                console.log('catchError', error);
            }

        } else { //Add division
            try {
                console.log('Try to submit')
                console.log('divisionName', divisionName)
                console.log('divisionCode', divisionCode)
                console.log('divisionStatus', divisionStatus)
                const { data: { createDivision: { id } } } = await createDivision({
                    variables: {
                        createDivisionInput: {
                            division_name: divisionName,
                            division_code: divisionCode,
                            division_color: divisionColor,
                            status: divisionStatus
                        },
                    },
                });
                console.log('response', id);

                setDivisionName('');
                setDivisionCode('');
                setDivisionColor('');
                setDivisionStatus('');

                setshowSuccessMessage(true);
                setshowErrorMessage(false);

                console.log('showSuccessMessage', showSuccessMessage);
                // console.log('response', data);
                // console.log('response', response.data);
                setQuickEdit(false)
                refetch();
            } catch (error) {
                setshowErrorMessage(true);

                console.log('catchError', error);
            }
        }

        // console.log(category);


    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, divisionId: string) => {
        if (divisionId === 'all') {
            if (event.target.checked) {
                const alldivisionIds = itemlist?.map(item => item.id) || [];
                setSelectedDivisions(alldivisionIds);
            } else {
                setSelectedDivisions([]);
            }
        } else {
            if (event.target.checked) {
                setSelectedDivisions(prevSelected => [...prevSelected, parseInt(divisionId, 10)]);
            } else {
                setSelectedDivisions(prevSelected => prevSelected.filter(id => id !== parseInt(divisionId, 10)));
            }
        }
    };
    const handleDeletes = async () => {
        console.log('selectedDivisions', selectedDivisions);
        // selectedDivisionIds
        try {
            // const { data } = await removeMultipleDivisions({
            //     variables: { ids: selectedDivisionIds },
            // });

            // console.log(data.removeMultipleDivisions);
            // Handle success message or any further actions

            const response = await removeMultipleDivisions({
                variables: { ids: selectedDivisions },
            });
            console.log(response.data);
            setshowDeletedMessage(true)
            refetch();
        } catch (error) {
            console.error('Error deleting divisions:', error);
            // Handle error message or any further actions
        }
    };



    const handleFilter = (keyword: React.SetStateAction<string>) => {
        console.log('keyword', keyword);
        // if (keyword && (keyword !== undefined || keyword !== "")) {
        setSearchKeyword(keyword)
        // } else {
        //     setSearchKeyword('')
        // }

    };
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
    // useEffect(() => {
    //     if (searchKeyword) {
    //         console.log(searchKeyword);
    //         fExecuteQuery({ variables: { filter: searchKeyword } });

    //     }
    // }, [searchKeyword]);

    // console.log(fData);
    // // useEffect(() => {
    // if (fData && fData.filterDivisions) {
    //     // const { filterDivisions } = fData; // Destructure the division object
    //     // console.log(fData.filterDivisions);
    //     // itemlist = fData.filterDivisions;
    //     itemlist = [];
    //     if (fData && fData.filterDivisions) {
    //         itemlist = fData.filterDivisions.map((division: { id: any; division_name: any; division_code: any; division_color: any; status: any; }) => ({
    //             id: division.id,
    //             dname: division.division_name,
    //             dcode: division.division_code,
    //             dcolor: division.division_color,
    //             dstatus: division.status,

    //         }));
    //     }
    //     // console.log(itemlist);
    // }
    // console.log(itemlist);
    // }, [fData]);

    // console.log(itemlist);
    // // if (searchKeyword && searchKeyword != "") {
    // //     console.log('searchKeyword', searchKeyword);
    // //     try {
    // //         const { loading: filterdivisionLoading, error: filterdivisionError, data: filterdivisionData } = useQuery(GET_FILTERED_DIVISIONS, {
    // //             variables: { filter: { keyword: searchKeyword } },
    // //         });
    // //         console.log('filterdivisionData', filterdivisionData)
    // //     } catch (error) {
    // //         console.log(error)
    // //     }
    // //     // itemlist = filterdivisionData;
    // // }


    const filteredDivision = search === "" ? itemlist : itemlist.filter((item: { dname: string; dcode: string }) => {
        const lowerSearch = search.toLowerCase();
        return (item.dname.toLowerCase().includes(lowerSearch) || item.dcode.toLowerCase().includes(lowerSearch));
    });

    const totalItems = filteredDivision.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate the start and end index for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the array to get the items for the current page
    const currentItems = filteredDivision.slice(startIndex, endIndex);

    const handlePageClick = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
    };


    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    // console.log('itemlist', itemlist.
    //     map((item:
    //         { id: any; division_name: any; division_code: any; division_color: any; status: any; }
    //     ) => item)
    // );


    return (
        <div className=' w-full rounded px-2'>
            {showDeleteMessage && (
                <Alert message="Are you sure you want to delete these Category(s)?" alertState={false} onAlertStateChange={function (newState: boolean): void {
                    throw new Error('Function not implemented.');
                } } />
            )}
            {showSuccessMessage && (
                // <Alert message="Division Added Successfully!" alertState={alertState} onAlertStateChange={handleAlertStateChange} />
                <Alert message="Division Added Successfully!" alertState={false} onAlertStateChange={function (newState: boolean): void {
                    throw new Error('Function not implemented.');
                } } />
            )}
            {showErrorMessage && (
                <Alert message="Something went wrong!" alertState={false} onAlertStateChange={function (newState: boolean): void {
                    throw new Error('Function not implemented.');
                } } />
            )}
            {showDeletedMessage && (
                <Alert message="Division Deleted Successfully!" alertState={false} onAlertStateChange={function (newState: boolean): void {
                    throw new Error('Function not implemented.');
                } } />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Manage Divisions
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
                                    onClick={() => handleButtonClick('add', null)}
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add New Divison
                                </a>

                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="border-2 lg:border-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300 h-auto">
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
                                                {currentItems.map((item: { id: any; dname: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; dcode: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; dstatus: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
                                                    <tr key={item.id}>
                                                        <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            <input
                                                                id={`checkbox-${item.id}`}
                                                                aria-describedby="comments-description"
                                                                name="comments"
                                                                type="checkbox"
                                                                onChange={event => handleCheckboxChange(event, item.id)}
                                                                checked={selectedDivisions.includes(item.id)}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                        </td>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            {item.dname}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.dcode}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.dstatus}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 h-auto">
                                                            <Menu as="div" className="align-baseline inline-block text-left">
                                                                <div>
                                                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
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

                                                                                <a onClick={() => handleButtonClick('update', item.id)} className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Edit</a>

                                                                            </Menu.Item>
                                                                            <Menu.Item>
                                                                                <a onClick={() => handleDelete('one', item.id)} className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Delete</a>
                                                                                {/* <a onClick={() => setshowDeleteMessage(true)} className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Delete</a> */}
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
                                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">{formType} Division</h2>
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
                                                                                                        type="email"
                                                                                                        name="email"
                                                                                                        id="email"
                                                                                                        onChange={(e) => setDivisionName(e.target.value)}
                                                                                                        // value={(formType == "update") ? divisionName : ""}
                                                                                                        value={divisionName}
                                                                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        placeholder="Division Name"
                                                                                                    />
                                                                                                    {dnameError && <p className="text-red-500 text-xs" >*Name is required</p>}
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                        <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                    </div>
                                                                                                    <input
                                                                                                        type="email"
                                                                                                        name="email"
                                                                                                        id="email"
                                                                                                        onChange={(e) => setDivisionCode(e.target.value)}
                                                                                                        // value={(formType == "update") ? divisionCode : ""}
                                                                                                        value={divisionCode}
                                                                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        placeholder="Division Code"
                                                                                                    />
                                                                                                    {dcodeError && <p className="text-red-500 text-xs" >*Code is required</p>}
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <select
                                                                                                        id="location"
                                                                                                        name="location"
                                                                                                        className="px-2 mt-2 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        defaultValue="Canada"
                                                                                                        onChange={(e) => setDivisionStatus(e.target.value)}
                                                                                                        // value={formType === "update" ? divisionStatus : ""}
                                                                                                        value={divisionStatus}
                                                                                                    >
                                                                                                        <option value="">Choose Type</option>
                                                                                                        <option value="Active">Active</option>
                                                                                                        <option value="Inactive">Inactive</option>
                                                                                                    </select>
                                                                                                    {dstatusError && <p className="text-red-500 text-xs" >*Status is required</p>}

                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                        <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                    </div>
                                                                                                    <input
                                                                                                        type="email"
                                                                                                        name="email"
                                                                                                        onChange={(e) => setDivisionColor(e.target.value)}
                                                                                                        // value={(formType == "update") ? divisionColor : ""}
                                                                                                        value={divisionColor}
                                                                                                        id="email"
                                                                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        placeholder="Color"
                                                                                                    />
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
                            <div className="mt-4">
                                <button
                                    onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="lg:mx-1 lg:px-2 lg:py-1 mx-1 px-2 py-1 rounded border bg-blue-800 text-white"
                                >
                                    Previous Page
                                </button>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageClick(index + 1)}
                                        className={classNames(
                                            'lg:mx-0.5 lg:px-1 mx-1 px-1 rounded border',
                                            currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'
                                        )}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="lg:mx-1 lg:px-2 lg:py-1 mx-1 px-2 py-1 rounded border bg-blue-800 text-white"
                                >
                                    Next Page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
