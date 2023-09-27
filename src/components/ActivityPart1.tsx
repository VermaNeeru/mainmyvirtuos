import React, { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import TextEditor from "@/components/TextEditor";

import { useQuery, useMutation } from "@apollo/client";
import { GET_Employees } from '@/graphql/User/queries';
import { GET_TEMPLATE } from '@/graphql/Template/queries';
import { ADD_ACTIVITY_MUTATION } from "@/graphql/Activity/queries";
import Alert from "./Alert";
import { ADD_AuditLog_MUTATION } from "@/graphql/AuditLogs/queries";
import { getIp } from "./IPAddress";
import { ADD_ActivityAudience_MUTATION } from "@/graphql/ActivityAudience/queries";
import ActivityAnnouncement from "./ActivityAnnouncement";
// import { getIp } from "@/pages/ipaddress";

function filterActivity(description: string) {
    const targets = ["fuck", "porn", "sex", "ass"]; // Keywords to match (case-insensitive)

    const loweredDescription = description.toLowerCase();

    const flag = targets.some(target => loweredDescription.includes(target)) ? 1 : 0;

    return flag;
}

export default function ActivityPart1() {
    const [ip, setIp] = useState('');

    useEffect(() => {
        async function fetchAndSetIp() {
            const fetchedIp = await getIp();
            setIp(fetchedIp);
        }

        fetchAndSetIp();
    }, []);


    const [openTab, setOpenTab] = useState<number>(1);

    const { loading, error, data } = useQuery(GET_Employees);

    console.log("users", data);

    let people = [];

    if (data && data.getalluser) {
        people = data.getalluser.map((employee: { id: any; firstname: any; lastname: any; }) => ({
            id: employee.id,
            name: `${employee.firstname} ${employee.lastname}`,
        }));
    }

    // console.log("people", people);
    console.log("people", people);
    // return
    // const people = [
    //     { id: 1, name: 'Shivam Chawla' },
    //     { id: 1, name: 'Neeru Verma' },
    //     { id: 1, name: 'Poorva Sharma' },
    //     { id: 1, name: 'Sarika Sharma' },
    //     { id: 1, name: 'Bhumika' },
    //     { id: 1, name: 'Gagan' },
    //     // More users...
    // ]

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    const [message, setMessage] = useState('')
    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState(null)

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person: { name: string; }) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    const handleEditorContentChange = (content: boolean | ((prevState: boolean) => boolean)) => {
        setMessage(content)
        // This function will be called when the editor's content changes
        // console.log('Editor content in parent:', content);
        // You can also store the content in the parent's state or perform other actions
    };


    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    const [messageError, setMessageError] = useState(false);
    const [toError, setToError] = useState(false);

    const [createActivity, { loading: activityLoading, error: activityError }] = useMutation(ADD_ACTIVITY_MUTATION);
    const [createAuditlog, { loading: auditlogLoading, error: auditlogError }] = useMutation(ADD_AuditLog_MUTATION);
    const [createActivitiesaudience, { loading: activitiesaudienceLoading, error: activitiesaudienceError }] = useMutation(ADD_ActivityAudience_MUTATION);

    const handleSubmitMessage = async (e: { preventDefault: () => void }) => {
        (!message || message.trim() === "") ? setMessageError(true) : setMessageError(false);
        (!selectedPerson) ? setToError(true) : setToError(false);
        if (!message || message.trim() === "") {
            setMessageError(true);
            return; // Exit early if there's an error
        }

        if (!selectedPerson) {
            setToError(true);
            return; // Exit early if there's an error
        }

        // console.log(message);
        // console.log(selectedPerson);
        // console.log(messageError);
        // console.log(toError);
        // console.log('Submit');
        e.preventDefault();
        // return
        try {
            // console.log('Try to submit')
            // console.log('message', message)
            // console.log('query', selectedPerson)
            // const userid = selectedPerson.id;
            // return
            // const replacedMessage = message.replace(/'/g, " ");
            // const fieldData = {
            //     description: replacedMessage,
            //     user_id: 1
            // }
            // console.log(message);
            // console.log(replacedMessage);
            // return

            // console.log('IPAddress', ip);
            // return

            const { data } = await createAuditlog({
                variables: {
                    createAuditlogInput: {
                        table_name: "Activity",
                        field_name: message,
                        action: "Create",
                        page_url: "Activity",
                        ip_address: ip,
                        browser: "",
                        os: "",
                        user_id: 1
                    },
                },
            });

            const { data: { createActivity: { id } } } = await createActivity({
                variables: {
                    createActivityInput: {
                        description: message,
                        type: "",
                        status: "",
                        activity_notes: "",
                        user_id: 1
                    },
                },
            });
            // console.log('Created Activity:', createdActivityData.createActivity);
            // const createdActivityId = createdActivityData.createActivity.id;

            // Now you can use the 'createdActivityId'
            console.log(id);
            const activityId = id;

            const { data: activityaudienceData } = await createActivitiesaudience({
                variables: {
                    createActivitiesaudienceInput: {
                        activity_id: activityId,
                        user_id: 1
                    },
                },
            });

            // const { loading, error, data: templateData } = useQuery(GET_TEMPLATE, {
            //     variables: { id: 1 }, // Pass the id parameter here
            // });

            // if (loading) return <p>Loading...</p>;
            // if (error) return <p>Error: {error.message}</p>;

            // const template = templateData.template;

            // console.log("template", template);

            // const { loading, error, data: templateData } = useQuery(GET_TEMPLATE, {
            //     variables: { id: 1 }, // Provide the template ID you want to fetch
            // });

            // setMessage('');
            // setQuery('');
            // console.log("template", data.template);

            setMessage('');
            setSelectedPerson(null);
            setshowSuccessMessage(true);
            setshowErrorMessage(false);

            console.log('showSuccessMessage', showSuccessMessage);
            console.log('response', data.createUser);
            // console.log('response', response.data);
        } catch (error) {
            setshowErrorMessage(true);

            console.log('catchError', error);
        }
    }
    return (
        <div className="flex ">
            <div className="lg:-pt-20">
                {showSuccessMessage && (
                    <Alert message="Message Added Successfully!" />
                )}
                {showErrorMessage && (
                    <Alert message="Something went wrong!" />
                )}
            </div>

            <div className="w-full ">
                {/* {ip} hello */}
                <ul
                    className="-mb-px flex space-x-8" aria-label="Tabs"
                    role="tablist"
                >
                    <li className=" mr-2 last:mr-0 p-1 flex-auto text-center ">
                        <a
                            className={
                                "flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium " +
                                (openTab === 1
                                    ? "border-indigo-500 text-indigo-600 "
                                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 ")
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(1);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                        >
                            <p className="font-normal text-base"> Message</p>
                        </a>
                    </li>
                    <li className="mr-2 p-1 last:mr-0 flex-auto text-center ">
                        <a
                            className={
                                "flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium " +
                                (openTab === 2
                                    ? "border-indigo-500 text-indigo-600 "
                                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(2);
                            }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                        >
                            <p className="font-normal text-base"> Announcement</p>
                        </a>
                    </li>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                    <div className=" py-3 px-4 flex-auto">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <form>
                                    <div className="space-y-12">
                                        <div className="pb-2">
                                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="col-span-full">
                                                    <div className="mt-2">
                                                        <TextEditor onEditorContentChange={handleEditorContentChange} />
                                                        {messageError && <p className="text-red-500 text-xs" >*Message is required</p>}

                                                    </div>
                                                    <div className="mt-4 lg:mt-2 ">
                                                        <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
                                                            <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">To</Combobox.Label>
                                                            <div className="relative mt-2">
                                                                <Combobox.Input
                                                                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    onChange={(event) => setQuery(event.target.value)}
                                                                    displayValue={(person: any) => person?.name}
                                                                />
                                                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </Combobox.Button>

                                                                {filteredPeople.length > 0 && (
                                                                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                        {filteredPeople.map((person: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
                                                                            <Combobox.Option
                                                                                key={person.id}
                                                                                value={person}
                                                                                className={({ active }) =>
                                                                                    classNames(
                                                                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                                                    )
                                                                                }
                                                                            >
                                                                                {({ active, selected }) => (
                                                                                    <>
                                                                                        <span className={classNames('block truncate', selected && 'font-semibold')}>{person.name}</span>

                                                                                        {selected && (
                                                                                            <span
                                                                                                className={classNames(
                                                                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                                                    active ? 'text-white' : 'text-indigo-600'
                                                                                                )}
                                                                                            >
                                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                            </span>
                                                                                        )}
                                                                                    </>
                                                                                )}
                                                                            </Combobox.Option>
                                                                        ))}
                                                                    </Combobox.Options>
                                                                )}
                                                            </div>
                                                        </Combobox>
                                                        {toError && <p className="text-red-500 text-xs" >*Employee is required</p>}

                                                    </div>

                                                </div>

                                            </div>
                                        </div>



                                    </div>

                                    <div className="flex items-center ">
                                        <button
                                            type="button"
                                            onClick={handleSubmitMessage}
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <ActivityAnnouncement />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

