import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Disclosure } from '@headlessui/react'
import { Bars4Icon, CheckIcon, ChevronUpDownIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import TemplateTypeSearch from '@/components/TemplateTypeSearch';
import TextEditor from '@/components/TextEditor';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ADD_Template_MUTATION, GET_Template_BY_ID, UPDATE_Template_MUTATION } from '@/graphql/EmailTemplate/queries';
import Alert from '@/components/Alert';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}
export default function Email() {

    const viewer = [
        { id: 1, name: 'Choose Viewer' },
        { id: 2, name: 'HR' },
        { id: 3, name: 'Network Admin' },
        { id: 4, name: 'Accounts' },
    ]
    const [selected, setSelected] = useState(viewer[0])

    const [showDeleteMessage, setshowDeleteMessage] = useState(false);
    const [showDeletedMessage, setshowDeletedMessage] = useState(false);
    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    const [templateId, setTemplateId] = useState<number>()
    const [templateName, setTemplateName] = useState('')
    const [templateType, setTemplateType] = useState('')
    const [templateSubject, setTemplateSubject] = useState('')
    const [templateConstant, setTemplateConstant] = useState('')
    const [templateDescription, setTemplateDescription] = useState('')
    const [templateStatus, setTemplateStatus] = useState('')

    const handleTemplateTypeChange = (type) => {

        console.log(type)
        setTemplateType(type);

        // onDateChange(newDate); // Call the callback passed from parent
    };

    const handleEditorContentChange = (content: boolean | ((prevState: boolean) => boolean)) => {
        setTemplateDescription(content)
    };

    const [aError, setAError] = useState(false);
    const [bError, setBError] = useState(false);

    const [executeQuery, { loading, error, data: getQueryById }] = useLazyQuery(GET_Template_BY_ID);
    // const [fExecuteQuery, { loading: fLoading, error: fError, data: fData }] = useLazyQuery(GET_FILTERED_DIVISIONS);
    const [createQuery, { loading: createQueryLoading, error: createQueryError }] = useMutation(ADD_Template_MUTATION);



    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        console.log('called');
        (!templateName) ? setAError(true) : setAError(false);
        (!templateType) ? setBError(true) : setBError(false);
        (!templateStatus) ? setBError(true) : setBError(false);
        (!templateSubject) ? setBError(true) : setBError(false);
        (!templateConstant) ? setBError(true) : setBError(false);
        (!templateDescription) ? setBError(true) : setBError(false);

        if (aError == true || bError == true) {
            return;
        }
        console.log('Submit');
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        //Add division
        try {
            console.log('Try to submit')
            console.log('templateName', templateName)
            console.log('templateType', templateType)
            console.log('templateStatus', templateStatus)
            console.log('templateSubject', templateSubject)
            console.log('templateConstant', templateConstant)
            console.log('templateDescription', templateDescription)
            const { data: { createTemplate: { id } } } = await createQuery({
                variables: {
                    createTemplateInput: {
                        template_name: templateName,
                        template_type: templateType,
                        template_status: templateStatus,
                        template_subject: templateSubject,
                        template_constant: templateConstant,
                        template_description: templateDescription,
                    },
                },
            });
            console.log('response', id);

            setTemplateName('');
            setTemplateType('');
            setTemplateStatus('');
            setTemplateSubject('');
            setTemplateConstant('');
            setTemplateDescription('');

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
                <Alert message="Template Added Successfully!" />
            )}
            {showErrorMessage && (
                <Alert message="Something went wrong!" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Add Email Template
                        </h2>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className=" px-2 py-2">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                            </div>
                            <div className="mt-4 lg:ml-16 ml-0 sm:mt-0 sm:flex-none">
                                <Link href='/email_list'>
                                    <button
                                        type="button"
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div className="space-y-2">
                            <div className="border-b border-gray-900/10 pb-4">
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 lg:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Bars4Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                onChange={(e) => setTemplateName(e.target.value)}
                                                value={templateName}

                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Template Name.."
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Bars4Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                onChange={(e) => setTemplateSubject(e.target.value)}
                                                value={templateSubject}

                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Template Subject.."
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-4 rounded-md shadow-sm">
                                            <TemplateTypeSearch handleTemplateTypeChange={handleTemplateTypeChange} heading="Template Type" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                Status
                                            </label>
                                            <select
                                                id="location"
                                                name="location"
                                                onChange={(e) => setTemplateStatus(e.target.value)}
                                                value={templateStatus}

                                                className="mt-2 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue="Canada"
                                            >
                                                <option>Choose Status</option>
                                                <option>Active</option>
                                                <option>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-1">
                                    <div className="sm:col-span-1">
                                        <TextEditor onEditorContentChange={handleEditorContentChange} />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <textarea
                                            rows={2}
                                            name="comment"
                                            id="comment"
                                            onChange={(e) => setTemplateConstant(e.target.value)}
                                            value={templateConstant}

                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                            placeholder="Constants Used:"
                                        />
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="mt-14 lg:mt-0 items-center">
                            <button
                                type="button"
                                onClick={handleSubmit}

                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>

                </div>


            </div>
        </div>
    )
}
