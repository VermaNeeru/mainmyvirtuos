import React from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
    {
        question: "Anti Harassment and Non-Discrimination (A&N) Policy Virtuos is committed to a work",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        question: "The Program Guide includes 12 Programs Royalty-Loyalty; ESOP; Higher Education",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        question: "360Â° Outlook Performance Appraisal System (PAS) Policy Learn how we have evolved",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    // More questions...
]

export default function PublicDocument() {
    return (
        <div>
            <div className="w-full relative items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                {/* <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40"> */}
                <div className="mx-auto max-w-7xl px-2 lg:px-4 py-4">
                    <div className="rounded-t lg:mb-4 mb-2 px-0 lg:px-1 py-2 bg-transparent">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full max-w-full flex-grow flex-1">
                                <h2 className="text-blueGray-700 text-xl font-semibold">
                                    Public Documents
                                </h2>

                            </div>
                        </div>
                    </div>
                    <dl className="lg:mt-6 space-y-6 divide-y divide-gray-900/10">
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} className="pt-2 lg:pt-6">
                                {({ open }) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                <span className="lg:text-base text-sm font-semibold leading-6 lg:leading-7">{faq.question}</span>
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
                                            <p className="lg:text-base text-xs leading-5 lg:leading-7 text-gray-600">{faq.answer}</p>
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
