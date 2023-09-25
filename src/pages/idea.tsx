import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import Alert from '@/components/Alert';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_Idea_MUTATION, GET_Ideas, REMOVE_MULTIPLE_Ideas } from '@/graphql/Idea/queries';

const table_header = [
    { name: 'Idea By' },
    { name: 'Category' },
    { name: 'Description' },
    { name: 'Date' },
    { name: 'Action' },
    { name: '' },
];
const ideas = [
    { id: 1, by: 'Neeru', cname: 'Christmas Celebration 2019', desc: 'Active', idate: '12-07-2023' },
    { id: 1, by: 'Gagan', cname: 'Diwali Celebration 2019', desc: 'Active', idate: '12-07-2023' },
    { id: 1, by: 'Shivam', cname: 'FRIBDAY', desc: 'Active', idate: '12-07-2023' },
    // More people...
]

export default function Idea() {
    const [search, setSearch] = useState("");
    const [quickEdit, setQuickEdit] = useState(false)
    const cancelButtonRef = useRef(null)
    const [showDeletedMessage, setshowDeletedMessage] = useState(false);
    const [SelectedIdeas, setSelectedIdeas] = useState([]);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    const [removeQuery] = useMutation(DELETE_Idea_MUTATION);
    const [removeMultipleQuery] = useMutation(REMOVE_MULTIPLE_Ideas);

    const { loading: getAllDataLoading, error: getAllDataError, data: getAllData, refetch } = useQuery(GET_Ideas);
    console.log("allData", getAllData);

    let itemlist: any[] = [];

    if (getAllData && getAllData.ideas) {
        itemlist = getAllData.ideas.map((data: { id: any; idea_for: any; idea_category: any; idea_description: any; submit_type: any; user: { firstname: any; lastname: any; }; }) => ({
            id: data.id,
            idea_for: data.idea_for,
            idea_category: data.idea_category,
            idea_description: data.idea_description,
            submit_type: data.submit_type,
            firstname: data.user.firstname,
            lastname: data.user.lastname,

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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, ideaId: string) => {
        if (ideaId === 'all') {
            if (event.target.checked) {
                const allideaIds = itemlist.map(item => item.id);
                setSelectedIdeas(allideaIds);
            } else {
                setSelectedIdeas([]);
            }
        } else {
            if (event.target.checked) {
                setSelectedIdeas(prevSelected => [...prevSelected, ideaId]);
            } else {
                setSelectedIdeas(prevSelected =>
                    prevSelected.filter(id => id !== ideaId)
                );
            }
        }
    };
    const handleDeletes = async () => {
        console.log('SelectedIdeas', SelectedIdeas);
        // selectedideaIds
        try {
            const response = await removeMultipleQuery({
                variables: { ids: SelectedIdeas },
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

    const filteredData = search === "" ? itemlist : itemlist.filter((item: { firstname: string, lastname: string }) => {
        const lowerSearch = search.toLowerCase();
        return (item.firstname.toLowerCase().includes(lowerSearch) || item.lastname.toLowerCase().includes(lowerSearch));
    });
    return (
        <div className=' w-full rounded px-2'>
            {showDeletedMessage && (
                <Alert message="Division Deleted Successfully!" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            My Ideas
                        </h2>
                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white'>
                <div className="lg:px-4 px-4 sm:px-2 mt-4 mb-10">
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

                        <div className="mt-4 lg:ml-16 ml-0 sm:mt-0 sm:flex-none">
                            <Link href="/add_idea" >
                                <span
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add New Idea
                                </span>
                            </Link>
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
                                                            checked={SelectedIdeas.includes(item.id)}

                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                        {item.firstname} {item.lastname}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.idea_category}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.idea_description}</td>
                                                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">25-09-2023</td>
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
                                                                            <Link href={`/edit_idea/${item.id}`} className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Edit</Link>
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                            <a onClick={() => handleDelete('one', item.id)} className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Delete</a>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
