import React from 'react'
import Calendar from 'reactjs-availability-calendar'
// import './yearcalendar.css'
export default function YearViewCalendar() {
    const bookings = [
        {
            from: new Date('03-08-2023'),
            to: new Date('03-08-2023'),
            // middayCheckout: false,
        },
        {
            from: new Date('01-16-2022'),
            to: new Date('01-27-2022'),
            middayCheckout: true,
        },
        {
            from: '06-25-2022',
            to: '07-03-2022',
            middayCheckout: false,
        },
    ]

    return (
        <div id="yearview">
            <Calendar bookings={bookings} showKey />
        </div>

    )
}