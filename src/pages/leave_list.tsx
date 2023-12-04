import { GET_Leave, REMOVE_USER_Leave } from '@/graphql/User/queries';
import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react'
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

    const [searchTerm, setSearchTerm] = useState('');
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
    const filteredUserAttendance = user_attendance.filter((person: { leave_reason?: string }) =>
        person.leave_reason && person.leave_reason.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{person.status}</td>

                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                        <button
                                                            onClick={() => handleRemove(person.id)}
                                                            className="bg-gray-100 text-gray-900 block px-4 py-2 text-sm"
                                                        >
                                                            Remove
                                                        </button>
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
