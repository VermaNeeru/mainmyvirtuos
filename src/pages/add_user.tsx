import React, { useEffect, useState } from 'react'

import DatePickerComp from '@/components/DatePickerComp/DatePickerComp'
import DepartmentSearch from '@/components/DepartmentSearch'
import DivisionSearch from '@/components/DivisionSearch'
import ManagerSearch from '@/components/ManagerSearch'
import RoleSearch from '@/components/RoleSearch'
import TeamSearch from '@/components/TeamSearch'

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER_TYPES } from '@/graphql/Usertype/queries'
import { ADD_USER_MUTATION } from '@/graphql/User/queries'
import { ADD_BASIC_INFO_MUTATION } from '@/graphql/BasicInfo/queries'
import Alert from '@/components/Alert'
import { parse, format } from 'date-fns';
import { ADD_Officialinfo_MUTATION } from '@/graphql/Officialinfo/queries'
import { GET_USER_ACCESS_TYPES } from '@/graphql/Useraccesstype/queries'
import { getUserData } from '@/components/UserData'

export default function AddUser() {
    const userData = getUserData();
    // const [userId, setUserId] = useState<number | null | undefined>(1)
    const [userId, setUserId] = useState<number | undefined>(userData?.id);
    // const name = `${userData.firstname}.${userData.lastname}`;
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [unameError, setUnameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [fnameError, setFnameError] = useState(false);
    const [lnameError, setLnameError] = useState(false);
    const [mnameError, setMnameError] = useState(false);
    const [ecodeError, setEcodeError] = useState(false);
    // const [mnoError, setMnoError] = useState(false);
    // const [llError, setLlError] = useState(false);
    // const [extnError, setExtnError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    // const [designationError, setDesignationError] = useState(false);
    // const [departmentError, setDepartmentError] = useState(false);
    // const [divisionError, setDivisionError] = useState(false);
    const [roleError, setRoleError] = useState(false);
    const [dojError, setDojError] = useState(false);
    const [manager1Error, setManager1Error] = useState(false);
    // const [utError, setUtError] = useState(false);
    // const [uatError, setUatError] = useState(false);
    // const [usError, setUsError] = useState(false);
    // const [teamError, setTeamError] = useState(false);

    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [middlename, setMiddlename] = useState<string>('');
    const [employeeCode, setEmployeecode] = useState<string>('');
    const [mobileNo, setMobileNo] = useState<string>('');
    const [landLine, setLandLine] = useState<string>('');
    const [extn, setExtn] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [designation, setDesignation] = useState<string>('');
    const [departmentId, setDepartmentId] = useState<string>('');
    const [divisionId, setDivisionId] = useState<number | null>();
    const [roleId, setRoleId] = useState<number | null>();
    const [doj, setDoj] = useState('');
    const [managerId1, setManagerId1] = useState<number | null>();
    const [managerId2, setManagerId2] = useState<number | null>();
    const [userTypeId, setUserTypeId] = useState<number | null>(3);
    const [userAccessTypeId, setUserAccessTypeId] = useState<number | null>(4);
    const [EmployeeAccess, setEmployeeAccess] = useState<number | null>();
    const [userStatus, setUserStatus] = useState('Inactive');
    const [team, setTeam] = useState<string>();
    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    // const [startDate, setStartDate] = useState('');

    const { loading: getUsertypeDataLoading, error: getUsertypeDataError, data: getUsertypeData } = useQuery(GET_USER_TYPES);
    const { loading: getUseraccesstypeDataLoading, error: getUseraccesstypeDataError, data: getUseraccesstypeData } = useQuery(GET_USER_ACCESS_TYPES);
    console.log("UsertypeData", getUsertypeData);

    const [createQuery, { loading: createQueryLoading, error: createQueryError }] = useMutation(ADD_USER_MUTATION);
    const [createQueryBI, { loading: createQueryBILoading, error: createQueryBIError }] = useMutation(ADD_BASIC_INFO_MUTATION);
    const [createQueryOI, { loading: createQueryOILoading, error: createQueryOIError }] = useMutation(ADD_Officialinfo_MUTATION);

    let usertypelist: any[] = [];

    // useEffect(() => {
    // Fetch the data here and update sections when the data is available
    if (getUsertypeData && getUsertypeData.usertypes) {
        console.log(getUsertypeData.usertypes);
        // console.log(getUsertypeData.usertypes.id);
        // console.log(getUsertypeData.usertypes.type_name);
        usertypelist = getUsertypeData.usertypes.map((data: { id: any; type_name: any; status: any; }) => ({
            id: data.id,
            type_name: data.type_name,
            status: data.status
        }));
        // usertypelist = [1, 2, 3, 4, 5, 6]
        // setSections1(usertypelist); // Update the state with the fetched data
        // setSections(usertypelist); // Update the state with the fetched data
    }
    // }, [getUsertypeData]); // This useEffect runs whenever getUsertypeData changes
    console.log("usertypelist", usertypelist);

    let useraccesstypelist: any[] = [];

    // useEffect(() => {
    // Fetch the data here and update sections when the data is available
    if (getUseraccesstypeData && getUseraccesstypeData.useraccesstypes) {
        console.log(getUseraccesstypeData.useraccesstypes);
        // console.log(getUsertypeData.usertypes.id);
        // console.log(getUsertypeData.usertypes.type_name);
        useraccesstypelist = getUseraccesstypeData.useraccesstypes.map((data: { id: any; access_type_name: any; status: any; }) => ({
            id: data.id,
            access_type_name: data.access_type_name,
            status: data.status
        }));
        // usertypelist = [1, 2, 3, 4, 5, 6]
        // setSections1(usertypelist); // Update the state with the fetched data
        // setSections(usertypelist); // Update the state with the fetched data
    }
    // }, [getUsertypeData]); // This useEffect runs whenever getUsertypeData changes
    console.log("useraccesstypelist", useraccesstypelist);

    const handleTeamChange = (teams: any) => {
        console.log(teams)
        setTeam(teams?.id); // Update parent component's state

    };

    const handleDepartmentChange = (departments: any) => {
        console.log(departments)
        setDepartmentId(departments?.id); // Update parent component's state
    };
    console.log(departmentId)

    const handleDivisionChange = (divisions: any) => {
        console.log(divisions)
        setDivisionId(divisions?.id); // Update parent component's state
    };
    console.log(divisionId)
    const handleRoleChange = (roles: any) => {
        console.log(roles)
        setRoleId(roles?.id); // Update parent component's state
    };
    console.log(roleId)
    // console.log(team)
    const handleManager1Change = (managers: any) => {
        console.log(managers)
        setManagerId1(managers?.id); // Update parent component's state
    };
    // console.log(roleId)
    const handleManager2Change = (managers: any) => {
        console.log(managers)
        setManagerId2(managers?.id); // Update parent component's state
    };
    // console.log(roleId)
    // console.log(team)

    const handleStartDateChange = (newDate: any) => {
        setDoj(newDate); // Update parent component's state
        console.log(newDate)

    };
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        setshowErrorMessage(false);
        console.log('called');
        console.log('firstname', firstname)// createUser
        console.log('lastname', lastname)//createUser
        console.log('middlename', middlename)//createQueryBI
        console.log('email', email)//createUser
        console.log('username', username)
        console.log('password', password)
        console.log('userStatus', userStatus)//createUser
        console.log('designation', designation)//createUser
        console.log('team', team)//createQueryOI
        console.log('departmentId', departmentId)//createQueryOI
        console.log('divisionId', divisionId)//createQueryOI
        console.log('roleId', roleId)//createUser
        console.log('employeeCode', employeeCode)//createQueryOI
        console.log('doj', doj)//createQueryBI
        console.log('managerId1', managerId1)//createQueryOI
        console.log('managerId2', managerId2)//createQueryOI
        console.log('userTypeId', userTypeId)//createQueryOI
        console.log('userAccessTypeId', userAccessTypeId)
        console.log('extn', extn)//createUser
        const dateObject = parse(doj, 'dd/MM/yyyy', new Date());
        let error;

        (!username) ? setUnameError(true) : setUnameError(false);
        (!password) ? setPasswordError(true) : setPasswordError(false);
        (!firstname) ? setFnameError(true) : setFnameError(false);
        (!lastname) ? setLnameError(true) : setLnameError(false);
        (!employeeCode) ? setEcodeError(true) : setEcodeError(false);
        (!email) ? setEmailError(true) : setEmailError(false);
        (!roleId) ? setRoleError(true) : setRoleError(false);
        (!doj) ? setDojError(true) : setDojError(false);
        (!managerId1) ? setManager1Error(true) : setManager1Error(false);

        if (!username || !password || !firstname || !lastname || !employeeCode || !email || !roleId || !doj || !managerId1) {
            error = true;
        }

        // if (unameError == true || passwordError == true || fnameError == true || lnameError == true || ecodeError == true || emailError == true || roleError == true || dojError == true || manager1Error == true) {
        if (error == true) {
            console.log('true');
            return;
        } else {
            console.log('false');
            (!username) ? setUnameError(true) : setUnameError(false);
            (!password) ? setPasswordError(true) : setPasswordError(false);
            (!firstname) ? setFnameError(true) : setFnameError(false);
            (!lastname) ? setLnameError(true) : setLnameError(false);
            (!employeeCode) ? setEcodeError(true) : setEcodeError(false);
            (!email) ? setEmailError(true) : setEmailError(false);
            (!roleId) ? setRoleError(true) : setRoleError(false);
            (!doj) ? setDojError(true) : setDojError(false);
            (!managerId1) ? setManager1Error(true) : setManager1Error(false);

        }


        // Format the date using date-fns
        const formattedDate = format(dateObject, 'MM-dd-yy');
        console.log('doj', formattedDate)//createQueryBI
        try {
            const { data: { createUser: { id: userId } } } = await createQuery({
                variables: {
                    createUserInput: {
                        username: username,
                        password: password,
                        firstname: firstname,
                        lastname: lastname,
                        officialemail: email,
                        extn: parseInt(extn),
                        designation: designation,
                        role_id: roleId,
                        status: userStatus,
                        uat_id: userAccessTypeId,
                        gender: "",
                        education: ""

                    },
                },
            });

            console.log('response', userId);

            const { data: { createBasicinfo: { id: BIId } } } = await createQueryBI({
                variables: {
                    createBasicinfoInput: {
                        user_id: userId,
                        middlename: middlename,
                        doj: formattedDate,
                    },
                },
            });

            console.log('response', BIId);

            const { data: { createOfficialinfo: { id: OIId } } } = await createQueryOI({
                variables: {
                    createOfficialinfoInput: {
                        user_id: userId,
                        team: team,
                        division_id: divisionId,
                        designation: designation,
                        manager_id1: managerId1,
                        manager_id2: managerId2,
                        department_id: departmentId,
                        doj: formattedDate,
                        employee_code: employeeCode,
                        user_type_id: userTypeId,
                    },
                },
            });

            console.log('response', OIId);

            if (OIId > 0) {
                console.log('OIId');
                setshowSuccessMessage(true);

                setFirstname('');
                setLastname('');
                setMiddlename('');
                setEmail('');
                setUserStatus('');
                setDesignation('');
                setTeam('');
                setDepartmentId('');
                setDivisionId(null);
                setRoleId(null);
                setEmployeecode('');
                setDoj('');
                setManagerId1(null);
                setManagerId2(null);
                setUserTypeId(null);
                setUserAccessTypeId(null);
                setExtn('');

            }

        } catch (error) {
            setshowErrorMessage(true);

            console.log('catchError', error);
        }

    }

    console.log("usertypelist", usertypelist);

    return (
        <div className=' w-full rounded px-2'>
            {showSuccessMessage && (
                // <Alert message="Division Added Successfully!" alertState={alertState} onAlertStateChange={handleAlertStateChange} />
                <Alert message="Employee Added Successfully!" />
            )}
            {showErrorMessage && (
                <Alert message="Something went wrong!" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Add New Employee
                        </h2>

                    </div>
                </div>
            </div>
            <div className=" mb-4 px-2 py-2">
                <form>
                    <div className='border-t-4 rounded-lg border border-gray-300 '>
                        <div className=" grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2 bg-white py-2 px-2">
                            <div className="sm:col-span-1">
                                <h3>Login Details</h3>
                            </div>
                        </div>

                        <div className="space-y-2 px-2 py-2 bg-gray-100 ">
                            <div className="pb-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                User Name
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="User Name"
                                            />
                                            {unameError && <p className="text-red-500 text-xs" >*Name is required</p>}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                onChange={(e) => setPassword(e.target.value)}
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Password"
                                            />
                                            {passwordError && <p className="text-red-500 text-xs" >*Password is required</p>}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='border-t-4 rounded-lg border border-gray-300 mt-4'>
                        <div className=" grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2 bg-white py-2 px-2">
                            <div className="sm:col-span-1">
                                <h3>Personal Information</h3>
                            </div>
                        </div>
                        <div className="space-y-2 px-2 py-2 bg-gray-100 ">
                            <div className="pb-4">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 lg:gap-y-4 gap-y-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                value={firstname}
                                                onChange={(e) => setFirstname(e.target.value)}
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="First Name"
                                            />
                                            {fnameError && <p className="text-red-500 text-xs" >*FirstName is required</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Middle Name
                                            </label>
                                            <input
                                                type="text"
                                                value={middlename}
                                                onChange={(e) => setMiddlename(e.target.value)}
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Middle Name"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                value={lastname}
                                                onChange={(e) => setLastname(e.target.value)}
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Last Name"
                                            />
                                            {lnameError && <p className="text-red-500 text-xs" >*LastName is required</p>}
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='border-t-4 rounded-lg border border-gray-300 mt-4'>
                        <div className=" grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2 bg-white py-2 px-2">
                            <div className="sm:col-span-1">
                                <h3>Official Information</h3>
                            </div>
                        </div>
                        <div className="space-y-2 px-2 py-2 bg-gray-100 ">
                            <div className="pb-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Employee Code
                                            </label>
                                            <input
                                                type="text"
                                                value={employeeCode}
                                                onChange={(e) => setEmployeecode(e.target.value)}
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Employee Code"
                                            />
                                            {ecodeError && <p className="text-red-500 text-xs" >*Employee Code is required</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Official Mobile Number
                                            </label>
                                            <input
                                                type="number"
                                                value={mobileNo}
                                                onChange={(e) => setMobileNo(e.target.value)}
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Official Mobile Number"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Official Landline Number
                                            </label>
                                            <input
                                                type="text"
                                                value={landLine}
                                                onChange={(e) => setLandLine(e.target.value)}
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Official Landline Number"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Official Extension
                                            </label>
                                            <input
                                                type="text"
                                                value={extn}
                                                onChange={(e) => setExtn(e.target.value)}
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Official Extension"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Official Email
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Official Email"
                                            />
                                            {emailError && <p className="text-red-500 text-xs" >*Email is required</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Designation
                                            </label>
                                            <input
                                                type="text"
                                                value={designation}
                                                onChange={(e) => setDesignation(e.target.value)}
                                                name="email"
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Designation"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2 mt-2">
                                    <div className="sm:col-span-1">
                                        <TeamSearch onTeamChange={handleTeamChange} heading={''} />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <DepartmentSearch onDepartmentChange={handleDepartmentChange} heading={''} />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <DivisionSearch onDivisionChange={handleDivisionChange} heading={''} />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <RoleSearch onRoleChange={handleRoleChange} heading={''} />
                                        {roleError && <p className="text-red-500 text-xs" >*Role is required</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 lg:gap-y-4 gap-y-2 mt-2">
                                    <div className="sm:col-span-1">
                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                            Date of Joining
                                        </label>

                                        <div className='mt-2'>
                                            <DatePickerComp onDateChange={handleStartDateChange} />
                                            {dojError && <p className="text-red-500 text-xs" >*DOJ is required</p>}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <ManagerSearch heading="Manager" onManagerChange={handleManager1Change} />
                                        {manager1Error && <p className="text-red-500 text-xs" >*Manager is required</p>}
                                    </div>
                                    <div className="sm:col-span-1">
                                        <ManagerSearch heading="Manager's Manager" onManagerChange={handleManager2Change} />
                                    </div>

                                </div>
                                <div className="mt-8 mb-8 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-4 lg:grid-cols-2">
                                    <div className="sm:col-span-6">
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white px-2 text-sm text-indigo-500">User Type</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <fieldset className="mt-4">
                                                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">

                                                    {
                                                        usertypelist.map((utitem, sectionIndex) => (
                                                            <div key={utitem.id} className="flex items-center">
                                                                <input
                                                                    id={utitem.id}
                                                                    value={utitem.id}
                                                                    name="user_type"
                                                                    type="radio"
                                                                    defaultChecked={utitem.type_name === 'Intern'}
                                                                    onChange={(e) => setUserTypeId(parseInt(e.target.value))}
                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                />
                                                                <label htmlFor={utitem.type_name} className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                    {utitem.type_name}
                                                                </label>
                                                            </div>
                                                        ))
                                                    }

                                                    {/* <div key="1" className="flex items-center">
                                                        <input
                                                            id="1"
                                                            name="user_type"
                                                            type="radio"
                                                            defaultChecked
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="PE" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            PE
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="user_type"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="QE" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            QE
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="user_type"
                                                            type="radio"
                                                            defaultChecked
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Intern" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Intern
                                                        </label>
                                                    </div> */}

                                                </div>
                                            </fieldset>

                                        </div>
                                    </div>

                                </div>

                                <div className="mt-8 mb-8 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-4 lg:grid-cols-2">
                                    <div className="sm:col-span-6">
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white px-2 text-sm text-indigo-500">Employee Access</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <fieldset className="mt-4">
                                                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                                    {
                                                        useraccesstypelist.map((uatitem, sectionIndex) => (
                                                            <div key={uatitem.id} className="flex items-center">
                                                                <input
                                                                    id={uatitem.id}
                                                                    value={uatitem.id}
                                                                    name="user_access_type"
                                                                    type="radio"
                                                                    defaultChecked={uatitem.access_type_name === 'Director'}
                                                                    onChange={(e) => setUserAccessTypeId(parseInt(e.target.value))}
                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                />
                                                                <label htmlFor={uatitem.access_type_name} className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                    {uatitem.access_type_name}
                                                                </label>
                                                            </div>
                                                        ))
                                                    }


                                                    {/* <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="emp_access"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Manager" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Manager
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="emp_access"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Associate" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Associate
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="emp_access"
                                                            type="radio"
                                                            defaultChecked
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Director" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Director
                                                        </label>
                                                    </div> */}

                                                </div>
                                            </fieldset>

                                        </div>
                                    </div>

                                </div>

                                <div className="mt-8 mb-8 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-4 lg:grid-cols-2">
                                    <div className="sm:col-span-6">
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white px-2 text-sm text-indigo-500">User Status</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <fieldset className="mt-4">
                                                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                                    <div key="1" className="flex items-center">
                                                        <input
                                                            id="Active"
                                                            name="user_status"
                                                            type="radio"
                                                            value={userStatus}
                                                            onChange={() => setUserStatus('Active')}

                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Active" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Active
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="Inactive"
                                                            name="user_status"
                                                            type="radio"
                                                            value={userStatus}
                                                            onChange={() => setUserStatus('Inactive')}
                                                            defaultChecked
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Inactive" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Inactive
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>

                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                    <div className=" lg:text-right mt-4">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="lg:ml-4 ml-2 mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Cancel
                        </button>

                    </div>
                </form>
            </div>

        </div>

    )
}
