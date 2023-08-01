import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TimePickerComp() {
    const [selectedTime, setSelectedTime] = useState(new Date());

    return (
        <div>
            <DatePicker
                selected={selectedTime}
                onChange={(date: React.SetStateAction<Date>) => setSelectedTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15} // Set the time intervals to 15 minutes
                dateFormat="h:mm aa" // Display format for the selected time
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />
        </div>
    );
}
