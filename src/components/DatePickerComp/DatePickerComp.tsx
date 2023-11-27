import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function DatePickerComp({ onDateChange }) {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (newDate: React.SetStateAction<Date>) => {

        console.log(newDate)
        // const isoDateString = newDate.toString();
        // const dateOnly = isoDateString.split('T')[0];
        const dateOnly = newDate.toLocaleDateString();

        console.log(dateOnly)
        setSelectedDate(newDate);
        onDateChange(dateOnly);
        // onDateChange(newDate); // Call the callback passed from parent
    };
    return (
        <div>
            <DatePicker selected={selectedDate}
                // onChange={(date: React.SetStateAction<Date>) => handleDateChange(date)}
                onChange={(date: Date) => handleDateChange(date)}
                // value={selectedDate.toISOString().split('T')[0]}
                // onChange={(e) => handleDateChange(new Date(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />

        </div>
    )
}
