import React, { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'

import { useQuery, useMutation } from "@apollo/client";
import { GET_Employees } from '@/graphql/User/queries';

import { GET_TEMPLATE } from '@/graphql/Template/queries';
import { ADD_ACTIVITY_MUTATION } from "@/graphql/Activity/queries";
import Alert from "./Alert";
import { ADD_AuditLog_MUTATION } from "@/graphql/AuditLogs/queries";
import { getIp } from "./IPAddress";
import { ADD_ActivityAudience_MUTATION } from "@/graphql/ActivityAudience/queries";
import EmployeeSearch from "./EmployeeSearch";

function filterActivity(description: string) {
    const targets = ["fuck", "porn", "sex", "ass"]; // Keywords to match (case-insensitive)

    const loweredDescription = description.toLowerCase();

    const flag = targets.some(target => loweredDescription.includes(target)) ? 1 : 0;

    return flag;
}
interface ActivityAnnouncementProps {
    userId: any; // Add the heading property
}

const ActivityAnnouncement: React.FC<ActivityAnnouncementProps> = ({ userId }) => {
    // export default function ActivityAnnouncement({ userId }) {
    const [empFor, setEmpFor] = useState<any>('');
    const [ip, setIp] = useState('');

    useEffect(() => {
        async function fetchAndSetIp() {
            const fetchedIp = await getIp();
            setIp(fetchedIp);
        }

        fetchAndSetIp();
    }, []);


    const [openTab, setOpenTab] = useState<number | null | undefined>(1);

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

    // const handleEditorContentChange = (content: boolean | ((prevState: boolean) => boolean)) => {
    //     setMessage(content)
    //     // This function will be called when the editor's content changes
    //     // console.log('Editor content in parent:', content);
    //     // You can also store the content in the parent's state or perform other actions
    // };


    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    const [messageError, setMessageError] = useState(false);
    const [toError, setToError] = useState(false);

    const [createActivity, { loading: activityLoading, error: activityError }] = useMutation(ADD_ACTIVITY_MUTATION);
    const [createAuditlog, { loading: auditlogLoading, error: auditlogError }] = useMutation(ADD_AuditLog_MUTATION);
    const [createActivitiesaudience, { loading: activitiesaudienceLoading, error: activitiesaudienceError }] = useMutation(ADD_ActivityAudience_MUTATION);

    const handleSubmitAnnouncement = async (e: { preventDefault: () => void }) => {
        (!message || message.trim() === "") ? setMessageError(true) : setMessageError(false);
        (!empFor) ? setToError(true) : setToError(false);
        if (!message || message.trim() === "") {
            setMessageError(true);
            return; // Exit early if there's an error
        }

        if (!empFor) {
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


            const { data: { createAuditlog: { id: auditId } } } = await createAuditlog({
                variables: {
                    createAuditlogInput: {
                        table_name: "Activity",
                        field_name: message,
                        action: "Create",
                        page_url: "Activity",
                        ip_address: ip,
                        browser: "",
                        os: "",
                        user_id: userId,
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
                        user_id: empFor
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
                        user_id: empFor
                    },
                },
            });

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
    const handleEmpValueChange = (newValue: { id: React.SetStateAction<string>; }) => {
        console.log(newValue);
        if (newValue && newValue.id) {
            // setEmpFor([...empFor, newValue.id]);
            setEmpFor(newValue.id);
        }
        console.log(empFor);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('successMsg', showSuccessMessage)
            console.log('errorMessage', showErrorMessage)
            setshowSuccessMessage(false);
            setshowErrorMessage(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [showSuccessMessage, showErrorMessage]);
    return (
        <div>
            <div className="lg:-pt-20">
                {showSuccessMessage && (
                    <Alert message="Message Added Successfully!" />
                )}
                {showErrorMessage && (
                    <Alert message="Something went wrong!" />
                )}
            </div>
            <form>
                <div className="space-y-12">
                    <div className="pb-2">
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={3}
                                        className="pt-2 pl-2 h-52 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                    {messageError && <p className="text-red-500 text-xs" >*Message is required</p>}

                                </div>
                                <div className="mt-2 ">
                                    <EmployeeSearch onEmpValueChange={handleEmpValueChange} heading={''} />

                                    {toError && <p className="text-red-500 text-xs" >*Employee is required</p>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center ">
                    <button
                        type="button"

                        onClick={handleSubmitAnnouncement}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ActivityAnnouncement;