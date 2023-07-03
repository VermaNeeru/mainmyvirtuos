import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    {
        name: 'Activity',
        icon: UsersIcon,
        current: false,
        children: [
            { name: 'Activity Stream', href: '/activity' },
        ],
    },
    {
        name: 'Attendance',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'My Attendance', href: '/current_month_attendance' },
            { name: 'All Attendance', href: '/all_attendance' },
            { name: 'Upload Attendance Sheet', href: '/attendance' },
        ],
    },
    {
        name: 'Leaves',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Leave Balance', href: '/leave_calendar' },
            { name: 'My Leave Balance', href: '/my_leaves' },
            { name: 'New Leave Request', href: '/new_leave' },
            { name: 'My Leave Status', href: '/leave_list' },
            { name: 'My Leave Calendar', href: '/my_leave_calendar' },
            { name: 'My WFH/SL Status', href: '/wfh' },
            { name: 'New WFH/SL Request', href: '/add_wfh' },

        ],
    },
    {
        name: 'Approval Section',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'All WFH/Short Leaves', href: '/current_month_wfh' },
            { name: 'All Leaves', href: '/all_leaves' },
        ],
    },
    {
        name: 'Travel',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'My Travel', href: '/travel' },
            { name: 'New Travel Request', href: '/add_travel_req' },

        ],
    },
    {
        name: 'Expense',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Other Expense', href: '/user_advance_list' },
            { name: 'New Travel Request', href: '/add_travel_req' },
            { name: 'Add Travel Expenses', href: '/add_travel_expenses' },

        ],
    },
    {
        name: 'Documents',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Upload New Document', href: '/add_document' },
            { name: 'My Official Documents', href: '/my_document' },
            { name: 'Uploaded Document List', href: '/document' },
            { name: 'My Payslips', href: '/my_payroll' },
            { name: 'Public Documents', href: '/public_document' },

        ],
    },
    {
        name: 'Google Apps',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'My Calendar', href: '/google_calendar' },
            { name: 'My Drive', href: '/googledrive' },

        ],
    },
    {
        name: 'Gallery',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'View Gallery', href: '/view_gallery' },
            { name: 'Manage Category', href: '/' },
            { name: 'Upload Images', href: '/' },
            { name: 'Manage Gallery', href: '/' },

        ],
    },
    {
        name: 'Idea',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'My Ideas', href: '/idea' },
            { name: 'Add New Idea', href: '/add_idea' },
        ],
    },

    {
        name: 'Issues',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'My Issues', href: '/issue' },
            { name: 'Add New Issue', href: '/add_issue' },
            { name: 'All Issues', href: '/issue_list' },
        ],
    },

    {
        name: 'Important Links',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Company Directory', href: '/extension_list' },
            { name: 'Holiday Calendar', href: '/holiday_list' },
            { name: 'Manage Holiday Calendar', href: '/' },
            { name: 'Official Requirements', href: '/weblink' },
            { name: 'Employee Referral', href: '/employee_referral' },
            { name: 'All Referral', href: '/' },
            { name: 'All official Requirements', href: '/' },
            { name: 'Tutorial Referral', href: '/' },
            { name: 'Tutorial Myvirtuos', href: '/' },
        ],
    },

    {
        name: 'Personal Information',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Basic Info', href: '/edit_user' },
            { name: 'Training', href: '/' },
        ],
    },

    {
        name: 'FAQ',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'FAQ', href: '/view_faq' },
        ],
    },

    {
        name: 'Reports',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Other Expense Report', href: '/' },
            { name: 'Asset Report', href: '/' },
            { name: 'Attendance Report', href: '/' },
            { name: 'Issue Report', href: '/' },
            { name: 'Leave Report', href: '/' },
        ],
    },

    {
        name: 'Settings',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Manage Asset Status', href: '/' },
            { name: 'Manage Asset Model', href: '/' },
            { name: 'Manage Manufacturer', href: '/' },
            { name: 'Manage Company', href: '/' },
            { name: 'Manage Suppliers', href: '/' },
            { name: 'Manage Asset Category', href: '/' },
        ],
    },

    {
        name: 'Assets',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Licenses', href: '/' },
            { name: 'Asset List', href: '/' },
            { name: 'Accessories List', href: '/' },
            { name: 'Consumables List', href: '/' },
            { name: 'Asset Inventory', href: '/' },
        ],
    },


    {
        name: 'List of Employee',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Add New Employee', href: '/' },
            { name: 'Employee List', href: '/' },
            { name: 'OTE Availed', href: '/' },
        ],
    },


    // {
    //     name: '',
    //     icon: FolderIcon,
    //     current: false,
    //     children: [
    //         { name: '', href: '/' },
    //     ],
    // },

    // { name: 'Layoutold', href: '/layoutold', icon: CalendarIcon, current: false },
    // { name: 'Documents', href: '/', icon: DocumentDuplicateIcon, current: false },
    // { name: 'Reports', href: '/', icon: ChartPieIcon, current: false },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Testing() {
    return (
        <div className="flex grow flex-col gap-y-5 overflow-y-auto no-scrollbar bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center">
                <Image
                    className="h-10 w-20 ml-16"
                    src="https://myvirtuos.com/assets/images/happiests-logo_white.svg"
                    alt="Your Company"
                    height={100}
                    width={100}
                />
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    {!item.children ? (
                                        <a
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                            )}
                                        >
                                            <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                                            {item.name}
                                        </a>
                                    ) : (
                                        <Disclosure as="div">
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-gray-800 text-white'
                                                                : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                            'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-400'
                                                        )}
                                                    >
                                                        <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                                                        {item.name}
                                                        <ChevronRightIcon
                                                            className={classNames(
                                                                open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                                                'ml-auto h-5 w-5 shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                        {item.children.map((subItem) => (
                                                            <li key={subItem.name}>
                                                                {/* 44px */}
                                                                <Disclosure.Button
                                                                    as="a"
                                                                    href={subItem.href}
                                                                    className={classNames(
                                                                        subItem.current ? 'bg-gray-800' : 'text-gray-150 hover:bg-gray-800',
                                                                        'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
                                                                    )}
                                                                >
                                                                    {subItem.name}
                                                                </Disclosure.Button>
                                                            </li>
                                                        ))}
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </li>
                    {/* <li className="-mx-6 mt-auto">
                        <a
                            href="#"
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                        >
                            <Image
                                className="h-8 w-8 rounded-full bg-gray-50"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true">Tom Cook</span>
                        </a>
                    </li> */}
                </ul>
            </nav>
        </div>
    )
}
