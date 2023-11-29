import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import Alert from '@/components/Alert';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ADD_Faq_MUTATION, DELETE_Faq_MUTATION, GET_Faqs, GET_Faq_BY_ID, REMOVE_MULTIPLE_Faqs, UPDATE_Faq_MUTATION } from '@/graphql/Faq/queries';
import { GET_Faqcategories } from '@/graphql/Faqcategory/queries';

const table_header = [
    { name: 'Category' },
    { name: 'Question' },
    { name: 'Answer' },
    { name: 'Featured' },
    { name: 'Action' },
];
const faqs = [
    { id: 1, cname: 'Attendance', question: 'When is Shortfall in attendance or Short Leave treated as Half Day (HD) ?', answer: 'Accumulated Short leaves / Shortfall in attendance shall be adjusted against Leave balance of casual and earned leave respectively as per following criteria and in case of leave balance is Nil then the deductions shall apply accordingly. One (1) short  leave is exempted in a month.', featured: 'Yes' },
    { id: 1, cname: 'Attendance', question: 'What is Active Employment?', answer: 'An active employment is a period in which an employment is not terminated either by the employee or the employer. Essentially an employee is not under any notice of termination (by the employee or employer).', featured: 'Yes' },
    { id: 1, cname: 'faqs', question: 'Who can you send faqs ?', answer: 'Anyone in the organization.', featured: 'Yes' },
    { id: 1, cname: 'Issues', question: 'LAN not working ? ', answer: 'If you are using Wired LAN, please check if the cable is properly connected to PC or Mac. Remove and connect again and give couple of minutes to automatically select the IP address. If the cable is loose or has broken connector, please raise incident to IT Admin.', featured: 'No' },
    { id: 1, cname: 'Leaves', question: 'What is Sick Leave (SL) ? How can I avail SL?', answer: 'All employees including probationers* will be entitled to 7 (Seven) days Sick Leaves during a Financial year. These leaves will be credited to an individuals account at the beginning of the financial year and can accrued proportionately on a periodic basis.', featured: 'Yes' },
    // More people...
]

export default function Faq() {
    const [search, setSearch] = useState("");
    const [selectedFaqs, setSelectedFaqs] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [quickEdit, setQuickEdit] = useState(false)
    const [formType, setformType] = useState('')

    const [showDeleteMessage, setshowDeleteMessage] = useState(false);
    const [showDeletedMessage, setshowDeletedMessage] = useState(false);
    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    const cancelButtonRef = useRef(null)

    const [faqId, setFaqId] = useState<number>()
    const [faqcatid, setFaqcatid] = useState('')
    const [faqques, setFaqques] = useState('')
    const [faqans, setFaqans] = useState('')
    const [faqfeatured, setFaqfeatured] = useState('')
    const [mStatus, setmStatus] = useState('')

    const [aError, setAError] = useState(false);
    const [bError, setBError] = useState(false);

    const { loading: getFaqcategoryLoading, error: getFaqcategoryError, data: getFaqcategory } = useQuery(GET_Faqcategories);
    console.log("Faqcategory", getFaqcategory);

    let faqcategorylist: any[] = [];

    if (getFaqcategory && getFaqcategory.faqcategories) {
        faqcategorylist = getFaqcategory.faqcategories.map((data: { id: any; category: any; cat_name: any; status: any; }) => ({
            id: data.id,
            category: data.category,
            cat_name: data.cat_name,
            status: data.status,

        }));
    }


    const [executeQuery, { loading, error, data: getQueryById }] = useLazyQuery(GET_Faq_BY_ID);
    // const [fExecuteQuery, { loading: fLoading, error: fError, data: fData }] = useLazyQuery(GET_FILTERED_DIVISIONS);
    const [createQuery, { loading: createQueryLoading, error: createQueryError }] = useMutation(ADD_Faq_MUTATION);
    const [updateQuery, { loading: updateQueryLoading, error: updateQueryError }] = useMutation(UPDATE_Faq_MUTATION);
    // const [deleteDivision, { loading: deleteDivisionLoading, error: deleteDivisionError }] = useMutation(DELETE_DIVISION_MUTATION);
    const [removeQuery] = useMutation(DELETE_Faq_MUTATION);
    const [removeMultipleQuery] = useMutation(REMOVE_MULTIPLE_Faqs);

    const { loading: getAllDataLoading, error: getAllDataError, data: getAllData, refetch } = useQuery(GET_Faqs);
    console.log("allData", getAllData);

    let itemlist: any[] = [];

    // if (getAllData && getAllData.faqs) {
    //     itemlist = getAllData.faqs.map((data: { id: any; cat_id: any; faq_ques: any; faq_ans: any; faq_featured: any; status: any; }) => ({
    //         id: data.id,
    //         cat_id: data.cat_id,
    //         faq_ques: data.faq_ques,
    //         faq_ans: data.faq_ans,
    //         faq_featured: data.faq_featured,
    //         status: data.status,
    //         faq_category: data.faqcategory.cat_name
    //         // faqcategory: faqcategory.cat_name

    //     }));
    // }

    if (getAllData && getAllData.faqs) {
        itemlist = getAllData.faqs.map((data) => ({
            id: data.id,
            cat_id: data.cat_id,
            faq_ques: data.faq_ques,
            faq_ans: data.faq_ans,
            faq_featured: data.faq_featured,
            status: data.status,
            faq_category: data.faqcategory.cat_name // Access the cat_name property from the faqcategory object
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

    const handleButtonClick = (type: string, id: number) => {
        setQuickEdit(true)
        setformType(type)
        console.log("id", id);
        // Add your logic here
        console.log("type", type);
        if (type && type === 'update') {
            setFaqId(id)
            console.log("faqId", faqId);
        } else {

            setFaqcatid('');
            setFaqques('');
            setFaqans('');
            setFaqfeatured('');
            setmStatus('');
            setFaqId(null);
        }

    };

    useEffect(() => {
        if (faqId) {
            console.log(faqId);
            executeQuery({ variables: { id: faqId } });
            console.log(getQueryById);
        }
    }, [faqId]);

    console.log(getQueryById);
    useEffect(() => {
        if (getQueryById && getQueryById.faq) {
            const { faq } = getQueryById; // Destructure the division object
            setFaqcatid(faq.cat_id);
            setFaqques(faq.faq_ques);
            setFaqans(faq.faq_ans);
            setFaqfeatured(faq.faq_featured);
            setmStatus(faq.status);


        }
    }, [getQueryById]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        console.log('called');
        (!faqcatid) ? setAError(true) : setAError(false);
        (!mStatus) ? setBError(true) : setBError(false);

        if (aError == true || bError == true) {
            return;
        }
        console.log('Submit');
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        if (faqId != null && faqId != undefined) { //Update division
            try {
                console.log('Try to submit')
                console.log('faqId', faqId)
                console.log('faqcatid', faqcatid)
                console.log('faqques', faqques)
                console.log('faqans', faqans)
                console.log('faqfeatured', faqfeatured)
                console.log('mStatus', mStatus)
                const { data } = await updateQuery({
                    variables: {
                        updateFaqInput: {
                            id: faqId,
                            cat_id: faqcatid,
                            faq_ques: faqques,
                            faq_ans: faqans,
                            faq_featured: faqfeatured,
                            status: mStatus,
                        },
                    },
                });


                setFaqcatid('');
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
                console.log('faqcatid', faqcatid)
                console.log('faqques', faqques)
                console.log('faqans', faqans)
                console.log('faqfeatured', faqfeatured)
                console.log('mStatus', mStatus)
                const { data: { createFaq: { id } } } = await createQuery({
                    variables: {
                        createFaqInput: {
                            cat_id: faqcatid,
                            faq_ques: faqques,
                            faq_ans: faqans,
                            faq_featured: faqfeatured,
                            status: mStatus,
                        },
                    },
                });
                console.log('response', id);

                setFaqcatid('');
                setFaqques('');
                setFaqans('');
                setFaqfeatured('');
                // setmStatus('');

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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, faqId: string) => {
        if (faqId === 'all') {
            if (event.target.checked) {
                const allfaqIds = itemlist.map(item => item.id);
                setSelectedFaqs(allfaqIds);
            } else {
                setSelectedFaqs([]);
            }
        } else {
            if (event.target.checked) {
                setSelectedFaqs(prevSelected => [...prevSelected, faqId]);
            } else {
                setSelectedFaqs(prevSelected =>
                    prevSelected.filter(id => id !== faqId)
                );
            }
        }
    };
    const handleDeletes = async () => {
        console.log('Selectedfaqs', selectedFaqs);
        // selectedfaqIds
        try {
            const response = await removeMultipleQuery({
                variables: { ids: selectedFaqs },
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

    const filteredData = search === "" ? itemlist : itemlist.filter((item: { faq_category: string, faq_ques: string }) => {
        const lowerSearch = search.toLowerCase();
        return (item.faq_category.toLowerCase().includes(lowerSearch) || item.faq_ques.toLowerCase().includes(lowerSearch));
    });
    return (
        <div className=' w-full rounded px-2'>
            {showDeleteMessage && (
                <Alert message="Are you sure you want to delete these FAQ(s)?" />
            )}
            {showSuccessMessage && (
                // <Alert message="Division Added Successfully!" alertState={alertState} onAlertStateChange={handleAlertStateChange} />
                <Alert message="FAQ Added Successfully!" />
            )}
            {showErrorMessage && (
                <Alert message="Something went wrong!" />
            )}
            {showDeletedMessage && (
                <Alert message="FAQ Deleted Successfully!" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Manage Faq
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
                            <div className="mt-4 lg:ml-16 ml-0 sm:mt-0 sm:flex-none">
                                <a onClick={() => handleButtonClick('add', '')}
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add New Faq
                                </a>
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
                                                                checked={selectedFaqs.includes(item.id)}

                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.faq_category}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.faq_ques.substring(0, 50)}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.faq_ans.substring(0, 50)}</td>
                                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item.faq_featured}</td>
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
                                                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Add Faq</h2>
                                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                                            <div className="sm:col-span-2">
                                                                                <div className="space-y-2 px-2 py-2">
                                                                                    <div className="pb-4">
                                                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-4">
                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <select
                                                                                                        id="location"
                                                                                                        name="location"
                                                                                                        onChange={(e) => setFaqcatid(parseInt(e.target.value))}
                                                                                                        value={faqcatid}

                                                                                                        className="px-2 mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        defaultValue="Canada"
                                                                                                    >
                                                                                                        <option>Choose Type</option>
                                                                                                        {faqcategorylist.map((catitem) => (

                                                                                                            <option value={catitem.id} key={catitem.id}>{catitem.cat_name}</option>
                                                                                                        ))}
                                                                                                        {/* <option>Issues</option>
                                                                                                        <option>Leaves</option>
                                                                                                        <option>Travel</option>
                                                                                                        <option>Payroll</option>
                                                                                                        <option>WFH</option>
                                                                                                        <option>Short Leave</option>
                                                                                                        <option>Attendance</option>
                                                                                                        <option>Ideas</option> */}
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <select
                                                                                                        id="location"
                                                                                                        name="location"
                                                                                                        onChange={(e) => setFaqfeatured(e.target.value)}
                                                                                                        value={faqfeatured}

                                                                                                        className="px-2 mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        defaultValue="Canada"
                                                                                                    >
                                                                                                        <option>Choose Feature</option>
                                                                                                        <option>Yes</option>
                                                                                                        <option>No</option>
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 ">

                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <textarea
                                                                                                        rows={4}
                                                                                                        name="comment"
                                                                                                        onChange={(e) => setFaqques(e.target.value)}
                                                                                                        value={faqques}

                                                                                                        id="comment"
                                                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        defaultValue={''}
                                                                                                        placeholder='FAQ Question'
                                                                                                    />
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="sm:col-span-1">
                                                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                                                    <textarea
                                                                                                        rows={4}
                                                                                                        name="comment"
                                                                                                        onChange={(e) => setFaqans(e.target.value)}
                                                                                                        value={faqans}

                                                                                                        id="comment"
                                                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                        defaultValue={''}
                                                                                                        placeholder='FAQ Answer'
                                                                                                    />
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
                                                                                                    {bError && <p className="text-red-500 text-xs" >*Status is required</p>}

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
