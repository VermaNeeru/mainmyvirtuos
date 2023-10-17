import { Fragment, SetStateAction, useState } from "react";
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

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}
const Testing = ({ onStateChange }: any) => {
    // export default function Testing() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentNavItem, setCurrentNavItem] = useState<string>("Dashboard");
    const [currentNavSubItem, setSubCurrentNavItem] = useState<string>("")
    // console.log(currentNavItem);
    // console.log(currentNavSubItem);

    const navigation = [
        {
            name: 'Dashboard', href: '/', icon: HomeIcon,
            current: currentNavItem === "Dashboard",
        },
        {
            name: 'Activity',
            icon: UsersIcon,
            current: currentNavItem === "Activity",
            children: [
                {
                    name: 'Activity Stream', href: '/activity',
                    current: "Activity Stream",
                },
            ],
        },
        {
            name: 'Attendance',
            icon: FolderIcon,
            current: currentNavItem === "Attendance",
            children: [
                { name: 'My Attendance', href: '/current_month_attendance', current: "My Attendance", },
                { name: 'All Attendance', href: '/all_attendance', current: 'All Attendance' },
                { name: 'Upload Attendance Sheet', href: '/upload_attendance_sheet', current: 'Upload Attendance Sheet' },
            ],
        },
        {
            name: 'Leaves',
            icon: FolderIcon,
            current: currentNavItem === "Leaves",
            children: [
                { name: 'Leave Callendar', href: '/leave_calendar', current: 'Leave Callendar' },
                { name: 'My Leave Balance', href: '/my_leaves', current: 'My Leave Balance' },
                { name: 'New Leave Request', href: '/leave', current: 'New Leave Request' },
                { name: 'My Leave Status', href: '/leave_list', current: 'My Leave Status' },
                { name: 'My Leave Calendar', href: '/my_leave_calendar', current: 'My Leave Calendar' },
                { name: 'My WFH/SL Status', href: '/wfh', current: 'My WFH/SL Status' },
                { name: 'New WFH/SL Request', href: '/add_wfh', current: 'New WFH/SL Request' },
            ],
        },

        {
            name: 'Approval Section',
            icon: FolderIcon,
            current: currentNavItem === "Approval Section",
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
            current: currentNavItem === "Travel",
            children: [
                { name: 'My Travel', href: '/travel', current: false },
                { name: 'New Travel Request', href: '/add_travel_req', current: false },

            ],
        },
        {
            name: 'Expense',
            icon: FolderIcon,
            current: currentNavItem === "Expense",
            children: [
                { name: 'Other Expense', href: '/user_advance_list', current: false },
                { name: 'New Travel Request', href: '/add_travel_req', current: false },
                { name: 'Add Travel Expenses', href: '/travel', current: false },

            ],
        },
        {
            name: 'Documents',
            icon: FolderIcon,
            current: currentNavItem === "Documents",
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
            current: currentNavItem === "Google Apps",
            children: [
                { name: 'My Calendar', href: '/google_calendar', current: false },
                { name: 'My Drive', href: '/google_drive', current: false },

            ],
        },
        {
            name: 'Gallery',
            icon: FolderIcon,
            current: currentNavItem === "Gallery",
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
            current: currentNavItem === "Idea",
            children: [
                { name: 'My Ideas', href: '/idea', current: false },
                { name: 'Add New Idea', href: '/add_idea', current: false },
            ],
        },

        {
            name: 'Issues',
            icon: FolderIcon,
            current: currentNavItem === "Issues",
            children: [
                { name: 'Overall Issues', href: '/all_issues_list', current: false },
                { name: 'My Issues', href: '/issue', current: false },
                { name: 'Add New Issue', href: '/add_issue', current: false },
                { name: 'All Issues', href: '/all_issues', current: false },
            ],
        },

        {
            name: 'Important Links',
            icon: FolderIcon,
            current: currentNavItem === "Important Links",
            children: [
                { name: 'Company Directory', href: '/extension_list', current: false },
                { name: 'Holiday Calendar', href: '/holiday_list', current: false },
                { name: 'Manage Holiday Calendar', href: '/holiday', current: false },
                { name: 'Official Requirements', href: '/weblink', current: false },
                { name: 'Employee Referral', href: '/employee_referral', current: false },
                { name: 'All Referral', href: '/all_referrals', current: false },
                { name: 'All official Requirements', href: '/all_requisitions', current: false },
                { name: 'Tutorial Myvirtuos', href: '/tutorial', current: false },
            ],
        },

        {
            name: 'Personal Information',
            icon: FolderIcon,
            current: currentNavItem === "Personal Information",
            children: [
                { name: 'Basic Info', href: '/edit_user', current: false },
                { name: 'Training', href: '/training', current: false },
            ],
        },

        {
            name: 'FAQ',
            icon: FolderIcon,
            current: currentNavItem === "FAQ",
            children: [
                { name: 'FAQ', href: '/view_faq', current: false },
            ],
        },

        {
            name: 'Reports',
            icon: FolderIcon,
            current: currentNavItem === "Reports",
            children: [
                { name: 'Other Expense Report', href: '/other_expense', current: false },
                // { name: 'Asset Report', href: '/asset_report', current: false },
                { name: 'Attendance Report', href: '/attendance', current: false },
                { name: 'Expense Report', href: '/expense', current: false },
                { name: 'Issue Report', href: '/all_issues', current: false },
                { name: 'Leave Report', href: '/leave_report', current: false },
            ],
        },

        {
            name: 'List of Employee',
            icon: FolderIcon,
            current: currentNavItem === "List of Employee",
            children: [
                { name: 'Add New Employee', href: '/add_user', current: false },
                { name: 'Employee List', href: '/users', current: false },
                { name: 'User Leave Detail', href: '/user_leave_detail', current: false },
                { name: 'OTE Availed', href: '/search_ote', current: false },
            ],
        },

        {
            name: 'Audit Log',
            icon: FolderIcon,
            current: currentNavItem === "Audit Log",
            children: [
                { name: 'Audit Log', href: '/audit', current: false },
            ],
        },

        {
            name: 'Settings',
            icon: FolderIcon,
            current: currentNavItem === "Settings",
            children: [
                { name: 'Manage Division', href: '/division_list', current: false },
                { name: 'Manage Leave Rules', href: '/leave_rule', current: false },
                { name: 'Manage User Type', href: '/user_type_list', current: false },
                { name: 'Manage Manufacturer', href: '/manufacturer_list', current: false },
                { name: 'Manage Company', href: '/company_list', current: false },
                { name: 'Manage Suppliers', href: '/supplier_list', current: false },
                { name: 'Manage Issue Category', href: '/issue_category_list', current: false },
                { name: 'Manage Faq Category', href: '/faq_category_list', current: false },
                { name: 'Manage Faq', href: '/faq', current: false },
                { name: 'Manage Modules', href: '/modules', current: false },
                { name: 'Manage Expense Type', href: '/expense_type_list', current: false },
                { name: 'Manage Holiday', href: '/holidays', current: false },
                { name: 'Manage Public Documents', href: '/all_public_document_list', current: false },
                { name: 'Manage Email Templates', href: '/email_list', current: false },
                { name: 'Manage Issues', href: '/admin_issue_list', current: false },
                { name: 'Manage Certifications', href: '/certifications', current: false },
                { name: 'Manage Skills', href: '/skills', current: false },
                { name: 'Manage Access Types', href: '/access_list', current: false },
                { name: 'Manage Roles', href: '/role_list', current: false },
                { name: 'Manage Department', href: '/department_list', current: false },
                { name: 'Manage Leave Category', href: '/leave_category_list', current: false },
                { name: 'User Leave Balance(Year)', href: '/leave_balance_upload', current: false },
                { name: 'Video Tutorials', href: '/all_tutorial', current: false },

            ],
        },

        // {
        //     name: 'Assets',
        //     icon: FolderIcon,
        //     current: currentNavItem === "Assets",
        //     children: [
        //         { name: 'Licenses', href: '/', current: false },
        //         { name: 'Asset List', href: '/', current: false },
        //         { name: 'Accessories List', href: '/', current: false },
        //         { name: 'Consumables List', href: '/', current: false },
        //         { name: 'Asset Inventory', href: '/', current: false },
        //     ],
        // },

    ]
    const handleSetCurrentItem = (Current: string) => {
        setCurrentNavItem(Current)
        setSubCurrentNavItem('')
        setSidebarOpen(false);
        if (Current == 'Dashboard') {
            onStateChange(false);
        }
        // onStateChange(false);
        console.log('Current', Current)
        console.log('currentNavItem', currentNavItem)
        console.log('currentNavSubItem', currentNavSubItem)
    };
    const handleSetSubCurrentItem = (Parent: string, Child: string) => {
        setCurrentNavItem(Parent)
        setSubCurrentNavItem(Child)
        setSidebarOpen(false)
        onStateChange(false);
        console.log(Parent, Child)
        console.log('currentNavItem', currentNavItem)
        console.log('currentNavSubItem', currentNavSubItem)
    };
    return (
        // <div className="flex grow flex-col gap-y-5 overflow-y-auto no-scrollbar bg-gray-900 px-6">
        <div className="flex grow flex-col gap-y-5 overflow-y-scroll no-scrollbar bg-theme-color px-6">
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
                                <li key={item.name}
                                >
                                    {!item.children ? (
                                        <Link
                                            onClick={() => handleSetCurrentItem(item.name)}
                                            href={item.href}
                                            className={classNames(
                                                item.name == currentNavItem
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                            )}
                                        >
                                            <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <Disclosure as="div" onClick={() => handleSetCurrentItem(item.name)}
                                            data-headlessui-state={item.name == currentNavItem ? 'open' : ''}
                                        >

                                            <>
                                                <Disclosure.Button
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-800 text-white'
                                                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                        'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-400'
                                                    )}
                                                    data-headlessui-state={item.name === currentNavItem ? 'open' : ''}
                                                    aria-expanded={item.name === currentNavItem ? 'true' : 'false'}
                                                    aria-controls={item.name !== currentNavItem ? '' : ''}

                                                >
                                                    <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                                                    {item.name}
                                                    <ChevronRightIcon
                                                        className={classNames(
                                                            item.name == currentNavItem ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                                            'ml-auto h-5 w-5 shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </Disclosure.Button>

                                                <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                    {item.children.map((subItem) => (
                                                        <li key={subItem.name} onClick={() => handleSetSubCurrentItem(item.name, subItem.name)}
                                                        >
                                                            {/* Replace <a> with <Link> */}
                                                            <Link href={subItem.href}

                                                            >
                                                                {/* <span className={classNames(
                                                                        subItem?.current ? 'bg-red-800' : 'text-gray-150 hover:bg-gray-800',
                                                                        'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-500'
                                                                    )}> */}

                                                                <span className={classNames(
                                                                    (subItem.name == currentNavSubItem) ? 'text-gray-300 font-semibold ' : 'hover:bg-gray-800 text-gray-500',
                                                                    'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 '
                                                                )}>
                                                                    {subItem.name}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </Disclosure.Panel>

                                            </>

                                        </Disclosure>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </li>

                </ul>
            </nav >
        </div >
    )
};

export default Testing;
