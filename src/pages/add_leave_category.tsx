import React, { useState, useEffect } from 'react'
import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ADD_Leavetype_MUTATION, GET_Leavetype_BY_ID } from '@/graphql/LeaveType/queries';
import Alert from '@/components/Alert';
import { GET_USER_TYPES } from '@/graphql/Usertype/queries';
import { ADD_Leaveusertype_MUTATION } from '@/graphql/LeaveUserType/queries';

export default function AddLeaveCategory() {
    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    const [leavetypeId, setLeavetypeId] = useState<number>()
    const [leavetypeColor, setLeavetypeColor] = useState('')
    const [leavetypeName, setLeavetypeName] = useState('')
    const [leavetypeCode, setLeavetypeCode] = useState('')
    const [leavetypeRole, setLeavetypeRole] = useState('')
    const [leavetypeDescription, setLeavetypeDescription] = useState('')
    const [leavetypeEncashable, setLeavetypeEncashable] = useState('Yes')
    const [leavetypeCarryForwarded, setLeavetypeCarryForwarded] = useState('Yes')
    const [mStatus, setmStatus] = useState('')
    const [usertypeId, setUsertypeId] = useState<number[]>([])
    const [quateraj, setQuateraj] = useState([])
    const [quateran, setQuateran] = useState([])
    const [quaterdm, setQuaterdm] = useState([])

    const [aError, setAError] = useState(false);
    const [bError, setBError] = useState(false);
    const [sections, setSections] = useState<any[]>([]); // Initialize as an empty array
    const [sections1, setSections1] = useState<any[]>([]); // Initialize as an empty array

    const [checkboxes, setCheckboxes] = useState([
        { id: 'checkbox1', value: 'HR', isChecked: false },
        { id: 'checkbox2', value: 'Manager', isChecked: false },
        { id: 'checkbox3', value: 'Associate', isChecked: false },
        { id: 'checkbox4', value: 'Director', isChecked: false },

        // Add more checkboxes as needed
    ]);

    const [executeQuery, { loading, error, data: getQueryById }] = useLazyQuery(GET_Leavetype_BY_ID);
    // const [fExecuteQuery, { loading: fLoading, error: fError, data: fData }] = useLazyQuery(GET_FILTERED_DIVISIONS);
    const [createQuery, { loading: createQueryLoading, error: createQueryError }] = useMutation(ADD_Leavetype_MUTATION);
    const [createQuery2, { loading: createQueryLoading2, error: createQueryError2 }] = useMutation(ADD_Leaveusertype_MUTATION);

    const { loading: getUsertypeDataLoading, error: getUsertypeDataError, data: getUsertypeData, refetch } = useQuery(GET_USER_TYPES);
    console.log("UsertypeData", getUsertypeData);

    let usertypelist: any[] = [];

    useEffect(() => {
        // Fetch the data here and update sections when the data is available
        if (getUsertypeData && getUsertypeData.usertypes) {
            const usertypelist = getUsertypeData.usertypes.map((data: { id: any; type_name: any; status: any; }) => ({
                id: data.id,
                type_name: data.type_name,
                status: data.status,
                quarters: ['', '', '']
            }));

            setSections1(usertypelist); // Update the state with the fetched data
            setSections(usertypelist); // Update the state with the fetched data
        }
    }, [getUsertypeData]); // This useEffect runs whenever getUsertypeData changes
    console.log(sections1)
    console.log(sections);
    // const [sections, setSections] = useState(usertypelist);

    // console.log(sections)

    // useEffect(() => {
    //     const timer = setTimeout(() => {

    const initialSections = [
        { id: 1, type_name: 'QE', status: "Active", quarters: ['', '', ''] },
        { id: 2, type_name: 'PE', status: "Active", quarters: ['', '', ''] },
        // Add more sections as needed
    ];
    // const [sections, setSections] = useState(usertypelist);

    // console.log(sections)
    // //     }, 3000);
    // }, []);

    // useEffect(() => {
    // }, [null]);


    useEffect(() => {
        if (leavetypeId) {
            console.log(leavetypeId);
            executeQuery({ variables: { id: leavetypeId } });
            console.log(getQueryById);
        }
    }, [leavetypeId]);

    console.log(getQueryById);
    useEffect(() => {
        if (getQueryById && getQueryById.leavetype) {
            const { leavetype } = getQueryById; // Destructure the division object
            setLeavetypeColor(leavetype.leave_color);
            setLeavetypeCode(leavetype.leave_type_code);
            setLeavetypeRole(leavetype.leave_type_role);
            setLeavetypeDescription(leavetype.leave_type_description);
            setLeavetypeEncashable(leavetype.encashable);
            setLeavetypeCarryForwarded(leavetype.carry_forwarded);

        }
    }, [getQueryById]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        console.log('called');
        (!leavetypeName) ? setAError(true) : setAError(false);
        (!mStatus) ? setBError(true) : setBError(false);

        if (aError == true || bError == true) {
            return;
        }
        console.log('Submit');
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        try {
            console.log('Try to submit')
            console.log('leavetypeName', leavetypeName)
            console.log('leavetypeCode', leavetypeCode)
            console.log('leavetypeRole', getCheckedValuesString())
            console.log('leavetypeDescription', leavetypeDescription)
            console.log('leavetypeEncashable', leavetypeEncashable)
            console.log('leavetypeCarryForwarded', leavetypeCarryForwarded)
            const { data: { createLeavetype: { id } } } = await createQuery({
                variables: {
                    createLeavetypeInput: {
                        leave_color: leavetypeColor,
                        leave_type_name: leavetypeName,
                        leave_type_code: leavetypeCode,
                        leave_type_role: getCheckedValuesString(),
                        leave_type_description: leavetypeDescription,
                        encashable: leavetypeEncashable,
                        carry_forwarded: leavetypeCarryForwarded,
                    },
                },
            });
            console.log('response', id);
            const leave_type_id = id;
            const createLeavePromises = [];
            for (const utitem of sections) {
                console.log(utitem.id);
                console.log(leave_type_id);
                console.log(utitem.quarters);
                console.log(utitem.quarters[0]);
                console.log(utitem.quarters[1]);
                console.log(utitem.quarters[2]);
                const { data: { createLeaveusertype: { id } } } = await createQuery2({
                    variables: {
                        createLeaveusertypeInput: {
                            user_type_id: utitem.id,
                            leave_type_id: leave_type_id, // This assumes 'id' is already defined
                            leavetypeId: leave_type_id,
                            quarter_one: parseInt(utitem.quarters[0]),
                            quarter_two: parseInt(utitem.quarters[1]),
                            quarter_three: parseInt(utitem.quarters[2]),
                            leave_count: parseInt(utitem.quarters[0]) + parseInt(utitem.quarters[1]) + parseInt(utitem.quarters[2]),
                        },
                    },
                });
                // Handle the result or perform further operations here
                console.log('Created leaveusertype with id:', id);

            }
            console.log('response', id);

            setLeavetypeName('');
            setLeavetypeCode('');
            setLeavetypeColor('');
            setLeavetypeRole('');
            setLeavetypeEncashable('');
            setLeavetypeCarryForwarded('');
            setLeavetypeDescription('');
            // setSections1('');
            // setSections('');
            setmStatus('');


            setshowSuccessMessage(true);
            setshowErrorMessage(false);

            console.log('showSuccessMessage', showSuccessMessage);
            // console.log('response', data);
            // console.log('response', response.data);
            // setQuickEdit(false)
            // refetch();
        } catch (error) {
            setshowErrorMessage(true);

            console.log('catchError', error);
        }

        // console.log(category);

    };

    const handleInputChange = (sectionIndex: number, quarterIndex: number, newValue: string) => {
        console.log(sectionIndex)
        console.log(quarterIndex)
        console.log(newValue)
        console.log(sections)
        const updatedSections = [...sections];
        updatedSections[sectionIndex].quarters[quarterIndex] = newValue;
        setSections(updatedSections);
    };

    const handleCheckboxChange = (id) => {
        // Create a copy of the checkboxes array
        const updatedCheckboxes = [...checkboxes];

        // Find the checkbox with the matching id
        const checkboxToUpdate = updatedCheckboxes.find((checkbox) => checkbox.id === id);

        // Toggle the isChecked property of the checkbox
        if (checkboxToUpdate) {
            checkboxToUpdate.isChecked = !checkboxToUpdate.isChecked;
            setCheckboxes(updatedCheckboxes); // Update the state with the modified array
        }
        console.log(checkboxes)
    };

    const getCheckedValuesString = () => {
        const checkedValues = checkboxes
            .filter((checkbox) => checkbox.isChecked)
            .map((checkbox) => checkbox.value);
        return checkedValues.join(',');
    };
    const handleEncashChange = (event) => {
        setLeavetypeEncashable(event.target.value);
    };
    const handleCarryForwardChange = (event) => {
        setLeavetypeCarryForwarded(event.target.value);
    };
    return (
        <div className=' w-full rounded px-2'>
            {showSuccessMessage && (
                // <Alert message="Division Added Successfully!" alertState={alertState} onAlertStateChange={handleAlertStateChange} />
                <Alert message="Leavetype Added Successfully!" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h2 className="text-blueGray-700 text-xl font-semibold">
                                    Add Leave Type
                                </h2>
                            </div>
                            <div className="mt-4 lg:ml-16 ml-0 sm:mt-0 sm:flex-none">
                                <Link href='/leave_category_list'>
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
                </div>
            </div>

            <div className='rounded-lg border border-gray-300 bg-white '>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded mt-6">
                    <div className=" lg:py-3 lg:px-4 py-2 px-2 flex-auto">
                        <div className="lg:mt-2 grid grid-cols-1 lg:grid-cols-3 gap-x-6 lg:gap-y-4 gap-y-2">
                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={(e) => setLeavetypeName(e.target.value)}
                                        value={leavetypeName}
                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Leave Type Name.."
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={(e) => setLeavetypeCode(e.target.value)}
                                        value={leavetypeCode}
                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Leave Type Code.."
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={(e) => setLeavetypeColor(e.target.value)}
                                        value={leavetypeColor}
                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Color"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 ">

                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <label className="text-sm text-gray-500 mt-2 text-gray-600 font-medium">Encashable</label>
                                    <fieldset className="mt-4">
                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                            <div key="1" className="flex items-center">
                                                <input
                                                    id="1"
                                                    name="encashable"
                                                    type="radio"
                                                    value="Yes"
                                                    checked={leavetypeEncashable === 'Yes'}
                                                    onChange={handleEncashChange}
                                                    // defaultChecked
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="Yes" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    Yes
                                                </label>
                                            </div>
                                            <div key="2" className="flex items-center">
                                                <input
                                                    id="2"
                                                    name="encashable"
                                                    type="radio"
                                                    value="No"
                                                    checked={leavetypeEncashable === 'No'}
                                                    onChange={handleEncashChange}
                                                    // defaultChecked
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="No" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    No
                                                </label>
                                            </div>

                                        </div>
                                    </fieldset>

                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <label className="text-sm text-gray-500 mt-2 text-gray-600 font-medium">Carry Forward</label>
                                    <fieldset className="mt-4">
                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                            <div key="1" className="flex items-center">
                                                <input
                                                    id="1"
                                                    name="carry_forward"
                                                    type="radio"
                                                    // defaultChecked
                                                    value="Yes"
                                                    checked={leavetypeCarryForwarded === 'Yes'}
                                                    onChange={handleCarryForwardChange}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="Yes" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    Yes
                                                </label>
                                            </div>
                                            <div key="2" className="flex items-center">
                                                <input
                                                    id="2"
                                                    name="carry_forward"
                                                    type="radio"
                                                    // defaultChecked
                                                    value="No"
                                                    checked={leavetypeCarryForwarded === 'No'}
                                                    onChange={handleCarryForwardChange}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="No" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>

                                </div>
                            </div>


                        </div>
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-4">

                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <label className="text-sm text-gray-500 mt-2 text-gray-600 font-medium">User Role</label>
                                    <fieldset className="mt-4">
                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">

                                            {checkboxes.map((checkbox) => (


                                                <div key="1" className="flex items-center">
                                                    <input
                                                        id="1"
                                                        name="user_role"
                                                        type="checkbox"
                                                        checked={checkbox.isChecked}
                                                        onChange={() => handleCheckboxChange(checkbox.id)}
                                                        value={checkbox.value}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="HR" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                        {checkbox.value}
                                                    </label>
                                                </div>
                                            ))}
                                            {/* <div key="1" className="flex items-center">
                                                <input
                                                    id="1"
                                                    name="user_role"
                                                    type="checkbox"
                                                    onChange={(e) => setLeavetypeRole(e.target.value)}
                                                    value="HR"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="HR" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    HR
                                                </label>
                                            </div>
                                            <div key="2" className="flex items-center">
                                                <input
                                                    id="2"
                                                    name="user_role"
                                                    type="checkbox"
                                                    onChange={(e) => setLeavetypeRole(e.target.value)}
                                                    value={leavetypeRole}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="Manager" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    Manager
                                                </label>
                                            </div>
                                            <div key="2" className="flex items-center">
                                                <input
                                                    id="2"
                                                    name="user_role"
                                                    type="checkbox"
                                                    onChange={(e) => setLeavetypeRole(e.target.value)}
                                                    value={leavetypeRole}

                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="Associate" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    Associate
                                                </label>
                                            </div>
                                            <div key="2" className="flex items-center">
                                                <input
                                                    id="2"
                                                    name="user_role"
                                                    type="checkbox"
                                                    onChange={(e) => setLeavetypeRole(e.target.value)}
                                                    value={leavetypeRole}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="Director" className="ml-3 block text-sm font-normal leading-6 text-gray-400">
                                                    Director
                                                </label>
                                            </div> */}
                                        </div>
                                    </fieldset>

                                </div>
                            </div>


                        </div>

                        {
                            sections1.map((utitem, sectionIndex) => (


                                <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                                    <div className="sm:col-span-1 mt-4">
                                        <label className="text-sm text-gray-600 font-medium">{utitem.type_name}</label>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 lg:gap-y-4 gap-y-1">
                                        {utitem.quarters.map((value, quarterIndex) => (
                                            <div className="sm:col-span-1">
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        // onChange={setQuateraj(e.target.value)}
                                                        // value={quateraj}
                                                        key={quarterIndex}
                                                        value={value}
                                                        onChange={(e) => handleInputChange(sectionIndex, quarterIndex, e.target.value)}
                                                        id="email"
                                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="April - July"
                                                    />
                                                </div>
                                            </div>

                                        ))}
                                        {/* <div className="sm:col-span-1">
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    // onChange={setQuateran(e.target.value)}
                                                    // value={quateran}

                                                    id="email"
                                                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Aug - Nov"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    // onChange={setQuaterdm(e.target.value)}
                                                    // value={quaterdm}

                                                    id="email"
                                                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Dec - March"
                                                />
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            ))
                        }

                        {/* <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                            <div className="sm:col-span-1 mt-4">
                                <label className="text-sm text-gray-600 font-medium">PE</label>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 lg:gap-y-4 gap-y-1">
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="April - July"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Aug - Nov"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Dec - March"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                            <div className="sm:col-span-1 mt-4">
                                <label className="text-sm text-gray-600 font-medium">QE</label>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 lg:gap-y-4 gap-y-1">
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="April - July"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Aug - Nov"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Dec - March"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                            <div className="sm:col-span-1 mt-4">
                                <label className="text-sm text-gray-600 font-medium">Intern</label>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 lg:gap-y-4 gap-y-1">
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="April - July"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Aug - Nov"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Bars3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Dec - March"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="lg:mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2">
                            <div className="sm:col-span-1">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Bars3Icon className="h-5 w-5 -mt-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <textarea
                                        type="text"
                                        name="email"
                                        id="email"
                                        onChange={(e) => setLeavetypeDescription(e.target.value)}
                                        value={leavetypeDescription}
                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Leave Type Description.."
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="mt-14 lg:mt-4 items-center">
                            <button
                                type="button"
                                onClick={handleSubmit}

                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
