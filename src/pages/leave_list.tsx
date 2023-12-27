import { GET_Leave, REMOVE_USER_Leave } from '@/graphql/User/queries';
import { useMutation, useQuery } from '@apollo/client';
import { Dialog, Transition } from '@headlessui/react';
import { ComputerDesktopIcon } from '@heroicons/react/24/solid';
import React, { Fragment, useRef, useState } from 'react'
const table_header = [
    { name: 'Leave Type' },
    { name: 'From Date' },
    { name: 'To Date' },
    { name: 'No. of Days' },
    { name: 'Reason' },
    { name: 'Status' },

];
const user_attendance = [
    { id: 1, leave_type: 'SL', fromdate: '04-07-2023', todate: '04-07-2023', day: '1', reason: 'test', status: 'true', },
    { id: 2, leave_type: 'CL', fromdate: '04-07-2023', todate: '04-07-2023', day: '1', reason: 'test', status: 'true', },
    { id: 3, leave_type: 'CL', fromdate: '04-07-2023', todate: '04-07-2023', day: '1', reason: 'test', status: 'true', },
    // More people...
]


export default function LeaveList() {
    const { loading, error, data } = useQuery(GET_Leave);
    const [removeUserLeaveMutation] = useMutation(REMOVE_USER_Leave);
    const [quickEdit, setQuickEdit] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const cancelButtonRef = useRef(null)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const user_attendance = data.leavesall;

   

    const handleRemove = async (id: any) => {
        try {
            await removeUserLeaveMutation({
                variables: { id },
                refetchQueries: [{ query: GET_Leave }],
            });
            alert("Successfully removed");
        } catch (error: any) {
            console.error('Error deleting user leave:', error.message);
            alert("Error removing user leave");
        }
    };
    const handleButtonClick = (type: string, id: number | null) => {
        setQuickEdit(true)
      

    };
    const filteredUserAttendance = user_attendance.filter((person: { leave_reason?: string }) =>
        person.leave_reason && person.leave_reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
console.log(filteredUserAttendance)
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            My Applied Leaves
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className="px-4 sm:px-6 lg:px-8 mt-4 mb-10">
                    <div className="lg:flex lg:items-center  xl:flex items-end gap-4">
                        <input
                            type="text"
                            placeholder="Search by Reason"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Search
                        </button>
                        {/* <div className="sm:flex-auto">
                        
                         
                        </div>
                        <div className="mt-4 lg:ml-16  sm:mt-0 sm:flex-none">
                          
                        </div> */}
                    </div>
                    <div className="mt-2 flow-root">
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

                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {filteredUserAttendance.map((person: any) => (
                                                // {user_attendance.map((person: any) => (
                                                <tr key={person.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {person.leave_type}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.leave_start_date}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.leave_end_date}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.leave_total_days}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.leave_reason}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">Approved</td>
                                                    {/* <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.status}</td> */}

                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                        <button
                                                        onClick={() => handleButtonClick('add', null)}
                                                            // onClick={() => handleRemove(person.id)}
                                                            className="bg-gray-100 text-gray-900 block px-4 py-2 text-sm"
                                                        >
                                                            {/* Remove */}
                                                            Show Leave Days
                                                        </button>
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
                                                    <div className="flex min-h-full items-end justify-center lg:p-4 -mt-52 lg:mt-0 text-center sm:items-center sm:p-0">
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
                                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Leave Days</h2>
                                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                                            <div className="sm:col-span-2">
                                                                                <div className="space-y-2 px-2 py-2">
                                                                                    <div className="pb-4">
                                                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-4 ">
                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                        {/* <ComputerDesktopIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                                                                                                    </div>
                                                                                                    <p className="font-bold">No. of leaves</p>
                                                                                                 
                                                                                                    <p className="font-bold">
                                                                                                    Reason For applying 
                                                                                                    
                                                                                                    
                                                                                                    </p>
                                                                                                <p className="font-bold">
                                                                                                    Leave Date</p>
                                                                                                    
                                                                                                    
                                                                                                    <p className="font-bold">
                                                                                                    leave Type
                                                                                                    
                                                                                                    
                                                                                                    </p>
                                                                                                  
                                                                                                {/* <p>{filteredUserAttendance.length > 0 ? filteredUserAttendance[0].leave_reason : 'No leave reason available'}</p> */}

                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                <p className="">
                                                                                                   {filteredUserAttendance.length > 0 ? filteredUserAttendance[0].leave_total_days : 'No leave reason available'}
                                                                                                    
                                                                                                    </p>
                                                                                                <p className="">
                                                                                                   {filteredUserAttendance.length > 0 ? filteredUserAttendance[0].leave_reason : 'No leave reason available'}
                                                                                                    
                                                                                                    </p>
                                                                                                    <p className="">
                                                                                                  {filteredUserAttendance.length > 0 ? filteredUserAttendance[0].leave_start_date : 'No leave reason available'}
                                                                                                    
                                                                                                    
                                                                                                    </p>
                                                                                                    <p className="">
                                                                                                    {filteredUserAttendance.length > 0 ? filteredUserAttendance[0].leave_type : 'No leave reason available'}
                                                                                                    
                                                                                                    
                                                                                                    </p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="lg:mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
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
                                                                        </div> */}
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
    )
}
