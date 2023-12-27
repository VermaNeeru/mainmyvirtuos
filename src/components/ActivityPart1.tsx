import React, { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import TextEditor from "@/components/TextEditor";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_Employees, GET_USER_BY_ID } from '@/graphql/User/queries';
import { GET_TEMPLATE } from '@/graphql/Template/queries';
import { ADD_ACTIVITY_MUTATION } from "@/graphql/Activity/queries";
import Alert from "./Alert";
import { ADD_AuditLog_MUTATION } from "@/graphql/AuditLogs/queries";
import { getIp } from "./IPAddress";
import { ADD_ActivityAudience_MUTATION } from "@/graphql/ActivityAudience/queries";
import ActivityAnnouncement from "./ActivityAnnouncement";
import EmployeeSearch from "./EmployeeSearch";
import { getUserData } from "./UserData";
import { GET_Templates } from "@/graphql/EmailTemplate/queries";
// import { getIp } from "@/pages/ipaddress";
const replacePlaceholders = (template: string, replacements: Record<string, string>): string => {
    // Create a regular expression pattern for each placeholder
    const pattern = new RegExp(Object.keys(replacements).join('|'), 'g');

    // Replace placeholders with their corresponding values
    const replacedTemplate = template.replace(pattern, (match) => replacements[match]);

    return replacedTemplate;
};
function filterActivity(description: string) {
    const targets = ["fuck", "porn", "sex", "ass"]; // Keywords to match (case-insensitive)

    const loweredDescription = description.toLowerCase();

    const flag = targets.some(target => loweredDescription.includes(target)) ? 1 : 0;

    return flag;
}

export default function ActivityPart1() {
    // const [empFor, setEmpFor] = useState<any[]>([]);
    const [empFor, setEmpFor] = useState<any>('');
    const [emailTemplate, setEmailTemplate] = useState<any>('');
    const [ip, setIp] = useState('');
    const userData = getUserData();
    // const [userId, setUserId] = useState<number | null | undefined>(1)
    const [userId, setUserId] = useState<number | undefined>(userData?.id)
    useEffect(() => {
        async function fetchAndSetIp() {
            const fetchedIp = await getIp();
            setIp(fetchedIp);
        }

        fetchAndSetIp();
    }, []);

    const [openTab, setOpenTab] = useState<number | null | undefined>(1);

    const { loading, error, data } = useQuery(GET_Employees);
    const [executeQuery, { loading: userLoading, error: userError, data: getQueryById }] = useLazyQuery(GET_USER_BY_ID);

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

    const handleEditorContentChange = (content: any | ((prevState: any) => any)) => {
        setMessage(content)
        // This function will be called when the editor's content changes
        // console.log('Editor content in parent:', content);
        // You can also store the content in the parent's state or perform other actions
    };


    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    const [messageError, setMessageError] = useState(false);
    const [toError, setToError] = useState(false);
    const { loading: getAllDataLoading, error: getAllDataError, data: getAllData, refetch } = useQuery(GET_Templates);
    console.log("allData", getAllData);
    const [createActivity, { loading: activityLoading, error: activityError }] = useMutation(ADD_ACTIVITY_MUTATION);
    const [createAuditlog, { loading: auditlogLoading, error: auditlogError }] = useMutation(ADD_AuditLog_MUTATION);
    const [createActivitiesaudience, { loading: activitiesaudienceLoading, error: activitiesaudienceError }] = useMutation(ADD_ActivityAudience_MUTATION);

    const HandleSubmitMessage = async (e: { preventDefault: () => void }) => {
        (!message || message.trim() === "") ? setMessageError(true) : setMessageError(false);
        (!empFor) ? setToError(true) : setToError(false);
        if (!message || message.trim() === "") {
            setMessageError(true);
            return; // Exit early if there's an error
        }
        console.log(empFor);
        console.log(toError);
        if (!empFor) {
            console.log(empFor);
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
                        user_id: userId
                    },
                },
            });
            // const auditId = id;
            const { data: { createActivity: { id } } } = await createActivity({
                variables: {
                    createActivityInput: {
                        description: message,
                        type: "",
                        status: "Publish",
                        activity_notes: "",
                        user_id: userId
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




            // let templateList: any[] = [];

            // if (getAllData && getAllData.templates) {
            //     templateList = getAllData.templates?.map((data: { id: any; template_name: any; template_type: any; template_status: any; template_subject: any; template_constant: any; template_description: any; }) => ({
            //         id: data.id,
            //         template_name: data.template_name,
            //         template_type: data.template_type,
            //         template_status: data.template_status,
            //         template_subject: data.template_subject,
            //         template_constant: data.template_constant,
            //         template_description: data.template_description,

            //     }));


            // }
            // if (templateList) {
            //     const matchingTemplateList = templateList.find(template => (
            //         template.template_type === 'Activity(New)'
            //     ));
            //     // setEmailTemplate(matchingTemplateList);
            //     // console.log('matchingTemplateList', matchingTemplateList);
            //     // // setEmailTemplate(matchingTemplateList);
            //     if (matchingTemplateList) {
            //         const templateDescription: string = matchingTemplateList.template_description;
            //         console.log('templateDescription', templateDescription);


            //         const replacements = {
            //             '{{FIRST_NAME}}': 'fname',
            //             '{{LAST_NAME}}': 'lname',
            //             // Add more replacements as needed
            //         };

            //         // Replace placeholders in templateDescription
            //         const modifiedTemplate = replacePlaceholders(templateDescription, replacements);



            //     }
            // }


            // let templateDescription = emailTemplate.template_description;
            // console.log('templateDescription', templateDescription);

            // const template = "Activity";
            // const { data } = await sendEmailToUser({
            //     variables: { email, template },
            // });


            setMessage('');
            setSelectedPerson(null);
            setEmpFor(null);
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
        if (newValue) {
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
        <div className="flex ">
            <div className="lg:-pt-20">
                {showSuccessMessage && (
                    <Alert message="Message Added Successfully!" alertState={false} onAlertStateChange={function (newState: boolean): void {
                        throw new Error("Function not implemented.");
                    } } />

                    // <Alert message="Message Added Successfully!" />


                )}
                {showErrorMessage && (
                    <Alert message="Something went wrong!" alertState={false} onAlertStateChange={function (newState: boolean): void {
                        throw new Error("Function not implemented.");
                    }} />

                    // <Alert message="Something went wrong!" />


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
                                                        {/* <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
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
                                                        </Combobox> */}
                                                        <EmployeeSearch onEmpValueChange={handleEmpValueChange} heading={''} />
                                                        {toError && <p className="text-red-500 text-xs" >*Employee is required </p>}

                                                    </div>

                                                </div>

                                            </div>
                                        </div>



                                    </div>

                                    <div className="flex items-center ">
                                        <button
                                            type="button"
                                            onClick={HandleSubmitMessage}
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <ActivityAnnouncement userId={userId} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



function sendEmailToUser(arg0: { variables: { email: any; template: string; }; }): { data: any; } | PromiseLike<{ data: any; }> {
    throw new Error("Function not implemented.");
}
