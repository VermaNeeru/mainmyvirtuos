import DatePickerComp from '@/components/DatePickerComp/DatePickerComp'
import React, { useState } from 'react'
import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_Auditlogs } from '@/graphql/Auditlog/queries';


const table_header = [
    { name: 'By' },
    { name: 'Table Name' },
    { name: 'URL' },
    { name: 'Action' },
    { name: 'Date' },
    { name: 'IP' },
];
// const audit = [
//     { id: 1, emp_name: 'Shivam', table_name: 'user_family', url: 'https://myvirtuos.com/activity', action: 'add', adate: '17-07-2023', ip: '35.200.76.177' },
//     { id: 2, emp_name: 'Gagan', table_name: 'user_family', url: 'https://myvirtuos.com/activity', action: 'add', adate: '17-07-2023', ip: '35.200.76.177' },
//     { id: 3, emp_name: 'Neeru', table_name: 'user_family', url: 'https://myvirtuos.com/activity', action: 'add', adate: '17-07-2023', ip: '35.200.76.177' },
//     { id: 1, emp_name: 'Shivam', table_name: 'user_family', url: 'https://myvirtuos.com/activity', action: 'add', adate: '17-07-2023', ip: '35.200.76.177' },
//     { id: 2, emp_name: 'Gagan', table_name: 'user_family', url: 'https://myvirtuos.com/activity', action: 'add', adate: '17-07-2023', ip: '35.200.76.177' },
//     { id: 3, emp_name: 'Neeru', table_name: 'user_family', url: 'https://myvirtuos.com/activity', action: 'add', adate: '17-07-2023', ip: '35.200.76.177' },
//     // More people...
// ]
export default function SearchOte() {
    const [search, setSearch] = useState("");
    const [SelectedAuditlogs, setSelectedAuditlogs] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const { loading: getAllDataLoading, error: getAllDataError, data: getAllData, refetch } = useQuery(GET_Auditlogs);
    console.log("allData", getAllData);

    let itemlist: any[] = [];

    if (getAllData && getAllData.auditlogs) {
        itemlist = getAllData.auditlogs.map((data: { id: any; user: { firstname: any; lastname: any; }; table_name: any; page_url: any; action: any; ip_address: any; }) => ({
            id: data.id,
            firstname: data.user.firstname,
            lastname: data.user.lastname,
            table_name: data.table_name,
            page_url: data.page_url,
            action: data.action,
            ip_address: data.ip_address,

        }));
    }

    const filteredData = search === "" ? itemlist : itemlist.filter((item: { firstname: string; table_name: string }) => {
        const lowerSearch = search.toLowerCase();
        return (item.firstname.toLowerCase().includes(lowerSearch) || item.table_name.toLowerCase().includes(lowerSearch));
    });

    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Audit Log
                        </h2>
                    </div>
                </div>
            </div>
            <div className="sm:flex sm:items-center mb-4">
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
            </div>
            <div className="mt-8 flow-root">
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
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {filteredData.map((item) => (
                                        <tr key={item.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {item.firstname} {item.lastname}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.table_name}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.page_url}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.action}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">23-09-2023</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.ip_address}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </div>


    )
}
