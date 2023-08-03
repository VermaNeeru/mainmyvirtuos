import React, { Fragment, useState, useRef, useEffect } from 'react'

import { ExclamationTriangleIcon, BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, EnvelopeIcon, MinusSmallIcon, PlusSmallIcon, UserIcon } from '@heroicons/react/20/solid'
import Alert from '@/components/Alert';
import Image from 'next/image';
import StateSearch from '@/components/StateSearch';
import DatePickerComp from '@/components/DatePickerComp/DatePickerComp';
import AddFamily from '@/components/AddFamily';
import { Disclosure } from '@headlessui/react'
import ProgramSearch from '@/components/BasicInfo/ProgranSearch';
import ProjectSearch from '@/components/BasicInfo/ProjectSearch';
import SkillSearch from '@/components/BasicInfo/SkillSearch';
import AddLanguage from '@/components/BasicInfo/AddLanguage';
import AddCertificate from '@/components/BasicInfo/AddCertificate';
import AddEducation from '@/components/BasicInfo/AddEducation';
import AddWorkExp from '@/components/BasicInfo/AddWorkExp';

export default function AllLeaves() {
    const [openTab, setOpenTab] = useState<number>(1);
    const [openTabFamily, setOpenTabFamily] = useState<number>(1);

    const [leavedetail, setLeaveDetail] = useState(false)
    const [addSkills, setAddSkills] = useState(false)

    const cancelButtonRef = useRef(null)

    const [showUpdateMessage, setshowUpdateMessage] = useState(false);
    const [showDeleteMessage, setshowDeleteMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('update', showUpdateMessage)
            console.log('delete', showDeleteMessage)
            setshowUpdateMessage(false);
            setshowDeleteMessage(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [showUpdateMessage, showDeleteMessage]);
    function setUpdateAlert(arg0: string): void {
        throw new Error('Function not implemented.');
    }

    function setDeleteAlert(arg0: string): void {
        throw new Error('Function not implemented.');
    }

    // For Family Start
    const [listItems, setListItems] = useState(['1']);

    const appendItem = () => {
        const newItem = `${listItems.length + 1}`;
        setListItems([...listItems, newItem]);
    };

    const removeItem = (index: number) => {
        if (listItems.length > 1) {
            const updatedList = listItems.filter((item, i) => i !== index);

            setListItems(updatedList);
        }
    };
    // For Family End 

    // For Certification Start
    const [listCItems, setListCItems] = useState(['1']);

    const appendCItem = () => {
        const newItem = `${listCItems.length + 1}`;
        setListCItems([...listCItems, newItem]);
    };

    const removeCItem = (index: number) => {
        const updatedList = listCItems.filter((item, i) => i !== index);
        setListCItems(updatedList);
    };
    // For Certification End 

    // For Language Start
    const [listLItems, setListLItems] = useState(['1']);

    const appendLItem = () => {
        const newItem = `${listLItems.length + 1}`;
        setListLItems([...listLItems, newItem]);
    };

    const removeLItem = (index: number) => {
        const updatedList = listLItems.filter((item, i) => i !== index);
        setListLItems(updatedList);
    };
    // For Language End 

    // For Education Start
    const [listEItems, setListEItems] = useState(['1']);

    const appendEItem = () => {
        if (listEItems.length < 2) {
            const newItem = `${listEItems.length + 1}`;
            setListEItems([...listEItems, newItem]);
        }
    };

    const removeEItem = (index: number) => {
        if (listEItems.length > 1) {
            const updatedList = listEItems.filter((item, i) => i !== index);
            setListEItems(updatedList);
        }
    };
    // For Education End 

    // For Education Start
    const [listWEItems, setListWEItems] = useState(['1']);

    const appendWEItem = () => {
        const newItem = `${listWEItems.length + 1}`;
        setListWEItems([...listWEItems, newItem]);

    };

    const removeWEItem = (index: number) => {
        const updatedList = listWEItems.filter((item, i) => i !== index);
        setListWEItems(updatedList);
    };
    // For Education End 


    return (
        <div className=' w-full rounded px-2'>
            {showUpdateMessage && (
                <Alert message="Please select leaves/status to update!" />
            )}
            {showDeleteMessage && (
                <Alert message="Please select leaves to delete!" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Edit User
                        </h2>
                    </div>
                </div>
            </div>
            <div>
                <div className="lg:w-full ">
                    <ul
                        className="h-12 isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs"
                        role="tablist"
                    >
                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white lg:px-4 px-1 text-center lg:text-sm text-xs font-medium hover:bg-gray-50 focus:z-10">
                            <a
                                className={
                                    "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
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
                                <p className="font-normal text-base">Basic Information</p>
                            </a>
                        </li>
                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white lg:px-4 px-1 text-center lg:text-sm text-xs font-medium hover:bg-gray-50 focus:z-10">
                            <a
                                className={
                                    "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
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
                                <p className="font-normal text-base">Family Inforamtion</p>
                            </a>
                        </li>
                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white lg:px-4 px-1 text-center lg:text-sm text-xs font-medium hover:bg-gray-50 focus:z-10">
                            <a
                                className={
                                    "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                    (openTab === 3
                                        ? "border-indigo-500 text-indigo-600 "
                                        : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                <p className="font-normal text-base">Qualificaiton</p>
                            </a>
                        </li>
                    </ul>
                    <ul
                        className="h-12 isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs"
                        role="tablist"
                    >
                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white lg:px-4 px-1 text-center lg:text-sm text-xs font-medium hover:bg-gray-50 focus:z-10">
                            <a
                                className={
                                    "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                    (openTab === 4
                                        ? "border-indigo-500 text-indigo-600 "
                                        : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(4);
                                }}
                                data-toggle="tab"
                                href="#link4"
                                role="tablist"
                            >
                                <p className="font-normal text-base">Bank Information</p>
                            </a>
                        </li>
                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white lg:px-4 px-1 text-center lg:text-sm text-xs font-medium hover:bg-gray-50 focus:z-10">
                            <a
                                className={
                                    "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                    (openTab === 5
                                        ? "border-indigo-500 text-indigo-600 "
                                        : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(5);
                                }}
                                data-toggle="tab"
                                href="#link5"
                                role="tablist"
                            >
                                <p className="font-normal text-base">Work Experience</p>
                            </a>
                        </li>
                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white lg:px-4 px-1 text-center lg:text-sm text-xs font-medium hover:bg-gray-50 focus:z-10">
                            <a
                                className={
                                    "flex whitespace-nowrap py-2 px-1 text-sm font-medium " +
                                    (openTab === 6
                                        ? "border-indigo-500 text-indigo-600 "
                                        : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(6);
                                }}
                                data-toggle="tab"
                                href="#link6"
                                role="tablist"
                            >
                                <p className="font-normal text-base">Uploads</p>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded mt-6">
                    <div className=" py-3 px-4 flex-auto">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <div className="lg:flex ...">
                                    <div className="lg:w-3/4 ...">
                                        <div className=" mb-4 px-2 py-2">
                                            <form>
                                                <div className="space-y-2">
                                                    <div className="pb-4">
                                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 lg:gap-y-4 gap-y-2">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        First Name
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="First Name"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Middle Name
                                                                    </label>
                                                                    <input
                                                                        type="email"
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
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Last Name"
                                                                    />
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-y-4 gap-y-2">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Password
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Password"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Personal Email *
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Personal Email"
                                                                    />
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
                                                                        <span className="bg-white px-2 text-sm text-indigo-500">Permanent Address</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-4">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Address *
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Address"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Country *
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Country"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-2 lg:gap-y-4 ">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Zip Code *
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Zip Code"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        City *
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="City"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    {/* <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                    State *
                                                                </label> */}
                                                                    <StateSearch heading="State *" />
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-4">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Personal Mobile *
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Personal Mobile"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Home Phone
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Home Phone"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-4">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        DOB (YYYY-MM-DD)*
                                                                    </label>
                                                                    <DatePickerComp />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        PAN *
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="PAN"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Adhaar *
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Adhaar Number"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Passport *
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Passport Number"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        ESIC
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="ESIC"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        UAN
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="UAN"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Blood Group
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Blood Group"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        DOJ(YYYY-MM-DD)
                                                                    </label>
                                                                    <DatePickerComp />
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
                                                                        <span className="bg-white px-2 text-sm text-indigo-500">Emergency Contact *</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-2 lg:gap-y-4">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Name
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Name"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Relation
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Relation"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Phone
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Phone"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Name
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Name"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Relation
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Relation"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Phone
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        placeholder="Phone"
                                                                    />
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
                                                                        <span className="bg-white px-2 text-sm text-indigo-500">Gender + Language Spoken *</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-4">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <fieldset className="mt-4">
                                                                        <div className="space-y-2">
                                                                            <div key="1" className="flex items-center">
                                                                                <input
                                                                                    id="1"
                                                                                    name="notification-method"
                                                                                    type="radio"
                                                                                    defaultChecked
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
                                                                                    type="radio"
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="Male" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    Male
                                                                                </label>
                                                                            </div>

                                                                        </div>
                                                                    </fieldset>
                                                                    <p className="text-sm text-gray-500 mt-2 text-red-600">Please choose Gender</p>

                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <fieldset>
                                                                        <div className="space-y-2">
                                                                            <div className="relative flex items-start">
                                                                                <div className="flex h-6 items-center">
                                                                                    <input
                                                                                        id="Hindi"
                                                                                        aria-describedby="comments-description"
                                                                                        name="Hindi"
                                                                                        type="checkbox"
                                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                    />
                                                                                </div>
                                                                                <div className="ml-3 text-sm leading-6">
                                                                                    <label htmlFor="Hindi" className="font-normal text-gray-700">
                                                                                        Hindi
                                                                                    </label>

                                                                                </div>
                                                                            </div>
                                                                            <div className="relative flex items-start">
                                                                                <div className="flex h-6 items-center">
                                                                                    <input
                                                                                        id="English"
                                                                                        aria-describedby="candidates-description"
                                                                                        name="English"
                                                                                        type="checkbox"
                                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                    />
                                                                                </div>
                                                                                <div className="ml-3 text-sm leading-6">
                                                                                    <label htmlFor="English" className="font-normal text-gray-700">
                                                                                        English
                                                                                    </label>

                                                                                </div>
                                                                            </div>
                                                                            <div className="relative flex items-start">
                                                                                <div className="flex h-6 items-center">
                                                                                    <input
                                                                                        id="Punjabi"
                                                                                        aria-describedby="offers-description"
                                                                                        name="Punjabi"
                                                                                        type="checkbox"
                                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                    />
                                                                                </div>
                                                                                <div className="ml-3 text-sm leading-6">
                                                                                    <label htmlFor="Punjabi" className="font-normal text-gray-700">
                                                                                        Punjabi
                                                                                    </label>

                                                                                </div>
                                                                            </div>
                                                                            <div className="relative flex items-start">
                                                                                <div className="flex h-6 items-center">
                                                                                    <input
                                                                                        id="Other"
                                                                                        aria-describedby="offers-description"
                                                                                        name="Other"
                                                                                        type="checkbox"
                                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                    />
                                                                                </div>
                                                                                <div className="ml-3 text-sm leading-6">
                                                                                    <label htmlFor="Other" className="font-normal text-gray-700">
                                                                                        Other
                                                                                    </label>

                                                                                </div>
                                                                            </div>

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
                                                                        <span className="bg-white px-2 text-sm text-indigo-500">Marital Status *</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <fieldset className="mt-4">
                                                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                                                            <div key="1" className="flex items-center">
                                                                                <input
                                                                                    id="1"
                                                                                    name="notification-method"
                                                                                    type="radio"
                                                                                    defaultChecked
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="Single" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    Single
                                                                                </label>
                                                                            </div>
                                                                            <div key="2" className="flex items-center">
                                                                                <input
                                                                                    id="2"
                                                                                    name="notification-method"
                                                                                    type="radio"
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="Married" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    Married
                                                                                </label>
                                                                            </div>

                                                                        </div>
                                                                    </fieldset>
                                                                    <p className="text-sm text-gray-500 mt-2 text-red-600">Please choose Marital Status</p>

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
                                                                        <span className="bg-white px-2 text-sm text-indigo-500">Any Police Cases</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <fieldset className="mt-4">
                                                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                                                            <div key="1" className="flex items-center">
                                                                                <input
                                                                                    id="1"
                                                                                    name="police_case"
                                                                                    type="radio"
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="Yes" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    Yes
                                                                                </label>
                                                                            </div>
                                                                            <div key="2" className="flex items-center">
                                                                                <input
                                                                                    id="2"
                                                                                    name="police_case"
                                                                                    type="radio"
                                                                                    defaultChecked
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="No" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    No
                                                                                </label>
                                                                            </div>

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
                                                                        <span className="bg-white px-2 text-sm text-indigo-500">Ever Arrested</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <fieldset className="mt-4">
                                                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                                                            <div key="1" className="flex items-center">
                                                                                <input
                                                                                    id="1"
                                                                                    name="ever_arrested"
                                                                                    type="radio"
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="Yes" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    Yes
                                                                                </label>
                                                                            </div>
                                                                            <div key="2" className="flex items-center">
                                                                                <input
                                                                                    id="2"
                                                                                    name="ever_arrested"
                                                                                    type="radio"
                                                                                    defaultChecked
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="No" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    No
                                                                                </label>
                                                                            </div>

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
                                                                        <span className="bg-white px-2 text-sm text-indigo-500">Relatives in Virtuos</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <fieldset className="mt-4">
                                                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                                                            <div key="1" className="flex items-center">
                                                                                <input
                                                                                    id="1"
                                                                                    name="notification-method"
                                                                                    type="radio"
                                                                                    defaultChecked
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="Yes" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    Yes
                                                                                </label>
                                                                            </div>
                                                                            <div key="2" className="flex items-center">
                                                                                <input
                                                                                    id="2"
                                                                                    name="notification-method"
                                                                                    type="radio"
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="No" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    No
                                                                                </label>
                                                                            </div>

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
                                                                        <span className="bg-white px-2 text-sm text-indigo-500">Referred by</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <fieldset className="mt-4">
                                                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                                                            <div key="1" className="flex items-center">
                                                                                <input
                                                                                    id="1"
                                                                                    name="notification-method"
                                                                                    type="radio"
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="Virtuos Employee" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    Virtuos Employee
                                                                                </label>
                                                                            </div>
                                                                            <div key="2" className="flex items-center">
                                                                                <input
                                                                                    id="2"
                                                                                    name="notification-method"
                                                                                    type="radio"
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="Job Portal" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    Job Portal
                                                                                </label>
                                                                            </div>
                                                                            <div key="2" className="flex items-center">
                                                                                <input
                                                                                    id="2"
                                                                                    name="notification-method"
                                                                                    type="radio"
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="Campus" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    Campus
                                                                                </label>
                                                                            </div>
                                                                            <div key="2" className="flex items-center">
                                                                                <input
                                                                                    id="2"
                                                                                    name="notification-method"
                                                                                    type="radio"
                                                                                    defaultChecked
                                                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                />
                                                                                <label htmlFor="Other" className="ml-3 block text-sm font-normal leading-6 text-gray-700">
                                                                                    Other
                                                                                </label>
                                                                            </div>



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
                                                                        <span className="bg-white px-2 text-sm text-indigo-500">Social Links</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        FB Link
                                                                    </label>
                                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="h-4 w-4 text-gray-800"
                                                                                fill="currentColor"
                                                                                viewBox="0 0 24 24">
                                                                                <path
                                                                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                                                            </svg>
                                                                        </div>
                                                                        <input
                                                                            type="email"
                                                                            name="email"
                                                                            id="email"
                                                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                            placeholder="Facebook URL"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        G+ Link
                                                                    </label>
                                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="h-4 w-4 text-gray-800"
                                                                                fill="currentColor"
                                                                                viewBox="0 0 24 24">
                                                                                <path
                                                                                    d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                                                                                    fill-rule="evenodd"
                                                                                    clip-rule="evenodd" />
                                                                            </svg>
                                                                        </div>
                                                                        <input
                                                                            type="email"
                                                                            name="email"
                                                                            id="email"
                                                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                            placeholder="Google Plus Link"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Twitter Link
                                                                    </label>
                                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="h-4 w-4 text-gray-800"
                                                                                fill="currentColor"
                                                                                viewBox="0 0 24 24">
                                                                                <path
                                                                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                                                            </svg>

                                                                        </div>
                                                                        <input
                                                                            type="email"
                                                                            name="email"
                                                                            id="email"
                                                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                            placeholder="Twitter Handle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-1">
                                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                                        Linkedin Link
                                                                    </label>
                                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="h-4 w-4 text-gray-800"
                                                                                fill="currentColor"
                                                                                viewBox="0 0 24 24">
                                                                                <path
                                                                                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                                                            </svg>
                                                                        </div>
                                                                        <input
                                                                            type="email"
                                                                            name="email"
                                                                            id="email"
                                                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                            placeholder="Linkedin URL"
                                                                        />
                                                                    </div>
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
                                                                        <span className="bg-white px-2 text-sm text-indigo-500">Interests / Hobbies</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-y-4 lg:grid-cols-2">

                                                            <div className="sm:col-span-6">
                                                                <textarea
                                                                    rows={2}
                                                                    name="comment"
                                                                    id="comment"
                                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    defaultValue={''}
                                                                    placeholder="Hobbies"
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                        <div className="sm:col-span-1">
                                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-800">
                                                                Attachement
                                                            </label>


                                                            <input
                                                                type="file"
                                                                name="email"
                                                                id="email"
                                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                placeholder="Attachement"
                                                            />
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                        </div>
                                                    </div> */}
                                                    </div>
                                                </div>

                                                <div className=" items-center">
                                                    <button
                                                        type="submit"
                                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Final Submit
                                                    </button>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="lg:w-1/4 ... ">
                                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 text-center sm:grid-cols-1 md:grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-1 xl:grid-cols-1">
                                            <div>
                                                <div className=' border-dashed border-2 border-sky-600 px-2 py-2'>
                                                    <Image loader={({ src }) => `${src}`} width={100} height={100} className="mx-auto h-32 w-32 rounded" src="https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png" alt="" />

                                                </div>
                                                {/* <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-700">person.name</h3>
                                                <p className="text-sm leading-6 text-gray-600">person.role</p> */}
                                                <button className="w-full mt-6 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >Change</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <div className="lg:w-72 -mt-4">
                                    <ul
                                        className="h-10 isolate flex divide-x divide-gray-200" aria-label="Tabs"
                                        role="tablist"
                                    >
                                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white lg:px-4 px-1 text-center lg:text-sm text-xs font-medium hover:bg-gray-50 focus:z-10">
                                            <a
                                                className={
                                                    "flex whitespace-nowrap py-1 px-1 text-sm font-medium " +
                                                    (openTabFamily === 1
                                                        ? "border-indigo-500 text-indigo-600 "
                                                        : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 ")
                                                }
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setOpenTabFamily(1);
                                                }}
                                                data-toggle="tab"
                                                href="#linkfamily1"
                                                role="tablist"
                                            >
                                                <p className="font-normal text-base">Add New</p>
                                            </a>
                                        </li>
                                        <li className=" group relative min-w-0 flex-1 overflow-hidden bg-white lg:px-4 px-1 text-center lg:text-sm text-xs font-medium hover:bg-gray-50 focus:z-10">
                                            <a
                                                className={
                                                    "flex whitespace-nowrap py-1 px-1 text-sm font-medium " +
                                                    (openTabFamily === 2
                                                        ? "border-indigo-500 text-indigo-600 "
                                                        : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700")
                                                }
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setOpenTabFamily(2);
                                                }}
                                                data-toggle="tab"
                                                href="#linkfamily2"
                                                role="tablist"
                                            >
                                                <p className="font-normal text-base">View Family</p>
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded mt-6">
                                    <div className=" py-3 lg:px-4 px-1 flex-auto">
                                        <div className="tab-content tab-space">
                                            <div className={openTabFamily === 1 ? "block" : "hidden"} id="link2">
                                                {listItems.map((item, index) => (
                                                    <div key={index} className='rounded-lg border border-gray-300 px-4 py-2 pb-10 mb-10'>
                                                        <div className='mt-2 text-right'>
                                                            <button onClick={() => removeItem(index)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                                                            ><MinusSmallIcon className="h-6 w-6" />
                                                            </button>
                                                        </div>
                                                        <AddFamily />

                                                    </div>
                                                ))}
                                                <div className='mt-2 text-right'>
                                                    <button onClick={appendItem} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        <PlusSmallIcon className="h-6 w-6" />
                                                    </button>
                                                </div>
                                                <div className='mt-4 text-right'>
                                                    <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Save
                                                    </button>
                                                </div>

                                            </div>
                                            <div className={openTabFamily === 2 ? "block" : "hidden"} id="link2">
                                                View Family
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                <dl className="ml-4 mt-2 space-y-6 divide-y divide-gray-900/10">
                                    <Disclosure as="div" key="1" className="pt-6">
                                        {({ open }) => (
                                            <>
                                                <dt>
                                                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                        <span className="text-base font-semibold leading-7">Programs</span>
                                                        <span className="ml-6 flex h-7 items-center">
                                                            {open ? (
                                                                <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </dt>
                                                <Disclosure.Panel as="dd" className="mt-2 lg:pr-12">
                                                    <div className=' rounded-lg border border-gray-300 bg-white'>
                                                        <div className=" lg:mb-4 px-4 py-2 lg:py-4">
                                                            <div className="mt-2 grid lg:grid-cols-2 grid-cols-1 gap-x-2 gap-y-2">
                                                                <div className="lg:col-span-1">
                                                                    <div className="mt-1">
                                                                        <ProgramSearch />
                                                                    </div>
                                                                </div>
                                                                <div className="lg:col-span-1">
                                                                    <div className="lg:mt-9">
                                                                        <button
                                                                            type="submit"
                                                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                        >
                                                                            Save
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                    <Disclosure as="div" key="2" className="pt-6">
                                        {({ open }) => (
                                            <>
                                                <dt>
                                                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                        <span className="text-base font-semibold leading-7">Projects</span>
                                                        <span className="ml-6 flex h-7 items-center">
                                                            {open ? (
                                                                <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </dt>
                                                <Disclosure.Panel as="dd" className="mt-2 lg:pr-12">
                                                    <div className=' rounded-lg border border-gray-300 bg-white'>
                                                        <div className=" lg:mb-4 px-4 py-2 lg:py-4">
                                                            <div className="mt-2 grid lg:grid-cols-2 grid-cols-1 gap-x-2 gap-y-2">
                                                                <div className="lg:col-span-1">
                                                                    <div className="mt-1">
                                                                        <ProjectSearch />
                                                                    </div>
                                                                </div>
                                                                <div className="lg:col-span-1">
                                                                    <div className="lg:mt-9">
                                                                        <button
                                                                            type="submit"
                                                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                        >
                                                                            Save
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}

                                    </Disclosure>
                                    <Disclosure as="div" key="3" className="pt-6">
                                        {({ open }) => (
                                            <>
                                                <dt>
                                                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                        <span className="text-base font-semibold leading-7">Skills</span>
                                                        <span className="ml-6 flex h-7 items-center">
                                                            {open ? (
                                                                <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </dt>
                                                <Disclosure.Panel as="dd" className="mt-2 lg:pr-12">
                                                    <div className=' rounded-lg border border-gray-300 bg-white'>
                                                        <div className=" mb-4 px-4 py-4">
                                                            <div className="mt-2 grid lg:grid-cols-2 grid-cols-1 gap-x-2 gap-y-2">
                                                                <div className="lg:col-span-1">
                                                                    <p className='text-sm text-red-600'>If skill not found then click Add Additional Skill button to add the skill</p>
                                                                </div>
                                                                <div className="lg:col-span-1 lg:text-right">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setAddSkills(true)}
                                                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                    >
                                                                        Add Additional Skill
                                                                    </button></div>
                                                            </div>
                                                            <div className="mt-2 grid lg:grid-cols-2 grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6">
                                                                <div className="lg:col-span-1">
                                                                    <div className="mt-1">
                                                                        <SkillSearch />
                                                                    </div>
                                                                </div>
                                                                <div className="lg:col-span-1">
                                                                    <div className="lg:mt-9">
                                                                        <button
                                                                            type="submit"
                                                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                        >
                                                                            Save
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}

                                    </Disclosure>
                                    <Disclosure as="div" key="4" className="pt-6">
                                        {({ open }) => (
                                            <>
                                                <dt>
                                                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                        <span className="text-base font-semibold leading-7">Education</span>
                                                        <span className="ml-6 flex h-7 items-center">
                                                            {open ? (
                                                                <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </dt>
                                                <Disclosure.Panel as="dd" className="mt-2 lg:pr-12">
                                                    {listEItems.map((item, index) => (
                                                        <div key={index} className='rounded-lg border border-gray-300 px-4 py-2 pb-10 mb-10'>
                                                            <div className='mt-2 text-right'>
                                                                <button onClick={() => removeEItem(index)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                                                                ><MinusSmallIcon className="h-6 w-6" />
                                                                </button>
                                                            </div>
                                                            <AddEducation />

                                                        </div>
                                                    ))}
                                                    <div className='lg:mt-0 mt-1 text-right'>
                                                        <button onClick={appendEItem} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        >
                                                            Add New Education
                                                        </button>
                                                    </div>
                                                    <div className='lg:mt-4 mt-2 text-right'>
                                                        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}

                                    </Disclosure>
                                    <Disclosure as="div" key="5" className="pt-6">
                                        {({ open }) => (
                                            <>
                                                <dt>
                                                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                        <span className="text-base font-semibold leading-7">Certifications</span>
                                                        <span className="ml-6 flex h-7 items-center">
                                                            {open ? (
                                                                <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </dt>
                                                <Disclosure.Panel as="dd" className="mt-2 lg:pr-12">
                                                    {listCItems.map((item, index) => (
                                                        <div key={index} className='rounded-lg border border-gray-300 px-4 py-2 pb-10 mb-10'>
                                                            <div className='mt-2 text-right'>
                                                                <button onClick={() => removeCItem(index)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                                                                ><MinusSmallIcon className="lg:h-6 lg:w-6 h-2 w-4" />
                                                                </button>
                                                            </div>
                                                            <AddCertificate />

                                                        </div>
                                                    ))}
                                                    <div className='mt-2 text-right'>
                                                        <button onClick={appendCItem} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        >
                                                            Add New Certificate
                                                        </button>
                                                    </div>
                                                    <div className='mt-4 text-right'>
                                                        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}

                                    </Disclosure>
                                    <Disclosure as="div" key="6" className="pt-6">
                                        {({ open }) => (
                                            <>
                                                <dt>
                                                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                        <span className="text-base font-semibold leading-7">Language</span>
                                                        <span className="ml-6 flex h-7 items-center">
                                                            {open ? (
                                                                <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </dt>
                                                <Disclosure.Panel as="dd" className="mt-2 lg:pr-12">
                                                    {listLItems.map((item, index) => (
                                                        <div key={index} className='rounded-lg border border-gray-300 px-4 py-2 pb-10 mb-10'>
                                                            <div className='mt-2 text-right'>
                                                                <button onClick={() => removeLItem(index)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                                                                ><MinusSmallIcon className="h-6 w-6" />
                                                                </button>
                                                            </div>
                                                            <AddLanguage />

                                                        </div>
                                                    ))}
                                                    <div className='mt-2 text-right'>
                                                        <button onClick={appendLItem} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        >
                                                            Add New Language
                                                        </button>
                                                    </div>
                                                    <div className='mt-4 text-right'>
                                                        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>

                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </dl>
                            </div>
                            <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                                <form>
                                    <div className="space-y-2">
                                        <div className="pb-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-4">
                                                <div className="sm:col-span-1">
                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                            Bank Name
                                                        </label>
                                                        <div className="relative mt-2 rounded-md shadow-sm">
                                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </div>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                id="email"
                                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                placeholder="Bank Name"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                            Account Name
                                                        </label>
                                                        <div className="relative mt-2 rounded-md shadow-sm">
                                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </div>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                id="email"
                                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                placeholder="Account Name"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                            Account Holder Name
                                                        </label>
                                                        <div className="relative mt-2 rounded-md shadow-sm">
                                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </div>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                id="email"
                                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                placeholder="Account Holder Name"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                            IFSC code
                                                        </label>
                                                        <div className="relative mt-2 rounded-md shadow-sm">
                                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </div>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                id="email"
                                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                placeholder="IFSC for NEFT/ RTGS"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-1">
                                                <div className="sm:col-span-1">
                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                        <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                            Branch Address
                                                        </label>
                                                        <textarea
                                                            rows={2}
                                                            name="comment"
                                                            id="comment"
                                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={''}
                                                            placeholder="Branch Address"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" items-center">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="submit"
                                            className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Final Submit
                                        </button>

                                    </div>
                                </form>
                            </div>
                            <div className={openTab === 5 ? "block" : "hidden"} id="link4">
                                <div className="mb-2">
                                    <p className=" text-gray-600">Add your work / internship experience for the last 3 Companies</p>
                                    <div className='text-right'>
                                        <button onClick={appendWEItem} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Add New Work
                                        </button>
                                    </div>
                                </div>

                                {listWEItems.map((item, index) => (
                                    <div key={index} className='rounded-lg border border-gray-300 px-4 py-2 pb-10 mb-10'>
                                        <div className='mt-2 text-right'>
                                            <button onClick={() => removeWEItem(index)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                                            ><MinusSmallIcon className="h-6 w-6" />
                                            </button>
                                        </div>
                                        <AddWorkExp />

                                    </div>
                                ))}
                                <div className='mt-4 text-right'>
                                    <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                            <div className={openTab === 6 ? "block" : "hidden"} id="link4">
                                <div className=' rounded-lg border border-gray-300 bg-white'>
                                    <div className=" mb-4 px-4 py-4">
                                        <p className="mt-2 mb-2 text-red-600 text-sm">*Note - Only PDF/DOC/DOCX supported</p>
                                        <div className="mt-2 grid lg:grid-cols-3 grid-cols-1 gap-x-6 gap-y-2">
                                            <div className="sm:col-span-1">
                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-800">
                                                    Attach Resume
                                                </label>
                                                <input
                                                    type="file"
                                                    name="email"
                                                    id="email"
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Attachement"
                                                />
                                            </div>
                                            <div className="sm:col-span-1">
                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-800">
                                                    Attach Medical Certificate
                                                </label>
                                                <input
                                                    type="file"
                                                    name="email"
                                                    id="email"
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Attachement"
                                                />
                                            </div>
                                            <div className="sm:col-span-1">
                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-800">
                                                    Attach Blank Cheque
                                                </label>
                                                <input
                                                    type="file"
                                                    name="email"
                                                    id="email"
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Attachement"
                                                />
                                            </div>

                                        </div>
                                        <div className='mt-4 text-right'>
                                            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <Transition.Root show={leavedetail} as={Fragment}>
                            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setLeaveDetail}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-10 overflow-y-auto">
                                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        >
                                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                                <div className="space-y-2">
                                                    <div className="border-b border-gray-700/10 pb-4">
                                                        <h2 className="text-lg font-semibold leading-7 text-gray-700">  Leave Days</h2>


                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                            <div className="sm:col-span-2">
                                                                <div className="mt-1">
                                                                    <table className="min-w-full divide-y divide-gray-300">
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                No. of Leaves Available
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                -3
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                No. of Leaves Requested
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                1
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                Reason for Applying leave
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                Fever
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                Leave Date
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                June 12th, 2023 (Monday)
                                                                            </td>

                                                                        </tr>
                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                Leave Type
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                Full Day
                                                                            </td>
                                                                        </tr>

                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                Status
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                Approved
                                                                            </td>
                                                                        </tr>

                                                                        <tr key="1">
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                                                                                By
                                                                            </td>
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                                                Amarinder Singh
                                                                            </td>
                                                                        </tr>



                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                                <button
                                                                    type="button"
                                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                    onClick={() => setLeaveDetail(false)}
                                                                    ref={cancelButtonRef}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>





                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>
                        <Transition.Root show={addSkills} as={Fragment}>
                            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setAddSkills}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-10 overflow-y-auto">
                                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        >
                                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                                <div className="space-y-2">
                                                    <div className="pb-4">
                                                        <h2 className="text-lg font-semibold leading-7 text-gray-700">Add Skill</h2>
                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                            <div className="sm:col-span-2">
                                                                <div className="mt-1">
                                                                    <form>
                                                                        <div className="space-y-2">
                                                                            <div className="pb-2">
                                                                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                                                    <div className="sm:col-span-6">
                                                                                        <div className="relative mt-2 rounded-md shadow-sm">
                                                                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                                <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                            </div>
                                                                                            <input
                                                                                                type="text"
                                                                                                name="email"
                                                                                                id="email"
                                                                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                                placeholder="Skill Name.."
                                                                                            />
                                                                                        </div>
                                                                                    </div>


                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                                <button
                                                                    type="submit"
                                                                    className="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                    onClick={() => setAddSkills(false)}
                                                                    ref={cancelButtonRef}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>

                    </div>
                </div>
            </div >

        </div >
    )
}
