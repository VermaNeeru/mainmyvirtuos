import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Disclosure } from '@headlessui/react';
import {
  UserIcon,
  CheckIcon,
  ChevronUpDownIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import DragDropFile from '@/components/DragDrop/DragDropFile';
import { CREATE_DOCUMENT_UPLOAD_MUTATION } from '@/graphql/User/queries';
import { ApolloError, useMutation } from '@apollo/client';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const viewer = [
  { id: 1, name: 'Choose Viewer' },
  { id: 2, name: 'HR' },
  { id: 3, name: 'Network Admin' },
  { id: 4, name: 'Accounts' },
];

export default function AddDocument() {
  const [selected, setSelected] = useState(viewer[1]);
  const [documentName, setDocumentName] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
//   const [createDocumentUpload] = useMutation(CREATE_DOCUMENT_UPLOAD_MUTATION);

const [createDocumentUpload, { data, error }] = useMutation(
    CREATE_DOCUMENT_UPLOAD_MUTATION
  );
  
  console.log("GraphQL Query:", CREATE_DOCUMENT_UPLOAD_MUTATION?.loc?.source?.body);
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log('I am clicked');
    console.log('Document Name:', documentName);
    console.log('Document Description:', documentDescription);
    console.log('Selected Viewer:', selected.name);

    const createDocumentUploadInput = {
      user_id: 1, // Replace with the actual user ID
      role_id: 2, // Replace with the actual role ID
      viewer_id: selected.id, // Use the ID of the selected viewer
      document_name: documentName,
      document_description: documentDescription,
      document_attachment: 'base64-encoded-attachment', // Replace with the actual attachment data
      document_access: 'PUBLIC', // Replace with the desired access level
    };

    try {
      const { data } = await createDocumentUpload({
        variables: {
          createDocumentUploadInput,
        },
      });

      console.log('Mutation Response:', data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  


  return (
    <div className="w-full rounded px-2">
      <div className="rounded-t mb-4 px-4 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h2 className="text-blueGray-700 text-xl font-semibold">
              Upload New Document
            </h2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
        <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
          <div className="px-2 py-2">
            <div className="lg:flex lg:items-center">
              <div className="lg:flex-auto"></div>
              <div className="mt-4 lg:ml-16 ml-0 sm:mt-0 sm:flex-none">
                <Link href="/document">
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
          <div className="mb-4 lg:px-2 lg:py-2">
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="pb-4">
                  <div className="mt-2 grid grid-cols-1 lg:gap-x-6 gap-x-2 lg:gap-y-4 gap-y-2 lg:grid-cols-2">
                    <div className="col-span-1">
                      <div className="mt-2 grid grid-cols-1 lg:gap-x-6 gap-x-2 lg:gap-y-2 gap-y-2 lg:grid-cols-1">
                        <div className="sm:col-span-1">
                          <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                              <>
                                <div className="relative mt-2">
                                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <span className="block truncate">
                                      {selected.name}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                  </Listbox.Button>

                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {viewer.map((person) => (
                                        <Listbox.Option
                                          key={person.id}
                                          className={({ active }) =>
                                            classNames(
                                              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                              'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                          }
                                          value={person}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                {person.name}
                                              </span>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active ? 'text-white' : 'text-indigo-600',
                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                  )}
                                                >
                                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>
                        </div>
                        <div className="sm:col-span-1">
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                              type="text"
                              name="documentName"
                              id="email"
                              value={documentName}
                              onChange={(e) => setDocumentName(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Document Name.."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="mt-2 grid grid-cols-1 lg:gap-x-6 gap-x-2 lg:gap-y-2 gap-y-2 lg:grid-cols-1">
                        <div className="sm:col-span-1">
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <ChatBubbleLeftRightIcon className="mb-4 h-5 w-5 text-gray-400 lg:-mt-6" aria-hidden="true" />
                            </div>
                            <textarea
                              name="comment"
                              id="comment"
                              className="lg:h-20 block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            
                              placeholder="User Document Description"
                              value={documentDescription}
                              onChange={(e) => setDocumentDescription(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-1 lg:gap-x-6 gap-x-2 lg:gap-y-4 gap-y-2 lg:grid-cols-1">
                    <div className="sm:col-span-1">
                      <DragDropFile />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" items-center">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
