import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
// import { PageWithLayout } from "../types/PageWithLayout";
// import bodyimg from "./images/book-my-time-img.svg";
// import googleicon from "./images/google-color-icon.png"
// import virtuoslogo from "./images/virtuos-virtuez-logo.svg";
// import headerlogo from "./images/book-my-time-logo.svg";
import Link from "next/link";
import { NextPage } from "next";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
// import OtpLogin from "@components/Otplogin/otplogin";
// import headerlogo from "images/happiests-logo.svg";
const ForgotPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<any>("");
    const [error, setError] = useState<unknown | any>(null);
    const [show, setShow] = useState<boolean>(false);
    const [otplogin, setOtplogin] = useState<boolean>(false);
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

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
                                    <p className="text-sm font-semibold text-center text-sky-900">
                                        Fill in to get your Password
                                    </p>
                                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 rounded" action="#" method="POST">
                                        <div>
                                            <div className="mt-2">
                                                <input
                                                    placeholder="Email"
                                                    id="email"
                                                    name="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                    type="email"
                                                    autoComplete="email"
                                                    // required
                                                    className="block px-2 w-full rounded-md border-0 py-1.5 font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>


                                        <div>
                                            <button
                                                type="submit"
                                                className="flex w-full justify-center rounded-md bg-[rgb(25,61,68)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </form>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="text-sm leading-6">
                                            <Link href="/login">
                                                <span className="font-semibold text-[rgb(45,115,128)] hover:text-[rgb(22,37,45)]">
                                                    Back to Login
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
                                                © Virtuos Digital Ltd. Virtuez Assimilations. All rights reserved.
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