import Link from 'next/link'
import React from 'react'

export default function ViewTerms() {
    return (
        <div className=' w-full rounded px-2'>
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Referral Terms & Conditions
                        </h2>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">

                    <div className=" px-2 py-2">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h3 className='font-medium'>Terms & Conditions</h3>
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <Link href='/employee_referral'>
                                    <button
                                        type="button"
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className=" mb-4 px-2 py-2">
                        <p className='text-sm font-normal text-gray-600 text-justify mr-8'>Employee Referral Program We are always looking for great people, and you can help. If you know someone who you think would be a great addition to our company and they meet the prerequisites for the open positions, you can refer the candidates to the HR department. You can refer using the Candidate Referral Form If the candidate referred by you, is hired you will be rewarded between Rs.1000 to Rs 5000* *The following terms apply: The hiring of a referred employee must occur within six months of the initial referral date. Management, HR and Business Unit Director Employees are excluded from receiving referral rewards. Temporary contract employees and former employees are not eligible candidates for referral. To be eligible for an award, the referrals must be submitted to Human Resources via Candidate Referral Form and a resume or employment application is to be uploaded alongwith. In the event an applicant is referred by more than one employee, or by an employee and an employment agency, the deciding factor will be the date of receipt of the referral to Human Resources. The Office of Human Resources reserves the right to make the final determination about candidate eligibility, including whether they are qualified for positions designated within the program. All candidates will be evaluated for employment consistent with our organization’s policies and procedures, and all information regarding the hiring decision will remain strictly confidential. You are eligible to receive the reward: (a) If you submitted your referral form prior to the time the candidate is offered an interview or the candidate indicated your referral at the time of application (b) When the person you referred is hired into a position included in this program; and (c)After the person you referred is employed for six months. You must be employed by the company when the reward is released, normally soon after the person you referred has been in the job for six months. The payment will be included in your regular paycheck. The referral reward could be between Rs 1000 to Rs 5000* depending on the experience of the hired candidate. 0 - 1 years Rs 1000 1 - 2 years Rs 1500 2 - 3 years Rs 2000 3 - 4 years Rs 3000 4 - 5 years Rs 4000 5 years or more Rs 5000
                            *All statutory taxes apply</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
