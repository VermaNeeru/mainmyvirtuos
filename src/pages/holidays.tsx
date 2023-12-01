import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import Alert from '@/components/Alert';
import DatePickerComp from '@/components/DatePickerComp/DatePickerComp';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ADD_Holidaylist_MUTATION, DELETE_Holidaylist_MUTATION, GET_Holidaylists, GET_Holidaylist_BY_ID, REMOVE_MULTIPLE_Holidaylists, UPDATE_Holidaylist_MUTATION } from '@/graphql/Holiday/queries';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const table_header = [
    { name: 'Type' },
    { name: 'Name' },
    { name: 'Date' },
    { name: 'Year' },
    { name: 'Action' },
];
const modules = [
    { id: 1, htype: 'Public', hname: 'Diwali 2023', hdate: '2023-11-12', hyear: '2023' },
    { id: 1, htype: 'Public', hname: 'Christmas 2023', hdate: '2023-12-25', hyear: '2023' },
    { id: 1, htype: 'RH', hname: 'BAKRI ID (ID-UL-ZUHA)', hdate: '2021-07-21', hyear: '2021' },
    // More people...
]

export default function Holidays() {
    // const [holidayDate, setholidayDate] = useState(new Date());

    const [search, setSearch] = useState("");
    const [SelectedHolidaylists, setSelectedHolidaylists] = useState<number[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [quickEdit, setQuickEdit] = useState(false)
    const [formType, setformType] = useState('')

    const [showDeleteMessage, setshowDeleteMessage] = useState(false);
    const [showDeletedMessage, setshowDeletedMessage] = useState(false);
    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    const cancelButtonRef = useRef(null)

    const [holidayId, setHolidayId] = useState<number>()
    const [holidayName, setHolidayName] = useState('')
    const [holidayType, setHolidayType] = useState('')
    const [holidayYear, setHolidayYear] = useState('')
    const [holidayDate, setHolidayDate] = useState(new Date())
    const [holidayImage, setHolidayImage] = useState('')
    const [holidayDescription, setHolidayDescription] = useState('')
    const [holidayNotes, setHolidayNotes] = useState('')
    const [mStatus, setmStatus] = useState('')

    const [aError, setAError] = useState(false);
    const [bError, setBError] = useState(false);

    const [executeQuery, { loading, error, data: getQueryById }] = useLazyQuery(GET_Holidaylist_BY_ID);
    // const [fExecuteQuery, { loading: fLoading, error: fError, data: fData }] = useLazyQuery(GET_FILTERED_DIVISIONS);
    const [createQuery, { loading: createQueryLoading, error: createQueryError }] = useMutation(ADD_Holidaylist_MUTATION);
    const [updateQuery, { loading: updateQueryLoading, error: updateQueryError }] = useMutation(UPDATE_Holidaylist_MUTATION);
    // const [deleteDivision, { loading: deleteDivisionLoading, error: deleteDivisionError }] = useMutation(DELETE_DIVISION_MUTATION);
    const [removeQuery] = useMutation(DELETE_Holidaylist_MUTATION);
    const [removeMultipleQuery] = useMutation(REMOVE_MULTIPLE_Holidaylists);

    const { loading: getAllDataLoading, error: getAllDataError, data: getAllData, refetch } = useQuery(GET_Holidaylists);
    console.log("allData", getAllData);

    let itemlist: any[] = [];

    if (getAllData && getAllData.holidaylists) {
        itemlist = getAllData.holidaylists.map((data: { id: any; holiday_name: any; holiday_type: any; status: any; }) => ({
            id: data.id,
            holiday_name: data.holiday_name,
            holiday_type: data.holiday_type,
            holiday_year: data.holiday_year,
            holiday_date: data.holiday_date,
            holiday_image: data.holiday_image,
            holiday_description: data.holiday_description,
            notes: data.notes,

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

    const handleButtonClick = (type: string, id: number | null) => {
        setQuickEdit(true)
        setformType(type)
        console.log("id", id);
        // Add your logic here
        console.log("type", type);
        if (type && type === 'update') {
            setHolidayId(id)
            console.log("holidayId", holidayId);
        } else {
            setHolidayName('');
            setHolidayType('');
            setHolidayImage('');
            setHolidayDate(new Date());
            setHolidayYear(null);
            setHolidayDescription('');
            setHolidayNotes('');
            setHolidayId(null);
        }

    };

    useEffect(() => {
        if (holidayId) {
            console.log(holidayId);
            executeQuery({ variables: { id: holidayId } });
            console.log(getQueryById);
        }
    }, [holidayId]);

    console.log(getQueryById);
    useEffect(() => {
        if (getQueryById && getQueryById.holidaylist) {
            const { holidaylist } = getQueryById; // Destructure the division object
            const dateObject = new Date(holidaylist?.holiday_date);
            // console.log(dateObject)

            setHolidayName(holidaylist?.holiday_name);
            setHolidayType(holidaylist?.holiday_type);
            setHolidayImage(holidaylist?.holiday_image);
            setHolidayDate(dateObject);
            setHolidayYear(holidaylist?.holiday_year);
            setHolidayDescription(holidaylist?.holiday_description);
            setHolidayNotes(holidaylist?.holiday_description);
            // setmStatus(holiday.status);

            // console.log('holidayName', holidayName)
            // console.log('holidayType', holidayType)
            // console.log('holidayYear', holidayYear)
            // console.log('holidayDate', holidayDate)
            // console.log('holidayImage', holidayImage)
            // console.log('holidayDescription', holidayDescription)
            // console.log('holidayNotes', holidayNotes)
        }
    }, [getQueryById]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        console.log('called');
        (!holidayName) ? setAError(true) : setAError(false);
        (!mStatus) ? setBError(true) : setBError(false);

        if (aError == true || bError == true) {
            return;
        }
        console.log('Submit');
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        if (holidayId != null && holidayId != undefined) { //Update division
            try {
                const holidayYear = 2023;
                console.log('Try to submit')
                console.log('holidayName', holidayName)
                console.log('holidayType', holidayType)
                console.log('holidayYear', holidayYear)
                console.log('holidayDate', holidayDate)
                console.log('holidayImage', holidayImage)
                console.log('holidayDescription', holidayDescription)
                console.log('holidayNotes', holidayNotes)
                // console.log('mStatus', mStatus)

                const isoDateString = holidayDate.toISOString();
                const dateOnly = isoDateString.split('T')[0];


                console.log('dateOnly', dateOnly)

                const { data } = await updateQuery({
                    variables: {
                        updateHolidaylistInput: {
                            id: holidayId,
                            holiday_name: holidayName,
                            holiday_type: holidayType,
                            holiday_year: holidayYear,
                            holiday_date: dateOnly,
                            holiday_image: holidayImage,
                            holiday_description: holidayDescription,
                            notes: holidayDescription,
                        },
                    },
                });
                setHolidayName('');
                setHolidayType('');
                setHolidayImage('');
                setHolidayDate(new Date());
                setHolidayYear(null);
                setHolidayDescription('');
                setHolidayNotes('');
                setHolidayId(null);

                // setHolidayName('');
                // setHolidayType('');
                // setmStatus('');

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
                // const holidayYear = holidayDate.getFullYear();
                const holidayYear = 2023;
                console.log('Try to submit')
                console.log('holidayName', holidayName)
                console.log('holidayType', holidayType)
                console.log('holidayYear', holidayYear)
                console.log('holidayDate', holidayDate)
                console.log('holidayImage', holidayImage)
                console.log('holidayDescription', holidayDescription)
                console.log('holidayNotes', holidayNotes)
                // console.log('mStatus', mStatus)

                const isoDateString = holidayDate.toISOString();
                const dateOnly = isoDateString.split('T')[0];


                console.log('dateOnly', dateOnly)
                const { data: { createHolidaylist: { id } } } = await createQuery({
                    variables: {
                        createHolidaylistInput: {
                            holiday_name: holidayName,
                            holiday_type: holidayType,
                            holiday_year: holidayYear,
                            holiday_date: dateOnly,
                            holiday_image: holidayImage,
                            holiday_description: holidayDescription,
                            notes: holidayDescription,

                        },
                    },
                });
                console.log('response', id);

                setHolidayName('');
                setHolidayType('');
                setHolidayImage('');
                setHolidayDate(new Date());
                setHolidayYear(null);
                setHolidayDescription('');
                setHolidayNotes('');

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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, holidayId: string) => {
        if (holidayId === 'all') {
            if (event.target.checked) {
                const allholidayIds = itemlist?.map(item => item.id) || [];
                setSelectedHolidaylists(allholidayIds);
            } else {
                setSelectedHolidaylists([]);
            }
        } else {
            if (event.target.checked) {
                setSelectedHolidaylists(prevSelected => [...prevSelected, parseInt(holidayId, 10)]);
            } else {
                setSelectedHolidaylists(prevSelected => prevSelected.filter(id => id !== parseInt(holidayId, 10)));
            }
        }
    };
    const handleDeletes = async () => {
        console.log('SelectedHolidaylists', SelectedHolidaylists);
        // selectedholidayIds
        try {
            const response = await removeMultipleQuery({
                variables: { ids: SelectedHolidaylists },
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
        setSearchKeyword(keyword)
    };

    const filteredData = search === "" ? itemlist : itemlist.filter((item: { holiday_name: string }) => {
        const lowerSearch = search.toLowerCase();
        return (item.holiday_name.toLowerCase().includes(lowerSearch));
    });
    return (
        <div className=' w-full rounded px-2'>
            {showDeleteMessage && (
                <Alert message="Are you sure you want to delete these Category(s)?" />
            )}
            {showSuccessMessage && (
                // <Alert message="Division Added Successfully!" alertState={alertState} onAlertStateChange={handleAlertStateChange} />
                <Alert message="Division Added Successfully!" />
            )}
            {showErrorMessage && (
                <Alert message="Something went wrong!" />
            )}
            {showDeletedMessage && (
                <Alert message="Division Deleted Successfully!" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Manage Holidays
                        </h2>
                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className="px-4 sm:px-2 lg:px-1 mt-4 mb-10">
                    <div className="py-2 align-middle sm:px-6 lg:px-8">
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
                            <div className="mt-4 lg:ml-16 ml-0 sm:mt-0 gap-1 sm:flex-none flex lg:space-x-2">
                                <a onClick={() => handleButtonClick('add', null)}
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center lg:text-sm text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add New Holiday
                                </a>
                                <button
                                    type="button"
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center lg:text-sm text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Bulk Upload
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
                                                                checked={SelectedHolidaylists.includes(item.id)}

                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.holiday_type}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.holiday_name}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.holiday_date}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.holiday_year}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                            <Menu as="div" className="relative inline-block text-left">
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
                                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full w-80 sm:max-w-lg sm:p-6">
                                                                <div className="space-y-2">
                                                                    <div className="border-b border-gray-900/10 pb-4">
                                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Add Holiday</h2>
                                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                                            <div className="sm:col-span-2">
                                                                                <div className="space-y-2 px-2 py-2">
                                                                                    <div className="pb-4">
                                                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2">
                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <select
                                                                                                        id="location"
                                                                                                        name="location"
                                                                                                        className="px-2 mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        defaultValue="Canada"
                                                                                                        onChange={(e) => setHolidayType(e.target.value)}
                                                                                                        value={holidayType}

                                                                                                    >
                                                                                                        <option>Choose Type</option>
                                                                                                        <option>RH</option>
                                                                                                        <option>Public</option>
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                        <ComputerDesktopIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                    </div>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        name="email"
                                                                                                        onChange={(e) => setHolidayName(e.target.value)}
                                                                                                        value={holidayName}

                                                                                                        id="email"
                                                                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        placeholder="Holiday Name" />
                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-4 ">
                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                                        Holiday Date
                                                                                                    </label>
                                                                                                    {/* 
                                                                                                    <DatePickerComp  /> */}

                                                                                                    <DatePicker selected={holidayDate} onChange=
                                                                                                        {(date: React.SetStateAction<Date>) => setHolidayDate(date)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                                                                                    />

                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <textarea
                                                                                                        rows={2}
                                                                                                        name="comment"
                                                                                                        id="comment"
                                                                                                        onChange={(e) => setHolidayDescription(e.target.value)}
                                                                                                        value={holidayDescription}

                                                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        defaultValue={''}
                                                                                                        placeholder='Holiday Description'
                                                                                                    />
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                        <ComputerDesktopIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                    </div>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        name="email"
                                                                                                        onChange={(e) => setHolidayImage(e.target.value)}
                                                                                                        value={holidayImage}

                                                                                                        id="email"
                                                                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        placeholder="Holiday Image" />
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
