import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MagnifyingGlassIcon, MinusSmallIcon, PlusSmallIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import EmployeeSearch from '@/components/EmployeeSearch';
import CategorySearch from '@/components/CategorySearch';
import Alert from '@/components/Alert';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ADD_Notification_MUTATION } from '@/graphql/Notification/queries';
import { ADD_Idea_MUTATION, GET_Idea_BY_ID, DELETE_Idea_MUTATION, GET_Ideas, REMOVE_MULTIPLE_Ideas } from '@/graphql/Idea/queries';
import { GET_Faqs } from '@/graphql/Faq/queries';
import { getUserData } from '@/components/UserData';

const faqs = [
    {
        question: "Who can you send Ideas ?",
        answer:
            "Anyone in the organization.",
    },
    // More questions...
]


export default function AddIdea() {
    const [selected, setSelected] = useState()
    const [searchFaq, setSearchFaq] = useState("idea");
    const [showDeleteMessage, setshowDeleteMessage] = useState(false);
    const [showDeletedMessage, setshowDeletedMessage] = useState(false);
    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    const [ideaId, setIdeaId] = useState<number | null | undefined>()
    const [ideaForAll, setIdeaForAll] = useState('')
    const [ideaFor, setIdeaFor] = useState('')
    const [ideaCategory, setIdeaCategory] = useState('')
    const [ideaDescription, setIdeaDescription] = useState<any>()
    const [ideaSubmitType, setIdeaSubmitType] = useState('')
    const userData = getUserData();
    // const [userId, setUserId] = useState<number | null | undefined>(1)
    const [userId, setUserId] = useState<number | undefined>(userData?.id)
    const [userName, setUserNd] = useState('Neeru')

    const { loading: getFAQAllDataLoading, error: getFAQAllDataError, data: getFAQAllData } = useQuery(GET_Faqs);
    console.log("allData", getFAQAllData);

    let faqlist: any[] = [];
    if (getFAQAllData && getFAQAllData.faqs) {
        faqlist = getFAQAllData.faqs.map((data: { id: any; cat_id: any; faq_ques: any; faq_ans: any; faq_featured: any; status: any; faqcategory: { cat_name: any; }; }) => ({
            id: data.id,
            cat_id: data.cat_id,
            faq_ques: data.faq_ques,
            faq_ans: data.faq_ans,
            faq_featured: data.faq_featured,
            status: data.status,
            faq_category: data.faqcategory.cat_name // Access the cat_name property from the faqcategory object
        }));
    }

    const faqFilteredData = searchFaq === "" ? faqlist : faqlist.filter((item: { faq_category: string, faq_ques: string }) => {
        const lowerSearch = searchFaq.toLowerCase();
        return (item.faq_category.toLowerCase().includes(lowerSearch) || item.faq_ques.toLowerCase().includes(lowerSearch));
    });

    console.log(faqFilteredData)

    // const handleideaCategoryChange = (type: React.SetStateAction<string>) => {

    //     console.log(type)
    //     setIdeaCategory(type);

    //     // onDateChange(newDate); // Call the callback passed from parent
    // };

    const handleEditorContentChange = (content: any | ((prevState: any) => any)) => {
        setIdeaDescription(content)
    };

    const [aError, setAError] = useState(false);
    const [bError, setBError] = useState(false);

    const [executeQuery, { loading, error, data: getQueryById }] = useLazyQuery(GET_Idea_BY_ID);
    // const [fExecuteQuery, { loading: fLoading, error: fError, data: fData }] = useLazyQuery(GET_FILTERED_DIVISIONS);
    const [createQuery, { loading: createQueryLoading, error: createQueryError }] = useMutation(ADD_Idea_MUTATION);
    const [createNotificationQuery, { loading: createNQueryLoading, error: createNQueryError }] = useMutation(ADD_Notification_MUTATION);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    const handleEmpValueChange = (newValue: { id: React.SetStateAction<string>; }) => {
        console.log(newValue);
        if (newValue) {
            setIdeaFor(newValue.id);
        }

    };

    const handleCatValueChange = (newValue1: { id: React.SetStateAction<string>; }) => {
        console.log(newValue1);
        if (newValue1) {
            setIdeaCategory(newValue1?.id);
        }

    };

    const handleCheckboxChange = () => {
        if (ideaForAll == '') {
            setIdeaForAll('all');
        } else {
            setIdeaForAll('');
        }
        console.log(ideaForAll);
        // setIdeaFor(newValue.id);
    };

    // const handleSubmit = async (e: { preventDefault: () => void }) => {
    const handleSubmit = async (action: string) => {
        console.log(action);
        const type = action;
        console.log('called');
        (!ideaDescription) ? setAError(true) : setAError(false);
        (!ideaCategory) ? setBError(true) : setBError(false);

        if (aError == true || bError == true) {
            return;
        }

        console.log('Submit');
        // e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        try {
            console.log('Try to submit')
            console.log('ideaFor', ideaFor)
            console.log('ideaCategory', ideaCategory)
            console.log('ideaDescription', ideaDescription)
            console.log('ideaForAll', ideaForAll)
            let idea_for = '';
            if (ideaForAll === 'all') {
                idea_for = ideaForAll;
            } else {
                idea_for = ideaFor;
            }
            console.log(idea_for);
            const { data: { createIdea: { id: ideaId } } } = await createQuery({
                variables: {
                    createIdeaInput: {
                        idea_for: String(idea_for),
                        idea_category: ideaCategory,
                        idea_description: ideaDescription,
                        submit_type: type,
                        user_id: userId
                    },
                },
            });

            console.log('response', ideaId);
            const notificationMessage = "New Idea by " + userName;
            const { data: { createNotification: { id: notificationId } } } = await createNotificationQuery({
                variables: {
                    createNotificationInput: {
                        notification_type: "Idea",
                        notification_message: notificationMessage,
                        notification_audience: String(idea_for),
                        notification_seen_audience: "",
                        notification_type_id: ideaId, // Use the renamed variable here
                        sender_id: userId
                    },
                },
            });

            console.log('notification response', notificationId);


            setIdeaCategory('');
            setIdeaDescription('');
            setIdeaFor('');
            setIdeaForAll('');

            setshowSuccessMessage(true);
            setshowErrorMessage(false);

            console.log('showSuccessMessage', showSuccessMessage);
            // console.log('response', data);
            // console.log('response', response.data);

        } catch (error) {
            setshowErrorMessage(true);

            console.log('catchError', error);
        }


        // console.log(category);


    };

    return (
        <div className=' w-full rounded px-2'>
            {showSuccessMessage && (
                // <Alert message="Division Added Successfully!" alertState={alertState} onAlertStateChange={handleAlertStateChange} />
                <Alert message="Idea Added Successfully!" alertState={false} onAlertStateChange={function (newState: boolean): void {
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
                            Add Idea
                        </h2>
                    </div>
                </div>
            </div>
            <div className="lg:flex grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className=" px-6 py-2 lg:w-2/3 -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className=' rounded-lg border border-gray-300 bg-white'>
                        <div className=" mb-4 px-4 py-4">
                            <div className="space-y-2">
                                <div className="pb-4">
                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-4 lg:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <div className="mt-1">
                                                <EmployeeSearch onEmpValueChange={handleEmpValueChange} heading="For :" />
                                            </div>
                                            <div className="relative flex items-start mt-2">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id="comments"
                                                        aria-describedby="comments-description"
                                                        name="comments"
                                                        type="checkbox"
                                                        // onChange={event => handleCheckboxChange(event, 'all')}
                                                        onChange={handleCheckboxChange}
                                                        value={ideaFor}
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm leading-6">
                                                    <label htmlFor="comments" className="font-medium text-gray-600">
                                                        All Employees
                                                    </label>{' '}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <CategorySearch onCatValueChange={handleCatValueChange} />
                                        </div>

                                        <div className="sm:col-span-6">
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <ChatBubbleLeftRightIcon className="mb-4 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <textarea
                                                    rows={2}
                                                    name="comment"
                                                    id="comment"
                                                    onChange={(e) => setIdeaDescription(e.target.value)}
                                                    value={ideaDescription}

                                                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue={''}
                                                    placeholder="Idea Description"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" items-center">
                                <button
                                    type="button"
                                    onClick={() => handleSubmit('Save')}
                                    // onClick={handleSubmit('Save')}

                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save & Submit Later
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSubmit('Submit')}

                                    className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="lg:ml-0.5 px-6 py-2 lg:w-2/3 -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className=' rounded-lg border border-gray-300 bg-white'>
                        <div className=" mb-4 px-4 py-4">
                            <h4 className='flex'>FAQ for Ideas</h4>
                            <div className=" mb-4 px-2 py-2">
                                <dl className="mt-2 space-y-6 divide-y divide-gray-900/10">
                                    {/* id: data.id,
            cat_id: data.cat_id,
            faq_ques: data.faq_ques,
            faq_ans: data.faq_ans,
            faq_featured: data.faq_featured,
            status: data.status,
            faq_category: data.faqcategory.cat_name //  */}

                                    {/* {faqs.map((faq) => ( */}
                                    {faqFilteredData.map((faq) => (
                                        <Disclosure as="div" key={faq.id} >
                                            {({ open }) => (
                                                <>
                                                    <dt>
                                                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                            <span className="lg:text-base font-semibold leading-7 text-sm text-gray-800">{faq.faq_ques}</span>
                                                            <span className="ml-6 flex h-7 items-center">
                                                                {open ? (
                                                                    <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </dt>
                                                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                        <p className="lg:text-sm leading-7 text-xs text-gray-600">{faq.faq_ans}</p>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </dl>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
