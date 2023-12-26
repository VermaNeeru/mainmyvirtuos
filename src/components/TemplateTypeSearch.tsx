import React, { useState, useEffect } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
export default function TemplateTypeSearch({ heading, handleTemplateTypeChange, updateData }: any) {
    console.log('type', updateData)
    const [query, setQuery] = useState('')
    const [selectedState, setSelectedState] = useState<any>('')
    // useEffect(() => {
    //     setSelectedState(updateData)
    // }, [updateData])
    const handleTypeChange = (type: any) => {
        const newValue = type;

        console.log(newValue)

        setSelectedState(newValue);
        handleTemplateTypeChange(newValue.name);
        // onDateChange(newDate); // Call the callback passed from parent
    };
    const template_type = [
        { id: 1, name: 'Choose Template Type' },
        { id: 2, name: 'New joinee(F)' },
        { id: 3, name: 'New joinee(M)' },
        { id: 4, name: 'User birthday' },
        { id: 5, name: 'Work Anniversary' },
        { id: 6, name: 'Task Assignment' },
        { id: 7, name: 'Project Assignment' },
        { id: 8, name: 'Leave(R)' },
        { id: 9, name: 'Leave(approval)' },
        { id: 10, name: 'Issues' },
        { id: 11, name: 'Issues(Resolve)' },
        { id: 12, name: 'Idea' },
        { id: 13, name: 'Forget Password' },
        { id: 14, name: 'Forget Username' },
        { id: 15, name: 'Task Completion' },
        { id: 16, name: 'Expense' },
        { id: 17, name: 'Expense(Approval)' },
        { id: 18, name: 'New User' },
        { id: 19, name: 'Outdoor Visits' },
        { id: 20, name: 'Outdoor Visits(Approved)' },
        { id: 21, name: 'Travel Request' },
        { id: 22, name: 'Travel Request(Manager)' },
        { id: 23, name: 'Message' },
        { id: 24, name: 'Travel Request(Approval)' },
        { id: 25, name: 'Holiday' },
        { id: 26, name: 'Timesheet' },
        { id: 27, name: 'Payslip' },
        { id: 28, name: 'Discussion' },
        { id: 29, name: 'File' },
        { id: 30, name: 'Activity' },
        { id: 31, name: 'Activity(New)' },
        { id: 32, name: 'License Expiry' },
        { id: 33, name: 'Leave(Cancel)' },
        { id: 34, name: 'WFH(R)' },
        { id: 35, name: 'WFH(Approval)' },
        { id: 36, name: 'Activity(Abusive)' },
        { id: 37, name: 'Activity(Rejection)' },
        { id: 38, name: 'Profile Updated' },
        { id: 39, name: 'Travel(Cancellation)' },
        { id: 40, name: 'Expense Reminder' },
        { id: 41, name: 'Wedding Anniversary' },
        { id: 42, name: 'Skill/Certification' },
        { id: 43, name: 'Travel Advance' },
        { id: 44, name: 'Travel Advance(Approval)' },
        { id: 45, name: 'ECR' },
        { id: 46, name: 'Leave Reminder' },
        { id: 47, name: 'Travel Reminder' },
        { id: 48, name: 'Leave Deduction' },
        { id: 49, name: 'Employee Exit' },
        { id: 50, name: 'Employee Exit(Updation)' },
        { id: 51, name: 'Employee Undertaking' },
        { id: 52, name: 'Employee Exit(Response)' },
        { id: 53, name: 'Employee Exit Reminder' },
        { id: 54, name: 'Employee Exit(NOC)' },
        { id: 55, name: 'Exit Interview Status' },
        { id: 56, name: 'Last Working Day' },
        { id: 57, name: 'Requisition for Official Requirements' },
        { id: 58, name: 'Employee Referral' },
        { id: 59, name: 'Referral Reminder' },
        { id: 60, name: 'Upcoming Month Celebrations' },
        { id: 61, name: 'Annual Component Due' },
        { id: 62, name: 'Annual Review Reminder' },
        { id: 63, name: 'Pending Issues' },
    ];
    useEffect(() => {
        const matchingTemplate = template_type.find(template => (
            template.name === updateData
        ));
        console.log(matchingTemplate);
        setSelectedState(matchingTemplate)
    }, [updateData])
    // const matchingTemplate = template_type.find(template => (
    //     template.name === updateData
    // ));

    // if (matchingTemplate) {
    //     const { id, name } = matchingTemplate;
    //     console.log(`Found: id=${id}, name=${name}`);
    //     setSelectedState(matchingTemplate);
    // } else {
    //     console.log('Not found');
    // }

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }


    const filteredPeople =
        query === ''
            ? template_type
            : template_type.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })
    return (
        <div>
            <Combobox as="div" value={selectedState} onChange={(selectedValue) => handleTypeChange(selectedValue)}>
                {(heading && heading == 'hidden') ? <></>
                    : <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{(heading) ? heading : "Template Type"}</Combobox.Label>
                }


                <div className="relative">
                    <Combobox.Input
                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(person: any) => person?.name}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Combobox.Button>

                    {filteredPeople.length > 0 && (
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredPeople.map((person) => (
                                <Combobox.Option
                                    key={person.id}
                                    value={person}
                                    className={({ active }) =>
                                        classNames(
                                            'relative cursor-default select-none py-2 pl-3 pr-9',
                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                        )
                                    }
                                >
                                    {({ active, selected }) => (
                                        <>
                                            <span className={classNames('block truncate', selected && 'font-semibold')}>{person.name}</span>

                                            {selected && (
                                                <span
                                                    className={classNames(
                                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                                        active ? 'text-white' : 'text-indigo-600'
                                                    )}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                </div>
            </Combobox>

        </div>
    )
}
