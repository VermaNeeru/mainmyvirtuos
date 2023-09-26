import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon, DocumentArrowDownIcon } from '@heroicons/react/20/solid'
import Alert from '@/components/Alert';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_Template_MUTATION, GET_Templates, REMOVE_MULTIPLE_Templates } from '@/graphql/EmailTemplate/queries';

const table_header = [
    { name: 'Template Name' },
    { name: 'Template Subject' },
    { name: 'Template Type' },
    { name: 'Status' },
    { name: 'Action' },
    { name: '' },
];
const modules = [
    { id: 1, tname: 'Abusive Activity', tsubject: 'Permission to Publish Activity', ttype: 'Activity(Abusive)', status: 'Active' },
    { id: 2, tname: 'Activity', tsubject: 'Comment on Activity', ttype: 'Activity', status: 'Active' },
    { id: 3, tname: 'Activity Rejected', tsubject: 'Activity Rejected', ttype: 'Activity(Rejection)', status: 'Inactive' },
    { id: 4, tname: 'Birthday', tsubject: 'Wishing you a very happy birthday', ttype: 'User birthday', status: 'Active' },
    { id: 5, tname: 'Discussion', tsubject: 'Invitation to join the Discussion', ttype: 'Discussion', status: 'Active' },
    // More people...
]

export default function EmailList() {
    const [search, setSearch] = useState("");
    const [quickEdit, setQuickEdit] = useState(false)
    const cancelButtonRef = useRef(null)
    const [showDeletedMessage, setshowDeletedMessage] = useState(false);
    const [SelectedTemplates, setSelectedTemplates] = useState([]);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    const [removeQuery] = useMutation(DELETE_Template_MUTATION);
    const [removeMultipleQuery] = useMutation(REMOVE_MULTIPLE_Templates);

    const { loading: getAllDataLoading, error: getAllDataError, data: getAllData, refetch } = useQuery(GET_Templates);
    console.log("allData", getAllData);

    let itemlist: any[] = [];

    if (getAllData && getAllData.templates) {
        itemlist = getAllData.templates.map((data: { id: any; template_name: any; status: any; }) => ({
            id: data.id,
            template_name: data.template_name,
            template_type: data.template_type,
            template_status: data.template_status,
            template_subject: data.template_subject,
            template_constant: data.template_constant,
            template_description: data.template_description,

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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, templateId: string) => {
        if (templateId === 'all') {
            if (event.target.checked) {
                const alltemplateIds = itemlist.map(item => item.id);
                setSelectedTemplates(alltemplateIds);
            } else {
                setSelectedTemplates([]);
            }
        } else {
            if (event.target.checked) {
                setSelectedTemplates(prevSelected => [...prevSelected, templateId]);
            } else {
                setSelectedTemplates(prevSelected =>
                    prevSelected.filter(id => id !== templateId)
                );
            }
        }
    };
    const handleDeletes = async () => {
        console.log('SelectedTemplates', SelectedTemplates);
        // selectedTemplateIds
        try {
            const response = await removeMultipleQuery({
                variables: { ids: SelectedTemplates },
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

    const filteredData = search === "" ? itemlist : itemlist.filter((item: { template_name: string }) => {
        const lowerSearch = search.toLowerCase();
        return (item.template_name.toLowerCase().includes(lowerSearch));
    });
    return (
        <div className=' w-full rounded px-2'>
            {showDeletedMessage && (
                <Alert message="Template Deleted Successfully!" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Manage Email Templates
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
                            <div className="mt-4 lg:ml-16 ml-0 sm:mt-0 sm:flex-none lg:flex lg:space-x-2">
                                <Link href="/email" >
                                    <span
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add New Email Template
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
                                                                checked={SelectedTemplates.includes(item.id)}

                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.template_name}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.template_subject}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.template_type}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.template_status}</td>
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

                                                                                <Link href={`/edit_email/${item.id}`} className="bg-gray-100 text-gray-600 block px-4 py-2 text-sm">Edit</Link>

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
