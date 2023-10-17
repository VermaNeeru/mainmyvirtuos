import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Disclosure } from '@headlessui/react'
import { UserIcon, CheckIcon, ChevronUpDownIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import EmployeeSearch from '@/components/EmployeeSearch';
import MonthYear from '@/components/DatePickerComp/MonthYear';
import XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { useMutation, useLazyQuery } from '@apollo/client';
import { ADD_USER_ATTENDANCE_MUTATION } from '@/graphql/Userattendance/queries';
import Alert from '@/components/Alert';

import UserData from '@/components/UserData';
import { ADD_Attendancesheet_MUTATION } from '@/graphql/Attendancesheet/queries';
import FileUpload from '@/components/FileUpload';
import { GET_Officialinfo_BY_ECODE } from '@/graphql/Officialinfo/queries';
import { useGetUserByECode } from '@/hooks/GetUserByECode';
import { GetUserByECode } from '@/components/GetUserByECode';


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}
function formatDateToHHII(date: { getHours: () => any; getMinutes: () => any; }) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
function calculateTimeDifference(date1: string | number | Date, date2: string | number | Date) {
    // date2 = new Date(date2);
    // date1 = new Date(date1);

    // let dateDiff = Math.abs(date2 - date1);
    // let fullDays = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    // let fullHours = Math.floor((dateDiff - fullDays * 1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    // let fullMinutes = Math.floor((dateDiff - fullDays * 1000 * 60 * 60 * 24 - fullHours * 1000 * 60 * 60) / (1000 * 60));


    // return `${fullHours}:${fullMinutes}:00`;
    console.log(date1);
    console.log(date2);
    const shortfall = date1 - date2;

    console.log(shortfall);
    const roundedNumber = parseFloat(shortfall.toFixed(2));
    return roundedNumber;
}


export default function UploadAttendanceSheet() {
    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);
    const [month, setMonth] = useState('');

    const handleMonthChange = (newMonth: any) => {
        setMonth(newMonth); // Update parent component's state
        console.log(newMonth)
    };
    const viewer = [
        { id: 1, name: 'In-Out Report' },
        { id: 2, name: 'Logon Hours' },
    ]
    const user_id = UserData();
    const [userId, setUserId] = useState<number>(user_id)
    const [empUserId, setEmpUserId] = useState<number>(null)
    const [comment, setComment] = useState('')
    const [selected, setSelected] = useState(viewer[0])

    const [employeeAttendanceArray, setEmployeeAttendanceArray] = useState([]);
    const [file, setFile] = useState([]);
    const [employeeCode, setEmployeeCode] = useState('');
    const [i, setI] = useState(0);
    const [csvData, setCSVData] = useState([]);
    const [createQuery, { loading: createQueryLoading, error: createQueryError }] = useMutation(ADD_USER_ATTENDANCE_MUTATION);
    // console.log(ADD_USER_ATTENDANCE_MUTATION.loc.source.body);
    const [createQueryAS, { loading: createQueryLoadingAS, error: createQueryErrorAS }] = useMutation(ADD_Attendancesheet_MUTATION);
    // const [executeQuery, { loading, error, data }] = useLazyQuery(GET_Officialinfo_BY_ECODE);
    // console.log(GET_Officialinfo_BY_ECODE.loc.source.body);
    // const employeeCode1 = 'VINABS2201';

    // // useEffect(() => {
    // //     // console.log(employeeCode);
    // //     executeQuery({ variables: { ecode: employeeCode } });
    // //     console.log(data);
    // // }, [employeeCode]);

    // // console.log(data);
    // // useEffect(() => {
    // //     if (data && data.userDetailByCode) {
    // //         const { userDetailByCode } = data; // Destructure the division object
    // //         setEmpUserId(userDetailByCode.user_id)
    // //         console.log('user_id', userDetailByCode.user_id);


    // //     }
    // // }, [data]);

    // // if (loading) return <p>Loading...</p>;
    // // if (error) return <p>Error: {error.message}</p>;

    // console.log(data.user_id);



    // console.log(GET_Officialinfo_BY_ECODE.loc.source.body);

    const alphabetArray = {
        C: 'employee_code',
        I: 'worked_hours',
        B: 'attendance_date',
        C: 'attendance_day',
        E: 'swipe_in',
        F: 'swipe_out',
        G: 'late_hours',
        H: 'early_hours',
        J: 'overtime',
        K: 'status',
    };

    const checkIsAValidDate = (date) => {
        // Implement your date validation logic here
        // Return true if the date is valid, otherwise false
        // Example: return !isNaN(Date.parse(date));
    };

    const handleFileUpload = (event: { target: { files: any[]; }; }) => {
        console.log('Upload')
        setFile(event.target.files[0]);
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // Call a function to read the CSV file content
            readCSVFile(selectedFile);
        }
    };

    const readCSVFile = (file: Blob) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            // Parse the CSV content into an array of rows and columns
            const rows = content.split('\n').map((row: string) => row.split(','));
            setCSVData(rows);
        };
        reader.onerror = () => {
            setErrorMessage('Error reading the CSV file.');
        };
        reader.readAsText(file); // Read the file as text

        console.log(csvData)
    };

    useEffect(() => {
        console.log(csvData)
        // setFile(csvData)
    }, [csvData]);

    const uploadAttendanceSheet = async () => {

        const fileUrl = FileUpload(file, 'attendancesheet');

        console.log('fileUrl', fileUrl);
        try {
            const { data: { createAttendancesheet: { id: attendanceSheetId } } } = await createQueryAS({
                variables: {
                    createAttendancesheetInput: {
                        month: month,
                        sheet_type: selected.name,
                        attachment: fileUrl,
                        comments: comment,
                    },
                },
            });
            console.log('attendanceSheetId', attendanceSheetId);

            return attendanceSheetId;
        } catch (error) {
            console.error('Error loading XLSX file:', error);
        }
    }
    const handleAttendance = async (attendanceData: any) => {
        console.log("attendanceData: ", attendanceData);
        try {
            const { data: { createUserattendence: { id: attendanceId } } } = await createQuery({
                variables: {
                    createUserattendenceInput: attendanceData,
                },
            });

            console.log('attendanceId', attendanceId);

            return attendanceId;
        } catch (error) {
            console.error('Error uploadAttendanceSheet:', error);
        }
    }
    const getUserId = async (employeeCode: any) => {
        console.log("employeeCode: ", employeeCode);
        // const employeeCode = 'VINABS2201';
        try {
            useEffect(() => {
                // console.log(employeeCode);
                executeQuery({ variables: { ecode: employeeCode } });
                console.log(data);
            }, [employeeCode]);

            console.log(data);
            useEffect(() => {
                if (data && data.userDetailByCode) {
                    const { userDetailByCode } = data; // Destructure the division object
                    console.log('user_id', userDetailByCode.user_id);

                    const userId = userDetailByCode.user_id;
                } else {
                    const userId = null;
                }
            }, [data]);


            return userId;
        } catch (error) {
            console.error('Error user_id:', error);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('called');

        // const file = e.target.files[0];

        console.log('file', file);
        const attachment = "";
        // return;
        if (file) {



            const attendanceSheetId = await uploadAttendanceSheet();
            // return;
            // const attendanceSheetId = 1;



            console.log('attendanceSheetId', attendanceSheetId);

            const workbook = new ExcelJS.Workbook();
            const reader = new FileReader();
            let empUID = null;

            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const buffer = Buffer.from(data);

                try {
                    await workbook.xlsx.load(buffer);

                    const sheet = workbook.getWorksheet(1); // Change 1 to the index of the desired sheet
                    console.log('sheet', sheet);
                    const cellCollection = [];

                    sheet.eachRow((row) => {
                        const cellValues = row.values;
                        cellCollection.push(cellValues);
                    });
                    console.log('cellCollection', cellCollection);
                    // Process cellCollection as needed

                    let i = 4;
                    let j = i + 1;
                    let k = j + 3;
                    let employeeAttendanceArray = [];
                    let employeeCodeNew = null;
                    let employeeName = '';
                    cellCollection.map(async (row, index) => {
                        console.log('index', index)
                        console.log(typeof (i), i)

                        // console.log('row', row)
                        console.log(index == i)
                        console.log(typeof (index), index)
                        console.log(typeof (i), i)
                        if (index == i) {
                            console.log(index)
                            console.log(i)

                            console.log(index === i)
                            j = i + 1;
                            k = j + 3;

                            const employeeDetail = row[1];
                            const employeeDetailArray = employeeDetail.split("** Code & Name :-   ");
                            const employeeDetailArray1 = employeeDetailArray[1].split("         ");

                            if (i > 4) {
                                const employeeDetailArray2 = employeeDetailArray1[0].split("  ");
                                employeeCodeNew = employeeDetailArray2[0];
                                employeeName = employeeDetailArray2[1];
                                console.log("employeeCode1", employeeCodeNew)

                                if (employeeCodeNew) {
                                    console.log("employeeCode2", employeeCodeNew)
                                    // // useEffect(() => {
                                    // //     // console.log(employeeCode);
                                    // //     executeQuery({ variables: { ecode: employeeCodeNew } });
                                    // //     console.log(data);
                                    // // }, [employeeCodeNew]);

                                    // // console.log(data);
                                    // // useEffect(() => {
                                    // //     if (data && data.userDetailByCode) {
                                    // //         const { userDetailByCode } = data; // Destructure the division object
                                    // //         // setEmpUserId(userDetailByCode.user_id)
                                    // //         console.log('user_id', userDetailByCode.user_id);
                                    // //         const user_id = userDetailByCode.user_id;

                                    // //     }
                                    // // }, [data]);

                                    // // if (loading) return <p>Loading...</p>;
                                    // // if (error) return <p>Error: {error.message}</p>;

                                    // const user_id = await getUserId(employeeCode);
                                    empUID = GetUserByECode(employeeCodeNew);
                                    // setEmployeeCode(employeeCode)
                                    console.log('user_id', empUID);
                                    setEmpUserId(parseInt(empUID));
                                    // setEmpUserId(user_id)
                                    // }, [getQueryById]);
                                }
                            } else {
                                employeeCodeNew = employeeDetailArray1[0];
                                employeeName = '';
                                empUID = null;
                                setEmpUserId(null);
                                // setEmpUserId(null)
                            }
                            console.log('empUID = ' + empUID + ' & empUserId = ' + empUserId + ' & i = ' + i + ' & j =' + j + ' & k =' + k);
                            i = i + 6;

                        }
                        console.log('empUID = ' + empUID + ' & empUserId = ' + empUserId + ' & i = ' + i + ' & j =' + j + ' & k =' + k);

                        if (index > j && index <= k) {
                            console.log('row', row);
                            console.log('rowData' + row[0] + ',' + row[1] + ',attendence_date=' + row[2] + ',' + row[3] + ',' + row[4] + ',' + row[5] + ',' + row[6] + ',' + row[7] + ',' + row[8]);

                            // if (employeeCode !== '') {
                            // const attendanceDate = row[2];
                            console.log(row[2]);

                            const totalWorkingHours = "09.00";
                            // const row9 = new Date(); // Replace with your actual date value
                            // const timeSpent = formatDateToHHII(row[9]);
                            try {
                                const timeSpent = row[9];
                                console.log('timeSpent', timeSpent);
                                const shortfall = calculateTimeDifference(totalWorkingHours, timeSpent);

                                console.log('shortfall', shortfall);
                                console.log('empUserId', empUserId);
                                // return;
                                console.log('empUID = ' + empUID + ' & empUserId = ' + empUserId + ' & i = ' + i + ' & j =' + j + ' & k =' + k);

                                if (empUID) {
                                    const attendanceData = {
                                        user_id: empUID,
                                        attendence_date: row[2],
                                        attendence_day: row[3],
                                        attendence_status: row[11],
                                        employee_code: employeeCodeNew,
                                        employee_name: employeeName,
                                        swipe_in: row[5],
                                        swipe_out: row[6],
                                        shortfall: String(shortfall),
                                        employee_department: "",
                                        notes: "",
                                        source_id: attendanceSheetId,
                                        late_hours: row[7],
                                        early_hours: row[8],
                                        total_hours: row[9],
                                        excess_hours: row[9]
                                    };

                                    const attendanceId = await handleAttendance(attendanceData);
                                    console.log('attendanceId', attendanceId);

                                }

                                // const { data: { createUserattendence: { id: attendanceId } } } = createQuery({
                                //     variables: {
                                //         createUserattendenceInput: {
                                //             user_id: user_id,
                                //             attendence_date: row[2],
                                //             attendence_day: row[3],
                                //             attendence_status: row[11],
                                //             employee_code: employeeCode,
                                //             employee_name: employeeName,
                                //             swipe_in: row[5],
                                //             swipe_out: row[6],
                                //             shortfall: String(shortfall),
                                //             employee_department: "",
                                //             notes: "",
                                //             source_id: attendanceSheetId,
                                //             late_hours: row[7],
                                //             early_hours: row[8],
                                //             total_hours: row[9],
                                //             excess_hours: row[9]
                                //         },
                                //     },
                                // });

                                // console.log('response', data);
                            } catch (error) {
                                console.error('Error loading XLSX file:', error);
                            }
                            // employeeAttendanceArray[employeeCode]['name'] = employeeName;
                            // employeeAttendanceArray[employeeCode]['attendence_date'] = row[2];
                            // }
                        }
                    });

                    // console.log('employeeAttendanceArray', employeeAttendanceArray);

                    setFile('');
                    setMonth('');
                    setComment('');
                    setshowSuccessMessage(true);
                    setshowErrorMessage(false);
                } catch (error) {
                    console.error('Error loading XLSX file:', error);
                }
            };

            reader.readAsArrayBuffer(file);

        }
    }


    return (
        <div className=' w-full rounded px-2'>
            {showSuccessMessage && (
                <Alert message="Attendance Uploaded Successfully!" />
            )}
            {showErrorMessage && (
                <Alert message="Something went wrong!" />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Upload Attendance Sheet
                        </h2>

                    </div>
                </div>

                <div className=" px-2 py-2">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                        </div>
                        <div className="mt-4 lg:ml-16 ml-0 sm:mt-0 sm:flex-none">
                            <Link href='/upload_attendance'>
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

            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">

                    <div className=" mb-4 px-2 py-2">
                        <form>
                            <div className="space-y-2">
                                <div className="pb-4">
                                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-2">
                                        {/* <div className="sm:col-span-1">
                                            <EmployeeSearch heading="For :" />
                                        </div> */}
                                        <div className="sm:col-span-1">
                                            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                Choose Sheet Type
                                            </label>
                                            <Listbox value={selected} onChange={setSelected}>
                                                {({ open }) => (
                                                    <>
                                                        <div className="relative mt-2">
                                                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                                <span className="block truncate">{selected.name}</span>
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
                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                    Select Month
                                                </label>
                                                <MonthYear onMonthChange={handleMonthChange} />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-700">
                                                    File
                                                </label>
                                                <input
                                                    type="file"
                                                    // accept='xlsx/'
                                                    onChange={handleFileUpload}
                                                    name="email"
                                                    id="email"
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Choose File"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <ChatBubbleLeftRightIcon className="mb-4 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <textarea
                                                    rows={2}
                                                    name="comment"
                                                    id="comment"
                                                    onChange={(e) => setComment(e.target.value)}
                                                    value={comment}
                                                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue={''}
                                                    placeholder="Comment"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1">

                                        </div>





                                    </div>
                                </div>


                            </div>

                            <div className=" items-center">
                                <button
                                    onClick={handleSubmit}
                                    type="button"
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
    )
}
