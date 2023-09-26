import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { GET_ForgotPassword } from "@/graphql/User/queries";
import { ApolloError, useMutation, useQuery } from "@apollo/client";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [errorr, setError] = useState<unknown | any>(null);
  const [errorr1, setError1] = useState<unknown | any>(null);
  const [show, setShow] = useState<boolean>(false);
  const [otplogin, setOtplogin] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSentMessage, setEmailSentMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const [sendEmailToUser, { data, error }] = useMutation(GET_ForgotPassword);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError(false);
    setError1(false);
    setLoading(true); // Set loading to true when sending the email

    if (!email) {
      setError("Please fill in email");
      setLoading(false); // Set loading to false on error
      return;
    }

    try {
      const template = "Forget Password";
      const { data } = await sendEmailToUser({
        variables: { email, template },
      });
      console.log("API Response:", data);
      if (data && data.sendEmailToUser === "Email sent successfully") {
        console.log("inside if", data.sendEmailToUser)
        setEmailSent(true);
        setEmailSentMessage("Email sent successfully");
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        console.log(error);
        const errorMessage = error.message;
        console.error("ApolloError: ", errorMessage);
        setError1(errorMessage);
      } else {
        console.error("An error occurred:", error);
      }
    }
    setLoading(false); // Set loading to false after API call
  };

  const handleOtplogin = () => {
    setOtplogin(true);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black ">
      <div className="flex justify-center items-center pt-20 ">
        <Image
          className="h-12 sm:h-16 md:h-20"
          width="100"
          height="100"
          src="/images/happiests-logo.svg"
          alt="bookmytime-logo"
        />
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

                  {/* Conditional rendering for loader */}
                  {loading ? (
                     <div className="text-center mt-4 grid place-items-center">
                     <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                   </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 md:space-y-6 rounded"
                      action="#"
                      method="POST"
                    >
                     

                      {errorr1 && <p className="text-red-600">{errorr1}</p>}
                      <div>
                        <div className="mt-2">
                          <input
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            autoComplete="email"
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
                          Continue
                        </button>
                      </div>
                    </form>
                  )}

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
                      <div className=" flex justify-center"></div>
                      <div className="text-center text-gray-600 text-sm">
                        Virtuos Solution Pvt Ltd. © 2023 Version 1.0.0.
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
