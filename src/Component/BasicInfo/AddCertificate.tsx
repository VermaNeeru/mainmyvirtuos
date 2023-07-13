import React from 'react'
import CertificateSearch from './CertificateSearch'
import DatePickerComp from '../DatePickerComp/DatePickerComp'

export default function AddCertificate() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <CertificateSearch heading="Certification" />
                </div>
            </div>
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                        Date
                    </label>
                    <DatePickerComp />
                </div>
            </div>
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                        Validity
                    </label>
                    <DatePickerComp />
                </div>
            </div>

        </div>
    )
}
