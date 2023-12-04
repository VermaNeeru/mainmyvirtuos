import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { NextPage } from "next";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import Cookies from 'js-cookie'; // Import js-cookie
import { GET_Login } from "@/graphql/User/queries";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<any>("");
    const [errorr, setError] = useState<unknown | any>(null);
    const [errorr1, setError1] = useState<unknown | any>(null);
    const [show, setShow] = useState<boolean>(false);
    const [otplogin, setOtplogin] = useState<boolean>(false);


    const [login, { data, error }] = useMutation(GET_Login);
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        console.log('login', event);
        event.preventDefault();
        setError(false);
        setError1(false)
        // Check if username or password is empty
        if (!username || !password) {
            console.log("inside empty if")
            setError('Please fill in both fields.');
            // return;
        }
        try {
            console.log("inside")
            const { data } = await login({
                variables: { username, password },
            });
            console.log(username, password);
            // Extract the token from the API response
            const token = data.login.token;
            console.log("all fine dont  worry")
            console.log('API Response:', data);
            // Store the token in a cookie (you can set an expiration time if needed)
            if (token) {
                Cookies.set('authToken', token);
                router.push('/');

                const decoded = jwtDecode(token);

                console.log(JSON.stringify(decoded));

                // localStorage.setItem('authToken', token);

            }
            // Handle successful login here (e.g., redirect, store tokens, etc.)
        } catch (error) {
            if (error instanceof ApolloError) {
                // Handle GraphQL errors here
                const errorMessage = error.message; // This will contain the error message from the server
                console.error(errorMessage); // Log the error for debugging
                setError1(errorMessage);
                // You can then display this error message to the user or handle it as needed
                // For example, set it in your component's state to display in the UI
            } else {
                // Handle other types of errors (e.g., network errors)
                console.error('An error occurred:', error);
                // Display a generic error message or handle it accordingly
            }
        }
        // setUsername("");
        // setPassword("");
    };

    // const { loading, error, data } = useQuery(GET_Login, {
    //     variables: { username, password },
    //     skip: !username || !password,
    //     onCompleted: (data) => {
    //         // Log the data to the console when the query is completed
    //         console.log('API Data:', data);
    //     },
    // });


    // const handleSubmit = async (event: { preventDefault: () => void }) => {
    //     event.preventDefault();
    //     console.log("i am clicked")
    //     // router.push('/');

    //     console.log("username1:", username);
    //     console.log("password1:", password);

    // };
    const handleOtplogin = () => {
        setOtplogin(true);
    };




    return (
        // <div className="h-screen bg-gradient-to-r from-[rgb(22,37,45)] to-[#228788] flex flex-col justify-around ">
        <div className="h-screen bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black ">

            <div className="flex justify-center items-center pt-6 ">
                <Image className="h-12 sm:h-16 md:h-20" width="100" height="100" src="/images/happiests-logo.svg" alt="bookmytime-logo" />
            </div>

            <div className="flex justify-center w-full gap-4">

                <div className="w-full  ">
                    {!otplogin ? (
                        <div className="flex h-full  flex-1 flex-col justify-center px-6 py-3 md:px-0 md:py-0">
                            <div className="lg:mt-8 sm:mx-auto sm:w-full sm:max-w-[450px]">
                                <div className="bg-gray-50 rounded px-6 py-10 shadow sm:rounded-lg sm:px-12">
                                    <h2 className="text-3xl font-semibold text-center text-sky-900">
                                        Welcome!
                                    </h2>
                                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 rounded" action="#" method="POST">
                                        {errorr1 && <p className="text-red-600">{errorr1}</p>} {/* Display error message */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Username
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="username"
                                                    name="username"
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    value={username}
                                                    type="text"
                                                    autoComplete="email"
                                                    // required
                                                    className="block px-2 w-full rounded-md border-0 py-1.5 font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {error && <p className="text-red-600">{errorr}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                            <div className="mt-2 relative">
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type={show ? "text" : "password"}

                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    autoComplete="current-password"
                                                    // required
                                                    className="block px-2 w-full rounded-md border-0 py-1.5 font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                                />
                                                {password ? (
                                                    <span className="absolute right-2 top-1.5" onClick={() => setShow(!show)}>
                                                        {show ? (
                                                            <EyeSlashIcon className="h-6 w-6 text-gray-700" />
                                                        ) : (
                                                            <EyeIcon className="h-6 w-6 text-gray-700" />
                                                        )}
                                                    </span>
                                                ) : null}
                                            </div>
                                            {error && <p className="text-red-600">{errorr}</p>}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    id="remember-me"
                                                    name="remember-me"
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 "
                                                />
                                                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                                    Remember me
                                                </label>
                                            </div>


                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="flex w-full justify-center rounded-md bg-[rgb(25,61,68)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Sign in
                                            </button>
                                        </div>
                                    </form>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="text-sm leading-6">
                                            <Link href="/forgot_username" >
                                                <span className="font-semibold text-[rgb(45,115,128)] hover:text-[rgb(22,37,45)]">
                                                    Forgot Username?
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="text-sm leading-6">
                                            <Link href="/forgot_password" >
                                                <span className="font-semibold text-[rgb(45,115,128)] hover:text-[rgb(22,37,45)]">
                                                    Forgot Password?
                                                </span>
                                            </Link>

                                        </div>
                                    </div>


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

export default Login;