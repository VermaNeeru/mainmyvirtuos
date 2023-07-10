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
import Link from 'next/link'


const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    {
        name: 'Activity',
        icon: UsersIcon,
        current: false,
        children: [
            { name: 'Activity Stream', href: '/activity', current: false },
        ],
    },
    {
        name: 'Attendance',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'My Attendance', href: '/current_month_attendance', current: false },
            { name: 'All Attendance', href: '/all_attendance', current: false },
            { name: 'Upload Attendance Sheet', href: '/attendance', current: false },
        ],
    },
    {
        name: 'Leaves',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Leave Callendar', href: '/leave_calendar', current: false },
            { name: 'My Leave Balance', href: '/my_leaves', current: false },
            { name: 'New Leave Request', href: '/leave', current: false },
            { name: 'My Leave Status', href: '/leave_list', current: false },
            { name: 'My Leave Calendar', href: '/my_leave_calendar', current: false },
            { name: 'My WFH/SL Status', href: '/wfh', current: false },
            { name: 'New WFH/SL Request', href: '/add_wfh', current: false },

        ],
    },

    {
        name: 'Approval Section',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'All Travel Request', href: '/accounts_travel', current: false },
            { name: 'All other advance', href: '/all_user_advance_list', current: false },
            { name: 'Subordinate other advance', href: '/subordinate_user_advance_list', current: false },
            { name: 'Subordinate WFH/Short Leaves', href: '/subordinate_wfh', current: false },
            { name: 'All WFH/Short Leaves', href: '/current_month_wfh', current: false },
            { name: 'Other WFH/Short Leaves', href: '/other_wfh', current: false },
            { name: 'Subordinate Leaves', href: '/all_subordinateleaves', current: false },
            { name: 'All travel Expenses', href: '/all_expense_list', current: false },
            { name: 'Subordinate travel Request', href: '/all_travel_request', current: false },
            { name: 'All Leaves', href: '/all_leaves', current: false },
        ],
    },

    {
        name: 'Travel',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'My Travel', href: '/travel', current: false },
            { name: 'New Travel Request', href: '/add_travel_req', current: false },

        ],
    },
    {
        name: 'Expense',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Other Expense', href: '/user_advance_list', current: false },
            { name: 'New Travel Request', href: '/add_travel_req', current: false },
            { name: 'Add Travel Expenses', href: '/travel', current: false },

        ],
    },
    {
        name: 'Documents',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Upload New Document', href: '/add_document', current: false },
            { name: 'My Official Documents', href: '/my_document', current: false },
            { name: 'Uploaded Document List', href: '/document', current: false },
            { name: 'Shared Document', href: '/admin_document_list', current: false },
            { name: 'My Payslips', href: '/my_payroll', current: false },
            { name: 'Public Documents', href: '/public_document', current: false },

        ],
    },
    {
        name: 'Google Apps',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'My Calendar', href: '/google_calendar', current: false },
            { name: 'My Drive', href: '/googledrive', current: false },

        ],
    },
    {
        name: 'Gallery',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'View Gallery', href: '/view_images', current: false },
            { name: 'Manage Category', href: '/gallery', current: false },
            { name: 'Upload Images', href: '/upload_images', current: false },
            { name: 'Manage Gallery', href: '/manage_gallery', current: false },

        ],
    },
    {
        name: 'Idea',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'My Ideas', href: '/idea', current: false },
            { name: 'Add New Idea', href: '/add_idea', current: false },
        ],
    },

    {
        name: 'Issues',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'My Issues', href: '/issue', current: false },
            { name: 'Add New Issue', href: '/add_issue', current: false },
            { name: 'All Issues', href: '/all_issues', current: false },
        ],
    },

    {
        name: 'Important Links',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Company Directory', href: '/extension_list', current: false },
            { name: 'Holiday Calendar', href: '/holiday_list', current: false },
            { name: 'Manage Holiday Calendar', href: '/holiday', current: false },
            { name: 'Official Requirements', href: '/weblink', current: false },
            { name: 'Employee Referral', href: '/employee_referral', current: false },
            { name: 'All Referral', href: '/all_referrals', current: false },
            { name: 'All official Requirements', href: '/all_requisitions', current: false },
            { name: 'Tutorial Referral', href: '/', current: false },
            { name: 'Tutorial Myvirtuos', href: '/tutorial', current: false },
        ],
    },

    {
        name: 'Personal Information',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Basic Info', href: '/edit_user', current: false },
            { name: 'Training', href: '/', current: false },
        ],
    },

    {
        name: 'FAQ',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'FAQ', href: '/', current: false },
        ],
    },

    {
        name: 'Reports',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Other Expense Report', href: '/', current: false },
            { name: 'Asset Report', href: '/', current: false },
            { name: 'Attendance Report', href: '/', current: false },
            { name: 'Issue Report', href: '/', current: false },
            { name: 'Leave Report', href: '/', current: false },
        ],
    },

    {
        name: 'Settings',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Manage Asset Status', href: '/', current: false },
            { name: 'Manage Asset Model', href: '/', current: false },
            { name: 'Manage Manufacturer', href: '/', current: false },
            { name: 'Manage Company', href: '/', current: false },
            { name: 'Manage Suppliers', href: '/', current: false },
            { name: 'Manage Asset Category', href: '/', current: false },
        ],
    },

    {
        name: 'Assets',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Licenses', href: '/', current: false },
            { name: 'Asset List', href: '/', current: false },
            { name: 'Accessories List', href: '/', current: false },
            { name: 'Consumables List', href: '/', current: false },
            { name: 'Asset Inventory', href: '/', current: false },
        ],
    },

    {
        name: 'List of Employee',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Add New Employee', href: '/', current: false },
            { name: 'Employee List', href: '/', current: false },
            { name: 'OTE Availed', href: '/', current: false },
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

function classNames(...classes: any[]) {
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
                                        <Link
                                            href={item.href}
                                            className={classNames(
                                                item?.current
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                            )}
                                        >
                                            <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                                            {item.name}
                                        </Link>
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
                                                                {/* Replace <a> with <Link> */}
                                                                <Link href={subItem.href}>
                                                                    <span className={classNames(
                                                                        subItem?.current ? 'bg-gray-800' : 'text-gray-150 hover:bg-gray-800',
                                                                        'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
                                                                    )}>
                                                                        {subItem.name}
                                                                    </span>
                                                                </Link>
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
                        <Link
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
