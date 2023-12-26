import React, { Fragment, useState, useRef, useEffect } from 'react'
import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_Otherexpense_MUTATION, GET_Otherexpenses, REMOVE_MULTIPLE_Otherexpenses, UPDATE_Otherexpense_MUTATION } from '@/graphql/Otherexpense/queries';
import Alert from '@/components/Alert';
import { getUserData } from '@/components/UserData';

const table_header = [
    { name: 'Month' },
    { name: 'Advance Req' },
    { name: 'Advance Approved' },
    { name: 'Total Expenses' },
    { name: 'Status' },

];
const accounts_travel = [
    { id: 1, month: 'January', total_advance_req: '0', total_advance_approved: '0', total_expenses: '198', status: 'Approved' },
    { id: 1, month: 'February', total_advance_req: '0', total_advance_approved: '0', total_expenses: '198', status: 'Pending' },
    { id: 1, month: 'March', total_advance_req: '0', total_advance_approved: '0', total_expenses: '198', status: 'Pending' },
    // More people...
]
export default function UserAdvanceList() {
    const [selectedYear, setSelectedYear] = useState<Date | null>(null);

    const [trDetail, setTrDetail] = useState(false)
    // const cancelButtonRef = useRef(null)
    const [search, setSearch] = useState("");
    const [quickEdit, setQuickEdit] = useState(false)
    const cancelButtonRef = useRef(null)
    const [showDeletedMessage, setshowDeletedMessage] = useState(false);
    const [showUpdatedMessage, setshowUpdatedMessage] = useState(false);
    const [SelectedOtherexpenses, setSelectedOtherexpenses] = useState<number[]>([]);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const userData = getUserData();
    const [userId, setUserId] = useState<number | null | undefined>(userData?.id)

    const handleYearChange = (date: Date) => {
        setSelectedYear(date);

        const year = date.getFullYear();

        // Update the search state with the year
        setSearch(String(year));
    };

    const [removeQuery] = useMutation(DELETE_Otherexpense_MUTATION);
    const [removeMultipleQuery] = useMutation(REMOVE_MULTIPLE_Otherexpenses);

    const { loading: getAllDataLoading, error: getAllDataError, data: getAllData, refetch } = useQuery(GET_Otherexpenses);
    console.log("allData", getAllData);

    let itemlist: any[] = [];

    if (getAllData && getAllData.otherexpenses) {
        itemlist = getAllData.otherexpenses.map((data: { id: any; expense_type: any; expense_date: any; expense_amount: any; notes: any; details: any; drive_link: any; account_approval: any; amount_approved: any; amount_requested: any; user: { firstname: any; lastname: any; }; status: any; }) => ({
            id: data.id,
            expense_type: data.expense_type,
            expense_date: data.expense_date,
            expense_amount: data.expense_amount,
            notes: data.notes,
            details: data.details,
            drive_link: data.drive_link,
            account_approval: data.account_approval,
            amount_approved: data.amount_approved,
            amount_requested: data.amount_requested,
            firstname: data.user.firstname,
            lastname: data.user.lastname,
            status: data.status,

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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, otherexpenseId: string) => {
        if (otherexpenseId === 'all') {
            if (event.target.checked) {
                const allotherexpenseIds = itemlist?.map(item => item.id) || [];
                setSelectedOtherexpenses(allotherexpenseIds);
            } else {
                setSelectedOtherexpenses([]);
            }
        } else {
            if (event.target.checked) {
                setSelectedOtherexpenses(prevSelected => [...prevSelected, parseInt(otherexpenseId, 10)]);
            } else {
                setSelectedOtherexpenses(prevSelected => prevSelected.filter(id => id !== parseInt(otherexpenseId, 10)));
            }
        }
    };
    const handleDeletes = async () => {
        console.log('SelectedOtherexpenses', SelectedOtherexpenses);
        // selectedOtherexpenseIds
        try {
            const response = await removeMultipleQuery({
                variables: { ids: SelectedOtherexpenses },
            });
            console.log(response.data);
            setshowDeletedMessage(true)
            refetch();
        } catch (error) {
            console.error('Error deleting divisions:', error);
            // Handle error message or any further actions
        }
    };

    const filteredData = search === "" ? itemlist : itemlist.filter((item: { expense_date: string }) => {
        console.log('search', search)
        const lowerSearch = search.toLowerCase();
        return (item.expense_date.toLowerCase().includes(lowerSearch));
    });

    return (
        <div className=' w-full rounded px-2'>
            {showDeletedMessage && (
                <Alert message="Travel Request Deleted Successfully!" alertState={false} onAlertStateChange={function (newState: boolean): void {
                    throw new Error('Function not implemented.');
                } } />
            )}
            {showUpdatedMessage && (
                <Alert message="Travel Request Updated Successfully!" alertState={false} onAlertStateChange={function (newState: boolean): void {
                    throw new Error('Function not implemented.');
                } } />
            )}
            {showErrorMessage && (
                <Alert message="Something went wrong!" alertState={false} onAlertStateChange={function (newState: boolean): void {
                    throw new Error('Function not implemented.');
                } } />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            My Expense Advances
                        </h2>
                    </div>
                </div>
            </div>
            <div className='rounded-lg border border-gray-300 bg-white'>
                <div className=" mb-4 px-4 py-4">
                    <form>
                        <div className="mt-2 grid lg:grid-cols-1 gap-x-6 gap-y-8 grid-cols-1">
                            <div className="col-span-1 ">
                                <div className='grid grid-cols-1 gap-x-6 lg:gap-y-8 gap-y-2 lg:grid-cols-6'>
                                    <label htmlFor="start-date" className="col-span-1  block lg:text-sm text-xs font-medium leading-6 text-gray-900">
                                        Search by Year
                                    </label>
                                    <div className="col-span-1 ">
                                        <DatePicker
                                            dateFormat="yyyy"
                                            showYearPicker
                                            selected={selectedYear}
                                            onChange={handleYearChange}
                                            placeholderText="Select Year"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="sm:col-span-1  rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Search
                                    </button>
                                </div>

                            </div>
                        </div>

                    </form>
                </div>
            </div>

            <div className="lg:mt-6 lg:-mx-4 lg:-my-2 overflow-x-auto lg:-mx-6 lg:-mx-8">
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
                                                checked={SelectedOtherexpenses.includes(item.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                            {new Date(item.expense_date).toLocaleString('default', { month: 'long' })}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.amount_requested}</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.amount_approved}</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.expense_amount}</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Transition.Root show={trDetail} as={Fragment}>
                            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setTrDetail}>
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
                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Travel Advance Payment</h2>


                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 lg:gap-y-8 gap-y-2 lg:grid-cols-1">
                                                            <div className="sm:col-span-2">
                                                                <div className="mt-1">
                                                                    <div className=" mb-1 px-2 py-2">

                                                                        <form>
                                                                            <div className="space-y-2">
                                                                                <div className="pb-1">
                                                                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-8 lg:grid-cols-6">

                                                                                        <div className="sm:col-span-6">
                                                                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                                Amount
                                                                                            </label>
                                                                                            <div className="mt-3">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    name="amount"
                                                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                />
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="sm:col-span-6">
                                                                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                                Notes
                                                                                            </label>
                                                                                            <div className="mt-3">
                                                                                                <textarea
                                                                                                    rows={2}
                                                                                                    name="comment"
                                                                                                    id="comment"
                                                                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                    defaultValue={''}
                                                                                                    placeholder="Notes"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-1">
                                                            <div className="-mt-5 lg:mt-4 lg:flex  lg:flex-row-reverse">
                                                                <button
                                                                    type="submit"
                                                                    className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="mt-3 ml-2 lg:ml-0 inline-flex lg:w-20  justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                    onClick={() => setTrDetail(false)}
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
