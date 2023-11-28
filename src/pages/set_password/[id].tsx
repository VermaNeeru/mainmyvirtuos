import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { GET_ChangePassword } from "@/graphql/User/queries";
import { ApolloError, useMutation, useQuery } from '@apollo/client'

const ForgotPassword = () => {
    const [changePassword, { data, error }] = useMutation(GET_ChangePassword);
    const [password1, setPassword1] = useState<any>("");
    const [password2, setPassword2] = useState<any>("");
    const [errorr, setError] = useState<unknown | any>(null);
    const [errorr1, setError1] = useState<unknown | any>(null);
    const [show, setShow] = useState<boolean>(false);
    const [otplogin, setOtplogin] = useState<boolean>(false);
    const [emailSent, setEmailSent] = useState(false);
    const [emailSentMessage, setEmailSentMessage] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const router = useRouter();
    const { id } = router.query;
    // Check if params.id exists
    if (!id) {
        return (
            <div className="h-screen flex justify-center items-center">
                <p>Incorrect URL</p>
            </div>
        );
    }
    
    console.log(id); // Use 'id' directly
    const resetKey = id.toString();



    // console.log("GraphQL Query:", GET_ForgotPassword?.loc?.source?.body);
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        console.log("i am clicked")
        event.preventDefault();
        setError(false);
        setError1(false);
        setLoading(true); // Set loading to true when sending the email
        if (!password1 && !password2) {
            // console.log("Please fill in both the fields")
            setError('Please fill in both the fiels');
            setLoading(false); // Set loading to false on error
            return;
        }
        // Check if passwords match
        if (password1 !== password2) {
            // console.log("New Password and Confirm Password do not match")
            setError("New Password and Confirm Password do not match ");
            setLoading(false);
            return;
        }
        try {
            // const key=router.query.id;
            // const resetKey = key.toString();
            const newPassword = password1.toString(); // Convert to string
            console.log(typeof (newPassword), typeof (resetKey));
            console.log(resetKey)
            const { data } = await changePassword({
                variables: { resetKey, newPassword },
            });
            console.log('API Response:', data);
            if (data && data.changePassword === "Password changed successfully") {
                console.log(data.changePassword)
                setEmailSent(true);
                setEmailSentMessage("Password changed successfully");
                router.push('/login');
            }
        } catch (error) {
            if (error instanceof ApolloError) {
                // Handle GraphQL errors here
                console.log(error);
                const errorMessage = error.message; // This will contain the error message from the server
                // console.error('ApolloError: ', errorMessage); // Log the error for debugging
                setError1(errorMessage);
                // You can then display this error message to the user or handle it as needed
                // For example, set it in your component's state to display in the UI
            } else {
                // Handle other types of errors (e.g., network errors)
                console.error('An error occurred:', error);
                // Display a generic error message or handle it accordingly
            }
        }
        setLoading(false); // Set loading to false after API call
        // setUsername("");
        // setPassword("");
    };

    const handleOtplogin = () => {
        setOtplogin(true);
    };
    return (
        // <div className="h-screen bg-gradient-to-r from-[rgb(22,37,45)] to-[#228788] flex flex-col justify-around ">
        <div className="h-screen bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black ">
            <div className="flex justify-center items-center pt-20 ">
                <Image className="h-12 sm:h-16 md:h-20" width="100" height="100" src="/images/happiests-logo.svg" alt="bookmytime-logo" />
            </div>

            <div className="flex justify-center w-full gap-4">

                <div className="w-full  ">
                    {!otplogin ? (
                        <div className="flex h-full  flex-1 flex-col justify-center px-6 py-3 md:px-0 md:py-0">
                            <div className="lg:mt-8 sm:mx-auto sm:w-full sm:max-w-[450px]">

                                <div className="bg-gray-50 rounded px-6 py-10 shadow sm:rounded-lg sm:px-12">
                                    <p className="text-xl font-semibold text-center text-sky-900">
                                        Change Your Password
                                    </p>
                                    {/* <p>ID from url: {id}</p> */}
                                    {emailSent && (
                                        <div className="bg-green-200 text-green-800 p-2 rounded mt-4 flex justify-between">
                                            <div>{emailSentMessage}</div>
                                            <button
                                                onClick={() => {
                                                    setEmailSent(false);
                                                    setEmailSentMessage(""); // Clear the message
                                                }}
                                                className="text-red-500 hover:text-red-700 focus:outline-none"
                                            >
                                                X
                                            </button>
                                        </div>
                                    )}

                                    {
                                        loading ? (
                                            <div className="text-center mt-4 grid place-items-center">
                                                <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                                            </div>
                                        ) :
                                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 rounded" action="#" method="POST">
                                                {errorr && <p className="text-red-600">{errorr}</p>} {/* Display error message */}
                                                <div>
                                                    <div className="mt-2">
                                                        <input
                                                            placeholder="New Password"
                                                            id="password1"
                                                            name="password1"
                                                            value={password1}
                                                            onChange={(e) => setPassword1(e.target.value)}
                                                            type="password"
                                                            autoComplete="password1"
                                                            // required
                                                            className="block px-2 w-full rounded-md border-0 py-1.5 font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                                        />
                                                        {error && <p className="text-red-600">{errorr}</p>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="mt-2">
                                                        <input
                                                            placeholder="Confirm Password"
                                                            id="password2"
                                                            name="password2"
                                                            value={password2}
                                                            onChange={(e) => setPassword2(e.target.value)}
                                                            type="password"
                                                            autoComplete="password2"
                                                            // required
                                                            className="block px-2 w-full rounded-md border-0 py-1.5 font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                                        />
                                                        {error && <p className="text-red-600">{errorr}</p>}
                                                    </div>
                                                </div>


                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="flex w-full justify-center rounded-md bg-[rgb(25,61,68)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </form>
                                    }
                                    {/* <div className="flex items-center justify-between mt-4">
                                        <div className="text-sm leading-6">
                                            <Link href="/login">
                                                <span className="font-semibold text-[rgb(45,115,128)] hover:text-[rgb(22,37,45)]">
                                                    Back to Login
                                                </span>
                                            </Link>

                                        </div>

                                    </div> */}


                                    <div className="mt-4">
                                        <div className="flex flex-col gap-1">
                                            <div className=" flex justify-center">
                                                {/* <Image src={virtuoslogo} alt="Virtuos-Logo" /> */}
                                            </div>
                                            <div className="text-center text-gray-600 text-sm">
                                                Virtuos Solution Pvt Ltd. © 2023
                                                Version 1.0.0.
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>

            </div>


        </div>
    );
};

export default ForgotPassword;