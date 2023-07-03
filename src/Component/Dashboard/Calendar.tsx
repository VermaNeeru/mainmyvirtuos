import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);
const MyCalendar = () => {


    return (
        <>
            <div style={{ height: "600px" }}>
                <Calendar
                    localizer={localizer}

                    startAccessor="start"
                    endAccessor="end"
                    style={{ flex: 1 }}
                />
            </div>
        </>
    );
};

export default MyCalendar;