import FaqSearch from '@/components/FaqSearch'
import React from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
    {
        question: "LAN not working ?",
        answer:
            "If you are using Wired LAN, please check if the cable is properly connected to PC or Mac. Remove and connect again and give couple of minutes to automatically select the IP address. If the cable is loose or has broken connector, please raise incident to IT Admin. If you are using Wireless LAN, please ensure to select the correct Wi-Fi networks, and forget the other Wi-Fi networks to avoid frequent conflicts. If you find issues with password, please make sure Caps lock on keyboard is not enabled. Renter password carefully. If the problem persists raise incident to IT Admin.",
    },
    {
        question: "Browser not launching or has Issues ?",
        answer:
            "Manage your browsers cache. Make sure you know how to clear your browser cache, which includes your cookies, temporary internet files, browsing and download history, form data, and so on. You can also do an intensive clean by deleting your usage history on Windows.",
    },
    {
        question: "Mouse,Touch Pad & Keyboard Issues ?",
        answer:
            "Unplug USB cables and wait for a little while for the device driver to be unloaded by Windows, and then plug the device back in.Try using a different USB port on your PC. If you use a USB hub between the device and the PC, make sure the hub has power. If itâ€™s still not working, try removing the USB hub and plugging the device directly into a USB port on the PC. Make sure that the cables on your device are not damaged in any way. Check any battery-powered devices to see if they are fully charged or have fresh batteries. Make sure thereâ€™s no dirt blocking keys or sensors. Check your wireless connections.Look on the bottom of the wireless device for a Reset button. Resetting the device will disconnect and then reconnect the wireless connection. There might also be a Reset button on the USB receiver for your device.For USB wireless devices, this might be as simple as unplugging the USB wireless receiver, waiting for about 10 seconds, and then plugging the USB wireless receiver back into the USB port. The wireless connection should be reestablished. Check the device. If the device does not appear to work at all (no lights appear on the device when itâ€™s plugged in, or the cursor does not move or does not appear on the screen), connect the device to another PC and make sure the device works on that PC. If the device does not work on the other PC, you might need to replace it.",
    },
    {
        question: "What is Casual Leave (CL) ? How can i avail CL? Am I Eligible for CL?",
        answer:
            "CASUAL LEAVE (CL) All employees including probationers* will be entitled to 7 (Seven) days Casual Leaves during a Financial year. These leaves will be credited to an individuals account at the beginning of the financial year and can accrued proportionately on a periodic basis. An employee can avail CL, subject to the following: â€¢ A maximum of three dayâ€™s CL can be availed in a month*. Also not more than 3 casual leaves can be availed at one time unless the absence is due to illness. In such a situation a certificate must accompany the leave application from a Medical Practitioner. â€¢ CL cannot be clubbed with any other leave â€¢ In case CL is availed because of medical reasons it can be clubbed with Sick Leave (SL) if the duration of the leave is more than the CL balance in an individualâ€™s account. â€¢ Either suffixed or prefixed holidays and Sundays to the leave period shall not be accounted as leave. Saturdays or Sundays falling between the period of leave shall be treated as leave. If an employee is absent on Friday and Monday, Saturday and Sunday are treated as availed leaves (Only one exception* is given in a year, as part of planned holiday). *This is only applicable for Qualified Employees (QE). If eligible, an employee is required to apply in MyVirtuos for the exception to sandwich leave policy, to avail this benefit. If an employee takes leave from Monday to Friday continuously, automatically Saturday and Sundays are treated as absent and shall be debited from the total entitlement of leaves. Unused Casual Leaves (CL) lapse at the end of the financial year and cannot be carried forward or encashed. *For (PE) No leaves allowed in the first month of joining Casual Leaves (CL) can be applied online using Leave Application Form as per the following schedule. 1 Day CL Application at least 1 Day in advance. 2 to 3 Days CL Application at least One week in advance. 4 to 7 Days CL Application at least 3 to 4 weeks in advance. Exceptions apply only in case of Emergency.",
    },
    {
        question: "What is Sick Leave (SL) ? How can I avail SL?",
        answer:
            "SICK LEAVE (SL) All employees including probationers* will be entitled to 7 (Seven) days Sick Leaves during a Financial year. These leaves will be credited to an individuals account at the beginning of the financial year and can accrued proportionately on a periodic basis. An employee can avail SL, subject to the following: â€¢ For more than three days of continuous sick leaves a certificate must accompany the leave application from a Medical Practitioner. â€¢ SL cannot be clubbed with any other leave. â€¢ In case CL is availed because of medical reasons it can be clubbed with Sick Leave (SL) if the duration of the leave is more than the SL balance in an individualâ€™s account. â€¢ Either suffixed or prefixed holidays and Sundays to the leave period shall not be accounted as leave. Saturdays or Sundays falling between the period of leave shall be treated as leave. If an employee is absent on Friday and Monday, Saturday and Sunday are treated as availed leaves (Only one exception* is given in a year, as part of planned holiday). *This is only applicable for Qualified Employees (QE). If eligible, an employee is required to apply in myVirtuos for the exception to sandwich leave policy, to avail this benefit. If an employee takes leave from Monday to Friday continuously, automatically Saturday and Sundays are treated as absent and shall be debited from the total entitlement of leaves. Unused SL lapse at the end of the financial year and cannot be carried forward or encashed. *For (PE) No leaves allowed in the first month of joining.",
    },
    {
        question: "What is Leave Policy (Paid or Unpaid Leaves)",
        answer:
            "Company has comprehensive Leave Policy in place for each Financial year (April to March) 1) Holidays and Restricted Holidays (RH) as per the Holiday Calendar 2) Qualified Employees (QE) can avail of 12 Casual Leaves (CL) 03 Congratulatory/Compassionate Leaves (CCL) 03 Sick Leaves (SL) 03 Restricted Holidays (RH) 3) Probationary Employees (PE) can avail of 03 Casual Leaves (CL) 01 Congratulatory/Compassionate Leaves (CCL) 01 Sick Leave (SL) QE can carry forward unveiled RH and SL to the next financial year or encase at the end of financial year. PE can carry forward CCL to the Post Probation Period Please refer to the Leave Policy in the Document Section on this Portal.",
    },
    {
        question: "How can I apply for Leave(s)?",
        answer:
            "Go to Leaves Section in this Portal and click New Leave Request. Please state the reason for availing the leave. Leaves are subject to approval by Manager and HR. You can check leave approval status under Leaves Section > My Applied Leaves.",
    },
    {
        question: "Can I cancel my leaves?",
        answer:
            "You can cancel or make changes to your leaves before they are approved. Should you wish to cancel after they are approved, please contact HR",
    },
    {
        question: "What happens if there is no leave balance and I need to take leaves?",
        answer:
            "Leaves are as per leave entitlement per trimester. Additional leaves may be treated as Leave without pay (LWP)",
    },
    {
        question: "How to Apply for a Half Day ?",
        answer:
            "Leaves -> New Leave Request -> Select Leave type & Dates - > Click on Save -> Next Screen asks for Half/Full Day -> Select Half day there & Save",
    },
    {
        question: "What is EL(Earned Leave)? How can I avail EL? Am I eligible for EL?",
        answer:
            "EARNED LEAVES (PL) All the Qualified Employees (QE) earn 7 (Seven days) Earned leaves (EL) during a Financial year. EL will be credited in three tranches (April, August and December). A Qualified Employee is an employee who has been confirmed after the initial six or twelve month probation period. EL can be availed only after putting in at least six months of work with the Company. EL can be accumulated maximum up to fourteen (14) days. An employee can have the option of encashing EL at the end of the financial year. The company shall do automatic encashment of unavailed EL once the balance exceeds 14 days as on 31st March every year. The EL can be encashed at the basic salary. Any holiday/weekly off falling during EL period shall be counted as Earned leave. Earned Leave (EL) can be applied online using Leave Application Form as per the following schedule. 1 Day EL Application at least 1 Day in advance. 2 to 3 Days EL Application at least One week in advance. 4 to 7 Days EL Application at least 3 to 4 weeks in advance. Exceptions apply only in case of Emergency.",
    },

    // More questions...
]

const recentans = [
    {
        question: "Can I work from home permanently?",
    },
    {
        question: "I fear COVID-19, and can I work from home?",
    },
    {
        question: "Can I adjust my leaves against my notice period?",
    },

    // More questions...
]

export default function ViewFaq() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            FAQs
                        </h2>

                    </div>
                </div>
            </div>
            <div className=' rounded-lg border border-gray-300 bg-white '>
                <div className=" mb-4 px-4 py-4">
                    <form>
                        <div className="space-y-2">
                            <div className="border-b border-gray-900/10 pb-4">
                                <p className="mt-1 text-sm leading-6 text-gray-600">Need support? We are here to help!</p>
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-6">
                                        <div className="mt-1">
                                            <FaqSearch heading="Search Faq" />
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
                                Search
                            </button>
                        </div>
                    </form>
                </div>

            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-4">
                <div className=' rounded-lg border border-gray-300 bg-white px-4 py-4'>
                    <h4 className='font-semibold'>Featured Question</h4>
                    <ul role="list" className="divide-y divide-gray-200">
                        {faqs.map((item) => (
                            <li key="1" className="py-4 text-sm">
                                {item.question}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className=' rounded-lg border border-gray-300 bg-white px-4 py-4'>
                    <h4 className='font-semibold'>Recent Answers</h4>
                    <ul role="list" className="divide-y divide-gray-200">
                        {recentans.map((item) => (
                            <li key="1" className="py-4 text-sm">
                                {item.question}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <div className="mt-6 relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                <h4 className='font-semibold'>Featured FAQ</h4>
                <div className=" mb-4 px-2 py-2">
                    <dl className="mt-2 space-y-6 divide-y divide-gray-900/10">
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} >
                                {({ open }) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                <span className="text-base font-semibold leading-7 text-xs text-gray-800">{faq.question}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    {open ? (
                                                        <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                    ) : (
                                                        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                            <p className="text-base leading-7 text-xs text-gray-600">{faq.answer}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>

            </div>
        </div>
    )
}
