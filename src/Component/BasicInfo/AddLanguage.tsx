import React from 'react'

export default function AddLanguage() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                        Language
                    </label>
                    <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue="Mr"
                    >
                        <option value="">Choose a value</option>
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Punjabi">Punjabi</option>
                        <option value="Hindi">Hindi</option>
                    </select>
                </div>
            </div>
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                        Reading
                    </label>
                    <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue="Mr"
                    >
                        <option value="">Choose a value</option>
                        <option value="Elementary Proficiency">Elementary Proficiency</option>
                        <option value="Full Professional Proficiency">Full Professional Proficiency</option>
                        <option value="Limited Working Proficiency">Limited Working Proficiency</option>
                        <option value="Native or Bilingual Proficiency">Native or Bilingual Proficiency</option>
                        <option value="Professional Working Proficiency">Professional Working Proficiency</option>
                    </select>
                </div>
            </div>
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                        Speaking
                    </label>
                    <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue="Canada"
                    >
                        <option value="">Choose a value</option>
                        <option value="Elementary Proficiency">Elementary Proficiency</option>
                        <option value="Full Professional Proficiency">Full Professional Proficiency</option>
                        <option value="Limited Working Proficiency">Limited Working Proficiency</option>
                        <option value="Native or Bilingual Proficiency">Native or Bilingual Proficiency</option>
                    </select>
                </div>
            </div>
            <div className="sm:col-span-1">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                        Writing
                    </label>
                    <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue="Mr"
                    >
                        <option value="">Choose a value</option>
                        <option value="Elementary Proficiency">Elementary Proficiency</option>
                        <option value="Full Professional Proficiency">Full Professional Proficiency</option>
                        <option value="Limited Working Proficiency">Limited Working Proficiency</option>
                        <option value="Native or Bilingual Proficiency">Native or Bilingual Proficiency</option>
                        <option value="Professional Working Proficiency">Professional Working Proficiency</option>

                    </select>
                </div>
            </div>
        </div>
    )
}
