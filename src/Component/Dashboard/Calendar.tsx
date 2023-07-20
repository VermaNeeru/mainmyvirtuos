import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);
const MyCalendar = () => {


    return (
        <div className="w-full relative items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">

            <div style={{ height: "600px" }}>
                <Calendar
                    localizer={localizer}

                    startAccessor="start"
                    endAccessor="end"
                    style={{ flex: 1 }}
                />
            </div>
        </div>
    );
};

export default MyCalendar;