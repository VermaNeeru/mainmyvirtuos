import React, { useEffect, useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { useMutation, useQuery } from "@apollo/client";
import { GET_Employees } from '@/graphql/User/queries';
interface EmployeeSearchProps {
  heading: string; // Add the heading property
  onEmpValueChange: (selected: any) => void; // Replace 'any' with the actual type of 'selected'
}

const EmployeeSearch: React.FC<EmployeeSearchProps> = ({ heading, onEmpValueChange }) => {
  // export default function EmployeeSearch({ heading = () => { }, onEmpValueChange = () => { } }: any) {

  const { loading, error, data } = useQuery(GET_Employees);

  console.log("users", data);

  type Employee = {
    id: any;
    firstname: any;
    lastname: any;
  };

  // Assuming you have a type for the data structure
  type Data = {
    getalluser: Employee[];
    // Add other properties as needed
  };

  // Initialize people array with a type
  let people: { id: any; name: string }[] = [{ id: 1, name: 'all' }];

  if (data && data.getalluser) {
    // Update people array using the spread operator to include existing elements
    people = [
      ...people,
      ...data.getalluser.map((employee: Employee) => ({
        id: employee.id,
        name: `${employee.firstname} ${employee.lastname}`,
      }))
    ];
  }

  console.log("users", people);
  // const people = [
  //     { id: 1, name: 'Shivam Chawla' },
  //     { id: 2, name: 'Neeru Verma' },
  //     { id: 3, name: 'Poorva Sharma' },
  //     { id: 4, name: 'Sarika Sharma' },
  //     { id: 5, name: 'Bhumika' },
  //     { id: 6, name: 'Gagan' },
  //     // More users...
  // ]


  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

  const [query, setQuery] = useState('')
  const [selectedPerson, setSelectedPerson] = useState(null)

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })

  // const handleChange = (e) => {
  //     const newValue = e.target.value;
  //     setSelectedPerson(newValue);
  //     onEmpValueChange(newValue);
  // };

  useEffect(() => {
    onEmpValueChange(selectedPerson);
  }, [selectedPerson, onEmpValueChange])
  return (
    <div>
      <Combobox as="div" value={selectedPerson}
        onChange={setSelectedPerson}
      // onChange={(e) => handleChange(e.target.value)}
      >
        {(heading && heading == 'hidden') ? <></>
          : <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{(heading) ? heading : "Employees"}</Combobox.Label>
        }

        <div className="relative mt-2">
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
export default EmployeeSearch;