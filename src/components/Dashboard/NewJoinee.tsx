import React, { useState } from 'react'
import { useMutation } from "@apollo/client";
import { ADD_USER_MUTATION } from '@/graphql/User/queries';
import Alert from '../Alert';

export default function NewJoinee() {
    const [user, setUser] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState("female");
    const [education, setEducation] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [extn, setExtn] = useState<number>();
    const [status, setStatus] = useState("active");

    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);


    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [designationError, setDesignationError] = useState(false);
    const [educationError, setEducationError] = useState(false);
    const [hobbiesError, setHobbiesError] = useState(false);
    const [extnError, setExtnError] = useState(false);


    const [createUser, { loading, error }] = useMutation(ADD_USER_MUTATION);
    const handleSubmitUser = async (e: { preventDefault: () => void }) => {

        (!firstname) ? setFirstnameError(true) : setFirstnameError(false);
        (!lastname) ? setLastnameError(true) : setLastnameError(false);
        (!email) ? setEmailError(true) : setEmailError(false);
        (!designation) ? setDesignationError(true) : setDesignationError(false);
        (!education) ? setEducationError(true) : setEducationError(false);
        (!hobbies) ? setHobbiesError(true) : setHobbiesError(false);
        (!extn) ? setExtnError(true) : setExtnError(false);

        if (firstnameError == true || lastnameError == true || emailError == true || designationError == true || educationError == true || hobbiesError == true || extnError == true) {
            return;
        }

        console.log('Submit');
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        try {
            console.log('Try to submit')
            console.log('firstname', firstname)
            console.log('lastname', lastname)
            console.log('email', email)
            console.log('extn', extn)
            console.log('status', status)
            const { data } = await createUser({
                variables: {
                    createUserInput: {
                        firstname: firstname,
                        lastname: lastname,
                        officialemail: email,
                        designation: designation,
                        education: education,
                        gender: gender,
                        extn: extn,
                        hobbies: hobbies,
                        status: status
                    },
                },
            });

            setFirstname('');
            setLastname('');
            setEmail('');
            setEducation('');
            setDesignation('');
            setGender('');
            setHobbies('');
            setStatus('');

            setshowSuccessMessage(true);
            setshowErrorMessage(false);

            console.log('showSuccessMessage', showSuccessMessage);
            console.log('response', data.createUser);
            // console.log('response', response.data);
        } catch (error) {
            setshowErrorMessage(true);

            console.log('catchError', error);
        }
        // console.log(category);
        setUser("");

    };
    return (
        <div className="w-full relative items-center space-x-3 rounded-lg border border-gray-300 bg-white lg:px-6 px-4 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
            {showSuccessMessage && (
                <Alert message="New Joinee Added Successfully!" />
            )}
            {showErrorMessage && (
                <Alert message="Something went wrong!" />
            )}
            <div className="mx-auto max-w-7xl lg:px-4  px-2 py-2">
                <div className="rounded-t lg:mb-4 mb-2 px-0 lg:px-1 py-2 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h2 className="text-blueGray-700 text-xl font-semibold">
                                Add New Joinee
                            </h2>
                        </div>
                    </div>
                </div>
                <div className=" mb-4 px-0 lg:px-2 py-2">
                    <form >
                        <div className="space-y-2">
                            <div className="pb-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstname"
                                                value={firstname}
                                                onChange={(e) => setFirstname(e.target.value)}
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="First Name"
                                            />
                                            {firstnameError && <p className="text-red-500 text-xs" >*First Name is required</p>}

                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastname"
                                                value={lastname}
                                                onChange={(e) => setLastname(e.target.value)}
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Last Name"
                                            />
                                            {lastnameError && <p className="text-red-500 text-xs" >*Last Name is required</p>}

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
                                                            id="1"
                                                            name="notification-method"
                                                            type="radio"
                                                            value={gender}
                                                            onChange={() => setGender('female')}
                                                            defaultChecked // Corrected condition
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Female" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Female
                                                        </label>
                                                    </div>
                                                    <div key="2" className="flex items-center">
                                                        <input
                                                            id="2"
                                                            name="notification-method"
                                                            value={gender}
                                                            onChange={(e) => setGender('male')}
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="Male" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                            Male
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Designation
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                value={designation}
                                                onChange={(e) => setDesignation(e.target.value)}
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Designation"
                                            />
                                            {designationError && <p className="text-red-500 text-xs" >*Designation is required</p>}

                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Official Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Official Email"
                                            />
                                            {emailError && <p className="text-red-500 text-xs" >*Official Email is required</p>}

                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Education
                                            </label>
                                            <input
                                                type="text"
                                                name="education"
                                                value={education}
                                                onChange={(e) => setEducation(e.target.value)}
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Education"
                                            />
                                            {educationError && <p className="text-red-500 text-xs" >*Education is required</p>}

                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Extension Number
                                            </label>
                                            <input
                                                type="number"
                                                name="extensionnumber"
                                                value={extn}
                                                onChange={(e) => setExtn(parseInt(e.target.value, 3))}
                                                id="email"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Extension Number"
                                            />
                                            {extnError && <p className="text-red-500 text-xs" >*Extension Number is required</p>}

                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-1">
                                    <div className="col-span-1">
                                        <textarea
                                            name="hobbies"
                                            id="comment"
                                            value={hobbies}
                                            onChange={(e) => setHobbies(e.target.value)}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                            placeholder="Hobbies"
                                        />
                                        {hobbiesError && <p className="text-red-500 text-xs" >*Hobbies is required</p>}

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" items-center">
                            <button

                                type="button"
                                onClick={handleSubmitUser}

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
