import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import Alert from '@/components/Alert';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ADD_Module_MUTATION, DELETE_Module_MUTATION, GET_Modules, GET_Module_BY_ID, REMOVE_MULTIPLE_Modules, UPDATE_Module_MUTATION } from '@/graphql/Module/queries';

const table_header = [
    { name: 'Module Name' },
    { name: 'Display Name' },
    { name: 'Module Controller' },
    { name: 'Sort Order' },
    { name: 'Action' },
];
const modules = [
    { id: 1, mname: 'Activity', dname: 'Activity Stream', mcontroller: 'activity/index', sort_order: '1' },
    { id: 1, mname: 'Activity', dname: 'Activity Detail', mcontroller: 'activity/post_detail', sort_order: '1' },
    { id: 1, mname: 'Approval Section', dname: 'Change WFH Status', mcontroller: 'wfh/update_subordinate_wfh', sort_order: '2' },
    { id: 1, mname: 'Attendance', dname: 'All Attendance', mcontroller: 'attendance/all_attendance', sort_order: '3' },
    { id: 1, mname: 'Leaves', dname: 'Update WFH Status from email', mcontroller: 'wfh/update_status', sort_order: '4' },
    // More people...
]

export default function Modules() {
    const [search, setSearch] = useState("");
    const [SelectedModules, setSelectedModules] = useState<number[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [quickEdit, setQuickEdit] = useState(false)
    const [formType, setformType] = useState('')

    const [showDeleteMessage, setshowDeleteMessage] = useState(false);
    const [showDeletedMessage, setshowDeletedMessage] = useState(false);
    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    const cancelButtonRef = useRef(null)

    const [moduleId, setmoduleId] = useState<number | null | undefined>()
    const [parentId, setparentId] = useState<number | null | undefined>()
    const [moduleName, setmoduleName] = useState('')
    const [moduleController, setmoduleController] = useState('')
    const [submoduleName, setsubmoduleName] = useState('')
    const [className, setclassName] = useState('')
    const [sortorder, setsortorder] = useState<any>()
    const [mStatus, setmStatus] = useState('')


    const [aError, setAError] = useState(false);
    const [bError, setBError] = useState(false);



    const [executeQuery, { loading, error, data: getQueryById }] = useLazyQuery(GET_Module_BY_ID);
    // const [fExecuteQuery, { loading: fLoading, error: fError, data: fData }] = useLazyQuery(GET_FILTERED_DIVISIONS);
    const [createQuery, { loading: createQueryLoading, error: createQueryError }] = useMutation(ADD_Module_MUTATION);
    const [updateQuery, { loading: updateQueryLoading, error: updateQueryError }] = useMutation(UPDATE_Module_MUTATION);
    // const [deleteDivision, { loading: deleteDivisionLoading, error: deleteDivisionError }] = useMutation(DELETE_DIVISION_MUTATION);
    const [removeQuery] = useMutation(DELETE_Module_MUTATION);
    const [removeMultipleQuery] = useMutation(REMOVE_MULTIPLE_Modules);


    const { loading: getAllDataLoading, error: getAllDataError, data: getAllData, refetch } = useQuery(GET_Modules);
    console.log("allData", getAllData);

    let itemlist: any[] = [];

    if (getAllData && getAllData.modules) {
        itemlist = getAllData.modules.map((data: { id: any; parent_id: any; module_name: any; module_controller: any; submodule_name: any; class_name: any; sort_order: any; status: any; }) => ({
            id: data.id,
            parent_id: data.parent_id,
            module_name: data.module_name,
            module_controller: data.module_controller,
            submodule_name: data.submodule_name,
            class_name: data.class_name,
            sort_order: data.sort_order,
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

    const handleButtonClick = (type: string, id: number | null) => {
        setQuickEdit(true)
        setformType(type)
        console.log("id", id);
        // Add your logic here
        console.log("type", type);
        if (type && type === 'update') {
            setmoduleId(id)
            console.log("moduleId", moduleId);
        } else {

            setparentId(null);
            setmoduleName('');
            setsubmoduleName('');
            setmoduleController('');
            setsortorder(null);
            setmStatus('');
            setmoduleId(null);
        }

    };

    useEffect(() => {
        if (moduleId) {
            console.log(moduleId);
            executeQuery({ variables: { id: moduleId } });
            console.log(getQueryById);
        }
    }, [moduleId,getQueryById,executeQuery]);

    console.log(getQueryById);
    useEffect(() => {
        if (getQueryById && getQueryById.module) {
            const { module } = getQueryById; // Destructure the division object
            setparentId(module.parent_id);
            setmoduleName(module.module_name);
            setsubmoduleName(module.submodule_name);
            setclassName(module.class_name);
            setmoduleController(module.module_controller);
            setsortorder(module.sort_order);
            setmStatus(module.status);


        }
    }, [getQueryById]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        console.log('called');
        // (!moduleName) ? setAError(true) : setAError(false);
        // (!mStatus) ? setBError(true) : setBError(false);

        // if (aError == true || bError == true) {
        //     return;
        // }
        console.log('Submit');
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        if (moduleId != null && moduleId != undefined) { //Update division
            try {
                console.log('Try to submit')
                console.log('moduleId', moduleId)
                console.log('parentId', parentId)
                console.log('moduleName', moduleName)
                console.log('moduleController', moduleController)
                console.log('submoduleName', submoduleName)
                console.log('className', className)
                console.log('sortorder', sortorder)
                console.log('mStatus', mStatus)
                const { data } = await updateQuery({
                    variables: {
                        updateModuleInput: {
                            id: moduleId,
                            parent_id: parentId,
                            module_name: moduleName,
                            module_controller: moduleController,
                            submodule_name: submoduleName,
                            class_name: className,
                            sort_order: sortorder,
                            status: mStatus,
                        },
                    },
                });


                setparentId(null);
                setmoduleName('');
                setsubmoduleName('');
                setmoduleController('');
                setsortorder(null);
                setmStatus('');

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
                console.log('parentId', parentId)
                console.log('moduleName', moduleName)
                console.log('moduleController', moduleController)
                console.log('submoduleName', submoduleName)
                console.log('className', className)
                console.log('sortorder', sortorder)
                console.log('mStatus', mStatus)

                if (parentId == undefined || parent == null) {
                    setparentId(null);
                }
                console.log('parentId', parentId)
                const { data: { createModule: { id } } } = await createQuery({
                    variables: {
                        createModuleInput: {
                            parent_id: parentId,
                            module_name: moduleName,
                            module_controller: moduleController,
                            submodule_name: submoduleName,
                            class_name: className,
                            sort_order: sortorder,
                            status: mStatus,
                        },
                    },
                });
                console.log('response', id);

                setparentId(null);
                setmoduleName('');
                setsubmoduleName('');
                setmoduleController('');
                setsortorder(null);
                setmStatus('');


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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, moduleId: string) => {
        if (moduleId === 'all') {
            if (event.target.checked) {
                const allmoduleIds = itemlist?.map(item => item.id) || [];
                setSelectedModules(allmoduleIds);
            } else {
                setSelectedModules([]);
            }
        } else {
            if (event.target.checked) {
                setSelectedModules(prevSelected => [...prevSelected, parseInt(moduleId, 10)]);
            } else {
                setSelectedModules(prevSelected => prevSelected.filter(id => id !== parseInt(moduleId, 10)));
            }
        }
    };

    const handleDeletes = async () => {
        console.log('SelectedModules', SelectedModules);
        // selectedmoduleIds
        try {
            const response = await removeMultipleQuery({
                variables: { ids: SelectedModules },
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

    const filteredData = search === "" ? itemlist : itemlist.filter((item: { module_name: string }) => {
        const lowerSearch = search.toLowerCase();
        return (item.module_name.toLowerCase().includes(lowerSearch));
    });
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
                            Manage Modules
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
                            <div className="mt-4 lg:ml-16 ml-0 gap-1  sm:mt-0 sm:flex-none flex lg:space-x-2">
                                <a onClick={() => handleButtonClick('add', null)}
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center lg:text-sm text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add New Module
                                </a>
                                <button
                                    type="button"
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center lg:text-sm text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Bulk Upload
                                </button>
                                <button
                                    type="button"
                                    className="block rounded-md bg-red-600 px-3 py-2 text-center lg:text-sm text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Export
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
                                                                checked={SelectedModules.includes(item.id)}

                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.module_name}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.submodule_name}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.module_controller}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.sort_order}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
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
                                                    <div className="flex min-h-full items-end justify-center lg:p-4 -mt-20 lg:mt-0 text-center sm:items-center sm:p-0">
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
                                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Add Module</h2>
                                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                                            <div className="sm:col-span-2">
                                                                                <div className="space-y-2 px-2 py-2">
                                                                                    <div className="pb-4">
                                                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2">
                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                        <ComputerDesktopIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                    </div>

                                                                                                    <select
                                                                                                        id="location"
                                                                                                        name="location"
                                                                                                        onChange={(e) => setparentId(parseInt(e.target.value))}
                                                                                                        className="px-2 mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        defaultValue="Canada"
                                                                                                    >
                                                                                                        <option>Choose Type</option>
                                                                                                        {itemlist.map((mitem) => (

                                                                                                            <option key={mitem.id} value={mitem.id}>{mitem.module_name}</option>
                                                                                                        ))}
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
                                                                                                        id="email"
                                                                                                        onChange={(e) => setmoduleName(e.target.value)}
                                                                                                        value={moduleName}

                                                                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        placeholder="Module Name"
                                                                                                    />


                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                        <ComputerDesktopIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                    </div>
                                                                                                    <input
                                                                                                        type="email"
                                                                                                        name="email"
                                                                                                        id="email"
                                                                                                        onChange={(e) => setmoduleController(e.target.value)}
                                                                                                        value={moduleController}

                                                                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        placeholder="Sub Module Name" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                        <ComputerDesktopIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                    </div>
                                                                                                    <input
                                                                                                        type="email"
                                                                                                        name="email"
                                                                                                        id="email"
                                                                                                        onChange={(e) => setsubmoduleName(e.target.value)}
                                                                                                        value={submoduleName}

                                                                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        placeholder="Class Name" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                        <ComputerDesktopIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                    </div>
                                                                                                    <input
                                                                                                        type="email"
                                                                                                        name="email"
                                                                                                        id="email"
                                                                                                        onChange={(e) => setclassName(e.target.value)}
                                                                                                        value={className}

                                                                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        placeholder="Module Controller" />
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                        <ComputerDesktopIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                    </div>
                                                                                                    <input
                                                                                                        type="number"
                                                                                                        name="email"
                                                                                                        id="email"
                                                                                                        onChange={(e) => setsortorder(parseInt(e.target.value))}
                                                                                                        value={sortorder}

                                                                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        placeholder="Sort Order" />
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <select
                                                                                                        id="location"
                                                                                                        name="location"
                                                                                                        onChange={(e) => setmStatus(e.target.value)}
                                                                                                        value={mStatus}

                                                                                                        className="px-2 mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        defaultValue="Canada"
                                                                                                    >
                                                                                                        <option>Choose Type</option>
                                                                                                        <option>Active</option>
                                                                                                        <option>Inactive</option>
                                                                                                    </select>
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
