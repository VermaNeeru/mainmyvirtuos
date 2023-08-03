import React from 'react';
import Slider from 'react-slick';

const people = [
    {
        name: 'J4-State Fourth of July Events for 2023! Celebrate Independence Day!',
        title: 'Knotts Berry Farm Will Celebrate Independence Day 2023 with a ...  DAPS MAGIC',
        role: 'Thu, Jun 22 2023',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://myvirtuos.com/uploads/holiday_image/holiday_picture.jpg',
    },
    {
        name: 'J4-State Fourth of July Events for 2023! Celebrate Independence Day!',
        title: 'Knotts Berry Farm Will Celebrate Independence Day 2023 with a ...  DAPS MAGIC',
        role: 'Thu, Jun 22 2023',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://myvirtuos.com/uploads/holiday_image/holiday_picture.jpg',
    },
    {
        name: 'J4-State Fourth of July Events for 2023! Celebrate Independence Day!',
        title: 'Knotts Berry Farm Will Celebrate Independence Day 2023 with a ...  DAPS MAGIC',
        role: 'Thu, Jun 22 2023',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://myvirtuos.com/uploads/holiday_image/holiday_picture.jpg',
    },
    {
        name: 'J4-State Fourth of July Events for 2023! Celebrate Independence Day!',
        title: 'Knotts Berry Farm Will Celebrate Independence Day 2023 with a ...  DAPS MAGIC',
        role: 'Thu, Jun 22 2023',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://myvirtuos.com/uploads/holiday_image/holiday_picture.jpg',
    },

    // More people...
]
const HolidaysList = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };
    return (
        <div>

            {/* Your content to be scrolled horizontally goes here */}
            {/* <p>Content 1</p>
                <p>Content 2</p>
                <p>Content 3</p> */}
            <Slider {...settings}>
                <div>
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {people.map((person) => (
                            <li
                                key={person.email}
                                className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                            >
                                <div className="flex flex-1 flex-col p-8">
                                    <img className="mx-auto  flex-shrink-0 rounded" src={person.imageUrl} alt="" />
                                    <h3 className="mt-6 text-sm font-medium text-gray-900">{person.name}</h3>
                                    <dl className="mt-1 flex flex-grow flex-col justify-between">
                                        <dd className="text-sm text-gray-500">{person.title}</dd>
                                        <dd className="mt-3">
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                {person.role}
                                            </span>
                                        </dd>
                                    </dl>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>


            </Slider>

            {/* Add as many elements as you want */}

        </div>
    );
};

export default HolidaysList;
