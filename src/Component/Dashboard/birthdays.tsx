import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

const people = [
    {
        name: 'Sarika',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        dob: '9 June',
        imageUrl:
            '	https://myvirtuos.com/uploads/profile/medium_thumb/Sarika_1624601136_mediumthumb.png',
    },
    {
        name: 'Rishabh',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        dob: '9 June',
        imageUrl:
            'https://myvirtuos.com/uploads/profile/medium_thumb/Rishabh_1647849017_mediumthumb.png',
    },
    // More people...
]

export default function Birthdays() {
    return (
        <div className="w-full relative items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
            <div className="rounded-t mb-4 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl text-xl font-semibold">
                            Birthdays in this Month
                        </h2>

                    </div>
                </div>
            </div>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 ">
                {people.map((person) => (
                    <li
                        key={person.email}
                        className="col-span-1 flex flex-col divide-y divide-gray-400 rounded-lg bg-gray-200 text-center drop-shadow-lg"
                    >
                        <div className="flex flex-1 flex-col p-4">
                            <Image loader={({ src }) => `${src}`} className="mx-auto h-20 w-20 flex-shrink-0 rounded-full" height={100} width={100} src={person.imageUrl} alt="" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">{person.name}</h3>
                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                <dt className="sr-only">Title</dt>
                                <dd className="text-sm text-gray-500">{person.dob}</dd>
                                <dt className="sr-only">Role</dt>

                            </dl>
                        </div>

                    </li>
                ))}
            </ul>

        </div>

    )
}
