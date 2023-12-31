/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import LayoutPro from '@/pages/LayoutPro'
import Footer from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import UnsetAllCookiesAndRedirect from './UnsetAllCookiesAndRedirect'
import { UseCookies } from './UseCookies'
import { getUserData } from './UserData'
// import UserData from './UserData'
// import jwt_decode from "jwt-decode";

interface JwtToken {
    firstname: string;
    // Add other properties as needed
}

function handleSignout() {
    // Remove the authToken cookie
    Cookies.remove('authToken'); // Replace 'authToken' with your actual cookie name
}
const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    {
        name: 'Teams',
        icon: UsersIcon,
        current: false,
        children: [
            { name: 'Engineering', href: '#' },
            { name: 'Human Resources', href: '#' },
            { name: 'Customer Success', href: '#' },
        ],
    },
    { name: 'Neeru', href: '/neeru', icon: UsersIcon, current: false },
    { name: 'Layout', href: 'layoutold', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]
const userNavigation = [
    { name: 'Your profile', href: '/profile' },
    { name: 'Sign out', href: '/login' },
]

const userNotification = [
    { name: '3 Leaves pending', href: '/leave' },
    { name: 'Birthday', href: '/' },
    { name: 'Work Anniversary', href: '/' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }: any) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [user, setUser] = useState()

    // const [authToken, setAuthToken, removeAuthToken] = UseCookies('authToken');
    // console.log('AuthToken:', authToken);
    // const decoded = jwt_decode(authToken);
    // console.log('decoded', JSON.stringify(decoded));

    const userData = getUserData();
    console.log('userData', userData);

    // useEffect(() => {
    //     setUser(userData)
    // }, [userData])
    const handleChildStateChange = (dataFromChild: boolean | ((prevState: boolean) => boolean)) => {
        setSidebarOpen(dataFromChild);
    };

    const handleLogout = () => {
        // Perform your logout logic here

        // Unset all cookies
        UnsetAllCookiesAndRedirect();

        // Redirect or perform other actions after logout
        // ...
    };
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    {/* <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10"> */}

                                    <nav className="flex flex-1 flex-col">
                                        {/* <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-gray-800 text-white'
                                                                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li>
                                                    <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                        {teams.map((team) => (
                                                            <li key={team.name}>
                                                                <a
                                                                    href={team.href}
                                                                    className={classNames(
                                                                        team.current
                                                                            ? 'bg-gray-800 text-white'
                                                                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                                        {team.initial}
                                                                    </span>
                                                                    <span className="truncate">{team.name}</span>
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li className="mt-auto">
                                                    <a
                                                        href="#"
                                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                                    >
                                                        <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                        Settings
                                                    </a>
                                                </li>
                                            </ul> */}
                                        <LayoutPro onStateChange={handleChildStateChange} />
                                    </nav>
                                    {/* </div> */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <LayoutPro onStateChange={handleChildStateChange} />

                </div>

                <div className="lg:pl-72">
                    {/* <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"> */}
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-top-header px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6 text-gray-200" aria-hidden="true" />
                        </button>

                        {/* Separator */}
                        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form className="relative flex flex-1" action="#" method="GET">
                                {/* <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <MagnifyingGlassIcon
                                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <input
                                    id="search-field"
                                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                    placeholder="Search..."
                                    type="search"
                                    name="search"
                                /> */}
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                {/* <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button> */}

                                {/* Separator */}

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                        <BellIcon className="h-6 w-6 text-white" aria-hidden="true" />

                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-64 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <span className='px-2 py-2 text-red-700'>You have {userNotification.length} notification</span>

                                            {userNotification.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-50' : '',
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                            )}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                {/* Separator */}
                                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                                {/* Profile dropdown */}
                                {
                                    userData &&

                                    <Menu as="div" className="relative">
                                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                            <span className="sr-only">Open user menu</span>
                                            <Image
                                                src="https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png"
                                                alt=""
                                                width={100}
                                                height={100}
                                                className="h-8 w-8 rounded-full bg-gray-50"
                                                loader={({ src }) => `${src}`}
                                            />
                                            <span className="hidden lg:flex lg:items-center">
                                                <span className="ml-4 text-sm font-semibold leading-6 text-white" aria-hidden="true">
                                                    {/* Tom Cook */}
                                                    {userData?.firstname}
                                                </span>
                                                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-3.5 lg:-mr-8 -mr-4 w-72 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                                {/* {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-50' : '',
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                            )}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))} */}
                                                <div className="flex flex-1 flex-col p-8 text-center bg-top-header">
                                                    <Image loader={({ src }) => `${src}`} height={100} width={100} className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="https://myvirtuos.com/uploads/profile/medium_thumb/User_No-Frame_mediumthumb.png" alt="" />
                                                    <h3 className="mt-4 text-sm font-medium text-gray-200">{userData?.firstname} {userData?.lastname}</h3>
                                                    <dl className="mt-1 flex flex-grow flex-col justify-between -pb-2">
                                                        <dd className="text-sm text-gray-300">Member since 16 Sep 2021</dd>

                                                    </dl>
                                                </div>
                                                <div className="flex flex-1 flex-col -mt-2 mb-2 text-center">
                                                    <h3 className="mt-6 text-sm text-gray-900">{userData?.role}</h3>
                                                </div>
                                                <div>
                                                    <div className="-mt-px flex divide-x divide-gray-200">
                                                        <div className="flex w-0 flex-1">
                                                            <Link href="/profile" className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                                            >
                                                                <span>Profile</span>
                                                            </Link>
                                                        </div>
                                                        <div className="-ml-px flex w-0 flex-1">
                                                            <Link href="/login" onClick={handleLogout} className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                                            >
                                                                <span>Signout</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                }

                            </div>

                        </div>
                    </div>

                    <main className="py-6 ">
                        <div className="px-2 sm:px-6 lg:px-4 mb-16 " >{children}</div>

                    </main>
                    {/* <div className=' absolute inset-x-0 bottom-0 h-16  ml-72 mb-0'>
                       
                    </div> */}

                    <Footer />

                </div >

            </div >
        </>
    )
}
function jwt_decode(token: any) {
    throw new Error('Function not implemented.')
}

