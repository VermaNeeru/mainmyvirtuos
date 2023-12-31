import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Disclosure } from '@headlessui/react'
import { EnvelopeIcon, TruckIcon, CheckIcon, ChevronUpDownIcon, MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/20/solid'
import CitySearch from '@/components/CitySearch';
import Link from 'next/link';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ADD_Travelrequest_MUTATION } from '@/graphql/Travel/queries';
import Alert from '@/components/Alert';
import { ADD_Traveldate_MUTATION } from '@/graphql/Traveldate/queries';
import { ADD_Travelhotel_MUTATION } from '@/graphql/Travelhotel/queries';
import { getUserData } from '@/components/UserData';


const traveltype = [
    { id: 1, name: 'Choose Travel Type' },
    { id: 2, name: 'OutStation' },
    { id: 3, name: 'Local/Delhi/NCR' },
]

const travelmode = [
    { id: 1, name: 'Choose Travel Mode' },
    { id: 2, name: 'Rail' },
    { id: 3, name: 'Road' },
    { id: 4, name: 'Flight' },
]

const travelpurpose = [
    { id: 1, name: 'Choose Travel Purpose' },
    { id: 2, name: 'Business Meeting' },
    { id: 3, name: 'Conference' },
    { id: 4, name: 'Training' },
    { id: 5, name: 'Field Visit' },
    { id: 6, name: 'Purchase Visit' },
    { id: 7, name: 'Internal Meeting' },
]

const travelassistance = [
    { id: 1, name: 'Choose Assistance' },
    { id: 2, name: 'Assistance Required' },
    { id: 3, name: 'Self Booking' },
]

const flightpreferance = [
    { id: 1, name: 'Choose Flight Preference' },
    { id: 2, name: 'Before 6am' },
    { id: 3, name: '6-10 am' },
    { id: 4, name: '10am-2pm' },
    { id: 5, name: '2pm - 6pm' },
    { id: 6, name: 'After 6pm' },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}
interface ListItem {
    fromAddress: string;
    toAddress: string;
    // Add other properties if needed
}
export default function AddTravelReq() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [checkin, setCheckin] = useState(new Date());
    const [checkout, setCheckout] = useState(new Date());

    const [selected, setSelected] = useState(traveltype[1])
    const [selectedTM, setSelectedTM] = useState(travelmode[0])
    const [selectedTP, setSelectedTP] = useState(travelpurpose[0])
    const [selectedTA, setSelectedTA] = useState(travelassistance[0])
    const [selectedFA, setSelectedFA] = useState(flightpreferance[0])
    const [selectedFA2, setSelectedFA2] = useState(flightpreferance[0])


    const [showTravelMode, setShowTravelMode] = useState(false);
    const [showTravelModeBox1, setShowTravelModeBox1] = useState(false);
    const [showTravelModeBox2, setShowTravelModeBox2] = useState(false);
    const [showTravelModeDetail1, setShowTravelModeDetail1] = useState(true);
    const [showTravelModeDetail2, setShowTravelModeDetail2] = useState(false);


    const [showAssistanceType, setShowAssistanceType] = useState(false);
    const [showAssistanceType1, setShowAssistanceType1] = useState(false);
    const [showTripType, setShowTripType] = useState(false);
    const [assistanceType1, setAssistanceType1] = useState(false);
    const [tripType, setTripType] = useState('');
    const [showArrivalDate, setShowArrivalDate] = useState(true);

    const [showDeleteMessage, setshowDeleteMessage] = useState(false);
    const [showDeletedMessage, setshowDeletedMessage] = useState(false);
    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setshowErrorMessage] = useState<boolean>(false);

    const [TravelRequestId, setTravelRequestId] = useState<number | null | undefined>()
    const userData = getUserData();
    const [userId, setUserId] = useState<number | undefined>(userData?.id)
    const [TravelName, setTravelName] = useState('')
    const [TravelType, setTravelType] = useState('')
    const [TravelMode, setTravelMode] = useState('')
    const [TravelNotes, setTravelNotes] = useState('')
    const [TravelPurpose, setTravelPurpose] = useState('')
    const [TravelStatus, setTravelStatus] = useState('')
    const [TravelAssistance, setTravelAssistance] = useState('')
    const [TravelApprovedBy, setTravelApprovedBy] = useState('')
    const [TravelDistance, setTravelDistance] = useState('')
    const [TravelAdvanceAmount, setTravelAdvanceAmount] = useState('')
    const [TravelAmountApproved, setTravelAmountApproved] = useState('')
    const [travelAssistanceType, setTravelAssistanceType] = useState('')
    const [travelAssistanceType1, setTravelAssistanceType1] = useState('')
    const [flightPreferenceFrom, setFlightPreferenceFrom] = useState('')
    const [flightPreferenceTo, setFlightPreferenceTo] = useState('')
    const [distance, setDistance] = useState('')

    const [dueDate, setDueDate] = useState('')
    const [hotelCity, setHotelCity] = useState('')



    const [TravelTripType, setTravelTripType] = useState('')

    const [fromLocation, setFromLocation] = useState('')
    const [toLocation, setToLocation] = useState('')

    // const [fromAddress, setFromAddress] = useState<string>([])
    // const [toAddress, setToAddress] = useState<string>([])
    const [fromAddress, setFromAddress] = useState<string>('');
    const [toAddress, setToAddress] = useState<string>('');  // Assuming toAddress is also a string

    const [city, setCity] = useState('')

    const [aError, setAError] = useState(false);
    const [bError, setBError] = useState(false);


    // Assuming listItems is an array of ListItem
    const [listItems, setListItems] = useState<ListItem[]>([]);
    // const [listItems, setListItems] = useState([{ fromAddress: '', toAddress: '' }]);

    const appendItem = () => {
        setListItems([...listItems, { fromAddress: '', toAddress: '' }]);
    };

    const removeItem = (index: number) => {
        if (listItems.length > 1) {
            const updatedList = [...listItems];
            updatedList.splice(index, 1);
            setListItems(updatedList);
        }
    };

    // const handleAddressChange = (index: number, field: string, value: any) => {
    //     const updatedListItems = [...listItems];
    //     updatedListItems[index][field] = value;
    //     setListItems(updatedListItems);
    // };

    const handleAddressChange = (index: number, field: string, value: any) => {
        const updatedListItems = [...listItems];
        // Use type assertion to inform TypeScript about the type of 'field'
        (updatedListItems[index] as any)[field] = value;
        setListItems(updatedListItems);
    };

    console.log(showTripType);
    // const [executeQuery, { loading, error, data: getQueryById }] = useLazyQuery(GET_TravelRequest_BY_ID);
    // const [fExecuteQuery, { loading: fLoading, error: fError, data: fData }] = useLazyQuery(GET_FILTERED_DIVISIONS);
    const [createQuery, { loading: createQueryLoading, error: createQueryError }] = useMutation(ADD_Travelrequest_MUTATION);
    const [createQueryTD, { loading: createQueryLoadingTD, error: createQueryErrorTD }] = useMutation(ADD_Traveldate_MUTATION);
    const [createQueryTH, { loading: createQueryLoadingTH, error: createQueryErrorTH }] = useMutation(ADD_Travelhotel_MUTATION);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
    useEffect(() => {
        console.log(selected)
        setShowTravelMode(true);
        if (selected.name === 'Local/Delhi/NCR') {
            setShowTravelModeBox2(true);
            setShowTravelModeBox1(false);
            setShowAssistanceType(false);
            setShowTravelModeDetail1(false);
            setShowTravelModeDetail2(true);
            setShowTripType(false);
        } else if (selected.name === 'OutStation') {
            setShowAssistanceType(true);
            setShowTravelModeBox1(true);
            setShowTravelModeBox2(false);

            setShowTravelModeDetail2(false);
            setShowTravelModeDetail1(true);

        } else {
            setShowAssistanceType(false);
            setShowTravelModeBox2(false);
            setShowTravelModeBox1(false);
            setShowTravelMode(false);


            setShowTravelModeDetail1(false);

            setShowTravelModeDetail2(false);
        }
    }, [selected])
    console.log(showTripType);
    useEffect(() => {
        console.log(travelAssistanceType)
        setShowTravelMode(true);
        if (travelAssistanceType === 'Assistance Required') {
            setShowAssistanceType1(true);
            setShowTripType(true);
        } else {
            setShowAssistanceType1(false);
            setShowTripType(false);
            setShowArrivalDate(true);
        }
    }, [travelAssistanceType])

    console.log(showTripType);
    useEffect(() => {
        console.log(travelAssistanceType1)
        setShowTravelMode(true);
        if (travelAssistanceType1 !== 'Hotel') {
            setShowTripType(true);
            if (tripType == 'Round Trip') {
                setShowArrivalDate(true);
            } else {
                setShowArrivalDate(false);
            }
        } else {
            setShowTripType(false);
            setShowArrivalDate(false);

        }
    }, [travelAssistanceType1,tripType])

    useEffect(() => {
        console.log(tripType)
        console.log(setShowArrivalDate)
        // setShowArrivalDate(true);
        if (tripType == 'Round Trip') {
            setShowArrivalDate(true);
        } else {
            setShowArrivalDate(false);
        }
    }, [tripType])

    console.log(showTripType);


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        console.log('called');
        // (!TravelName) ? setAError(true) : setAError(false);
        // (!TravelType) ? setBError(true) : setBError(false);
        // (!TravelAdvanceAmount) ? setBError(true) : setBError(false);
        // (!TravelMode) ? setBError(true) : setBError(false);
        // (!TravelNotes) ? setBError(true) : setBError(false);
        // (!TravelPurpose) ? setBError(true) : setBError(false);

        // if (aError == true || bError == true) {
        //     return;
        // }
        console.log('Submit');
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        //Add division
        try {
            console.log('Try to submit')
            console.log('travelName', TravelName)
            console.log('travelType', selected)
            console.log('travelStatus', TravelStatus)
            console.log('TravelMode', TravelMode)
            console.log('TravelNotes', TravelNotes)
            console.log('TravelPurpose', selectedTP)
            console.log('TravelAssistance', travelAssistanceType)
            console.log('TravelAssistanceType', travelAssistanceType1)
            console.log('TravelDistance', TravelDistance)
            console.log('TravelAdvanceAmount', TravelAdvanceAmount)
            console.log('TravelAmountApproved', TravelAmountApproved)
            console.log('TravelAssistanceType', travelAssistanceType)
            console.log('tripType', tripType)
            console.log('userId', userId)
            const { data: { createTravelrequest: { id: travelId } } } = await createQuery({
                variables: {
                    createTravelrequestInput: {
                        travel_name: TravelName,
                        travel_type: selected.name,
                        travel_purpose: selectedTP.name,
                        travel_mode: TravelMode,
                        travel_assistance: travelAssistanceType,
                        assistance_type: travelAssistanceType1,
                        distance: 100,
                        travel_notes: TravelNotes,
                        advance_amount: parseInt(TravelAdvanceAmount),
                        user_id: userId
                    },
                },
            });

            console.log('response', travelId);
            console.log('startDate', startDate);
            console.log('listItems count', listItems.length);

            if (selected.name == 'Local/Delhi/NCR') {
                console.log('Local/Delhi/NCR');
                for (const index in listItems) {
                    const fromAddress = listItems[index].fromAddress;
                    const toAddress = listItems[index].toAddress;
                    console.log('fromAddress', fromAddress);
                    console.log('toAddress', toAddress);
                    console.log('flightPreferenceFrom', selectedFA);
                    console.log('flightPreferenceTo', selectedFA2);
                    // Use the createTravelDate mutation to add addresses to the database

                    const { data: { createTraveldate: { id: travelDateId } } } = await createQueryTD({
                        variables: {
                            createTraveldateInput: {
                                travel_id: travelId, // Update with the correct travel_id
                                from_date: startDate, // Update with the correct date
                                to_date: endDate, // Update with the correct date
                                from_address: fromAddress,
                                to_address: toAddress,

                            },
                        },
                    });

                    // Check the response data if needed
                    console.log('Travel Date ID:', travelDateId);

                }

            }
            // if (listItems.length > 1) {
            //     console.log('listItems.length', listItems.length);
            //     for (const index in listItems) {
            //         console.log('List Item ID:', index);
            //         const fromAddress = listItems[index].fromAddress;
            //         const toAddress = listItems[index].toAddress;
            //         console.log('fromAddress', fromAddress);
            //         console.log('toAddress', toAddress);
            //         console.log('flightPreferenceFrom', selectedFA);
            //         console.log('flightPreferenceTo', selectedFA2);
            //         // Use the createTravelDate mutation to add addresses to the database
            //         if (travelAssistanceType1 == 'Flight' && tripType == 'Multicity') {
            //             console.log('Flight && Multicity');
            //             const preferencefrom = (selectedFA.name == 'Choose Flight Preference') ? '' : selectedFA.name;
            //             const preferenceto = (selectedFA2.name == 'Choose Flight Preference') ? '' : selectedFA2.name;
            //             const { data: { createTraveldate: { id: travelDateId } } } = await createQueryTD({
            //                 variables: {
            //                     createTraveldateInput: {
            //                         travel_id: travelId, // Update with the correct travel_id
            //                         from_date: startDate, // Update with the correct date
            //                         to_date: endDate, // Update with the correct date
            //                         from_address: fromAddress,
            //                         to_address: toAddress,
            //                         flight_preference: preferencefrom,

            //                     },
            //                 },
            //             });
            //             console.log('Travel Date ID:', travelDateId);
            //         }
            //         if (travelAssistanceType1 == 'Flight + Hotel' && tripType == 'Multicity') {
            //             console.log('Flight + Hotel && Multicity');
            //             const preferencefrom = (selectedFA.name == 'Choose Flight Preference') ? '' : selectedFA.name;
            //             const preferenceto = (selectedFA2.name == 'Choose Flight Preference') ? '' : selectedFA2.name;
            //             const { data: { createTraveldate: { id: travelDateId } } } = await createQueryTD({
            //                 variables: {
            //                     createTraveldateInput: {
            //                         travel_id: travelId, // Update with the correct travel_id
            //                         from_date: startDate, // Update with the correct date
            //                         to_date: endDate, // Update with the correct date
            //                         from_address: fromAddress,
            //                         to_address: toAddress,
            //                         flight_preference: preferencefrom,

            //                     },
            //                 },
            //             });
            //             console.log('Travel Date ID:', travelDateId);
            //             // Check the response data if needed

            //             const { data: { createTravelhotel: { id: travelHotelId } } } = await createQueryTH({
            //                 variables: {
            //                     createTravelhotelInput: {
            //                         travel_date_id: travelDateId,
            //                         checkin_date: checkin,
            //                         checkout_date: checkout,
            //                         city: city
            //                     },
            //                 },
            //             });

            //             console.log('Travel Hotel ID:', travelHotelId);
            //         }

            //     }
            // } else {
            if (selected.name == 'OutStation') {
                console.log('else');

                console.log('flightPreferenceFrom', selectedFA);
                console.log('flightPreferenceTo', selectedFA2);
                if (travelAssistanceType1 == 'Flight') {
                    console.log('Flight  && Round Trip');
                    const preferencefrom = (selectedFA.name == 'Choose Flight Preference') ? '' : selectedFA.name;
                    const preferenceto = (selectedFA2.name == 'Choose Flight Preference') ? '' : selectedFA2.name;
                    if (tripType == 'Round Trip') {
                        const { data: { createTraveldate: { id: travelDateId } } } = await createQueryTD({
                            variables: {
                                createTraveldateInput: {
                                    travel_id: travelId, // Update with the correct travel_id
                                    from_date: startDate, // Update with the correct date
                                    to_date: endDate, // Update with the correct date
                                    flight_preference: preferencefrom,
                                    from_address: fromLocation,
                                    to_address: toLocation,

                                },
                            },
                        });
                        console.log('Travel Date ID:', travelDateId);

                        const { data: { createTraveldate: { id: travelDateId1 } } } = await createQueryTD({
                            variables: {
                                createTraveldateInput: {
                                    travel_id: travelId, // Update with the correct travel_id
                                    from_date: startDate, // Update with the correct date
                                    to_date: endDate, // Update with the correct date
                                    from_address: fromLocation,
                                    to_address: toLocation,
                                    flight_preference: preferenceto,

                                },
                            },
                        });
                        console.log('Travel Date ID:', travelDateId1);

                        const { data: { createTravelhotel: { id: travelHotelId } } } = await createQueryTH({
                            variables: {
                                createTravelhotelInput: {
                                    travel_date_id: travelDateId1,
                                    checkin_date: checkin,
                                    checkout_date: checkout,
                                    city: city
                                },
                            },
                        });

                        console.log('Travel Hotel ID:', travelHotelId);


                    }

                    if (tripType == 'One Way' || tripType == 'Multicity') {
                        const { data: { createTraveldate: { id: travelDateId } } } = await createQueryTD({
                            variables: {
                                createTraveldateInput: {
                                    travel_id: travelId, // Update with the correct travel_id
                                    from_date: startDate, // Update with the correct date
                                    trip_type: tripType,
                                    flight_preference: preferencefrom,
                                    from_address: fromLocation,
                                    to_address: toLocation,

                                },
                            },
                        });
                        console.log('Travel Date ID:', travelDateId);


                        const { data: { createTravelhotel: { id: travelHotelId } } } = await createQueryTH({
                            variables: {
                                createTravelhotelInput: {
                                    travel_date_id: travelDateId,
                                    checkin_date: checkin,
                                    checkout_date: checkout,
                                    city: city
                                },
                            },
                        });

                        console.log('Travel Hotel ID:', travelHotelId);


                    }

                }



                if (travelAssistanceType1 == 'Hotel') {
                    console.log('Hotel');
                    const preferencefrom = (selectedFA.name == 'Choose Flight Preference') ? '' : selectedFA.name;
                    const preferenceto = (selectedFA2.name == 'Choose Flight Preference') ? '' : selectedFA2.name;
                    const { data: { createTraveldate: { id: travelDateId } } } = await createQueryTD({
                        variables: {
                            createTraveldateInput: {
                                travel_id: travelId, // Update with the correct travel_id
                                from_date: startDate, // Update with the correct date
                                to_date: endDate, // Update with the correct date
                                to_address: toAddress,
                            },
                        },
                    });
                    console.log('Travel Date ID:', travelDateId);
                    // Check the response data if needed

                    const { data: { createTravelhotel: { id: travelHotelId } } } = await createQueryTH({
                        variables: {
                            createTravelhotelInput: {
                                travel_date_id: travelDateId,
                                checkin_date: checkin,
                                checkout_date: checkout,
                                city: city
                            },
                        },
                    });

                    console.log('Travel Hotel ID:', travelHotelId);
                }

                if (travelAssistanceType1 == 'Flight + Hotel') {
                    console.log('Flight + Hotel');
                    if (tripType == 'One Way') {
                        console.log('One Way');
                        const preferencefrom = (selectedFA.name == 'Choose Flight Preference') ? '' : selectedFA.name;
                        const preferenceto = (selectedFA2.name == 'Choose Flight Preference') ? '' : selectedFA2.name;
                        const { data: { createTraveldate: { id: travelDateId } } } = await createQueryTD({
                            variables: {
                                createTraveldateInput: {
                                    travel_id: travelId, // Update with the correct travel_id
                                    from_date: startDate, // Update with the correct date
                                    to_date: endDate, // Update with the correct date
                                    to_address: toAddress,
                                },
                            },
                        });
                        console.log('Travel Date ID:', travelDateId);
                        // Check the response data if needed

                        const { data: { createTravelhotel: { id: travelHotelId } } } = await createQueryTH({
                            variables: {
                                createTravelhotelInput: {
                                    travel_date_id: travelDateId,
                                    checkin_date: checkin,
                                    checkout_date: checkout,
                                    city: city
                                },
                            },
                        });

                        console.log('Travel Hotel ID:', travelHotelId);
                    }
                    if (tripType == 'Round Trip') {
                        console.log('Round Trip');
                        const preferencefrom = (selectedFA.name == 'Choose Flight Preference') ? '' : selectedFA.name;
                        const preferenceto = (selectedFA2.name == 'Choose Flight Preference') ? '' : selectedFA2.name;
                        const { data: { createTraveldate: { id: travelDateId } } } = await createQueryTD({
                            variables: {
                                createTraveldateInput: {
                                    travel_id: travelId, // Update with the correct travel_id
                                    from_date: startDate, // Update with the correct date
                                    to_date: endDate, // Update with the correct date
                                    to_address: toAddress,
                                    trip_type: tripType,
                                    flight_preference: preferencefrom,

                                },
                            },
                        });
                        console.log('Travel Date ID:', travelDateId);
                        // Check the response data if needed

                        const { data: { createTraveldate: { id: travelDateId1 } } } = await createQueryTD({
                            variables: {
                                createTraveldateInput: {
                                    travel_id: travelId, // Update with the correct travel_id
                                    from_date: startDate, // Update with the correct date
                                    to_date: endDate, // Update with the correct date
                                    to_address: toAddress,
                                    trip_type: tripType,
                                    flight_preference: preferenceto,

                                },
                            },
                        });
                        console.log('Travel Date ID:', travelDateId1);
                        // Check the response data if needed

                        const { data: { createTravelhotel: { id: travelHotelId } } } = await createQueryTH({
                            variables: {
                                createTravelhotelInput: {
                                    travel_date_id: travelDateId1,
                                    checkin_date: checkin,
                                    checkout_date: checkout,
                                    city: city
                                },
                            },
                        });

                        console.log('Travel Hotel ID:', travelHotelId);
                    }

                }
                if (travelAssistanceType == 'Self Booking') {
                    console.log('Self Booking');
                    for (const index in listItems) {
                        const fromAddress = listItems[index].fromAddress;
                        const toAddress = listItems[index].toAddress;
                        console.log('fromAddress', fromAddress);
                        console.log('toAddress', toAddress);
                        console.log('flightPreferenceFrom', selectedFA);
                        console.log('flightPreferenceTo', selectedFA2);
                        // Use the createTravelDate mutation to add addresses to the database
                        const preferencefrom = (selectedFA.name == 'Choose Flight Preference') ? '' : selectedFA.name;
                        const preferenceto = (selectedFA2.name == 'Choose Flight Preference') ? '' : selectedFA2.name;
                        const { data: { createTraveldate: { id: travelDateId } } } = await createQueryTD({
                            variables: {
                                createTraveldateInput: {
                                    travel_id: travelId, // Update with the correct travel_id
                                    from_date: startDate, // Update with the correct date
                                    to_date: endDate, // Update with the correct date
                                    from_address: fromAddress,
                                    to_address: toAddress,
                                    flight_preference: preferencefrom,

                                },
                            },
                        });
                        console.log('Travel Date ID:', travelDateId);

                        const { data: { createTraveldate: { id: travelDateId1 } } } = await createQueryTD({
                            variables: {
                                createTraveldateInput: {
                                    travel_id: travelId, // Update with the correct travel_id
                                    from_date: startDate, // Update with the correct date
                                    to_date: endDate, // Update with the correct date
                                    from_address: fromAddress,
                                    to_address: toAddress,
                                    flight_preference: preferenceto,

                                },
                            },
                        });
                        console.log('Travel Date ID:', travelDateId1);

                        const { data: { createTravelhotel: { id: travelHotelId } } } = await createQueryTH({
                            variables: {
                                createTravelhotelInput: {
                                    travel_date_id: travelDateId1,
                                    checkin_date: checkin,
                                    checkout_date: checkout,
                                    city: city
                                },
                            },
                        });

                        console.log('Travel Hotel ID:', travelHotelId);

                    }
                }
            }
            // Clear the input fields or take any other necessary actions
            setFromAddress('');
            setToAddress('');

            setTravelName('');
            setTravelType('');
            setTravelStatus('');
            setTravelMode('');
            setTravelNotes('');
            setTravelPurpose('');

            setshowSuccessMessage(true);
            setshowErrorMessage(false);

            console.log('showSuccessMessage', showSuccessMessage);
            // console.log('response', data);
            // console.log('response', response.data);

            // }
        } catch (error) {
            setshowErrorMessage(true);

            console.log('catchError', error);
        }

        // console.log(category);

    };

    const handleCityValueChange = (newValue: { id: number; name: string }) => {
        console.log(newValue);
        setCity(newValue.name);
    };

    return (
        <div className=' w-full rounded px-2'>
            {showSuccessMessage && (
                // <Alert message="Division Added Successfully!" alertState={alertState} onAlertStateChange={handleAlertStateChange} />
                <Alert message="TravelRequest Added Successfully!" alertState={false} onAlertStateChange={function (newState: boolean): void {
                    throw new Error('Function not implemented.');
                } } />
            )}
            {showErrorMessage && (
                <Alert message="Something went wrong!" alertState={false} onAlertStateChange={function (newState: boolean): void {
                    throw new Error('Function not implemented.');
                } } />
            )}
            <div className="rounded-t mb-4 px-4 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            New Travel Request
                        </h2>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div className="relative  items-center space-x-3 rounded-lg border border-gray-300 bg-white lg:px-6 lg:py-5 px-2 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className="px-2 py-2">
                        <div className="lg:flex sm:items-center">
                            <div className="lg:flex-auto">
                            </div>
                            <div className="mt-4 lg:ml-16 ml-0 sm:mt-0 lg:flex-none">
                                <Link href='/travel'>
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
                    <div className=" mb-4 px-2 py-2">
                        <div className="space-y-2">
                            <div className="pb-4">
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <p className='px-2 py-2 text-sm text-gray-600'>Expenses entailed for this official visit / trip are to be added from the Add TravelExpenses section under Expenses. Expenses should be added by last day of the month for ECR reimbursements. Late ECR reimbursement claims shall not be entertained by the Accounts Team</p>
                                </div>
                                <div className="mt-2 grid lg:grid-cols-2 grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <TruckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                onChange={(e) => setTravelName(e.target.value)}
                                                value={TravelName}
                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Reason for Travel"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                    </div>
                                    <div className="sm:col-span-1">
                                        {/* travel type  */}
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
                                                                {traveltype.map((person) => (
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
                                        {/* travel purpose */}
                                        <Listbox value={selectedTP} onChange={setSelectedTP}>
                                            {({ open }) => (
                                                <>
                                                    <div className="relative mt-2">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                            <span className="block truncate">{selectedTP.name}</span>
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
                                                                {travelpurpose.map((person) => (
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
                                                                                <span className={classNames(selectedTP ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                    {person.name}
                                                                                </span>

                                                                                {selectedTP ? (
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
                                                <TruckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                onChange={(e) => setTravelAdvanceAmount(e.target.value)}
                                                value={TravelAdvanceAmount}

                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Advance Requested"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1" style={{ display: showTravelMode ? 'grid' : 'none' }}>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <TruckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <select
                                                id="location"
                                                name="location"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue="Canada"
                                                onChange={(e) => setTravelMode(e.target.value)}
                                                value={TravelMode}

                                                style={{ display: showTravelModeBox1 ? 'block' : 'none' }}
                                            >
                                                <option>Choose Travel Mode</option>
                                                <option value="Rail">Rail</option>
                                                <option value="Road">Road</option>
                                                <option value="Flight">Flight</option>
                                            </select>

                                            <select
                                                id="location"
                                                name="location"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue="Canada"
                                                onChange={(e) => setTravelMode(e.target.value)}
                                                value={TravelMode}
                                                style={{ display: showTravelModeBox2 ? 'block' : 'none' }}
                                            >
                                                <option>Choose Travel Mode</option>
                                                <option value="Car">Car</option>
                                                <option value="Bike">Bike</option>
                                                <option value="Cab">Cab</option>
                                                <option value="Metro/Bus">Metro/Bus</option>
                                                <option value="Auto/Rickshaw">Auto/Rickshaw</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1" style={{ display: showAssistanceType ? 'grid' : 'none' }}>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <TruckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <select
                                                id="location"
                                                name="location"
                                                onChange={(e) => setTravelAssistanceType(e.target.value)}
                                                value={travelAssistanceType}
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue="Canada"
                                            >
                                                <option>Choose Assistance</option>
                                                <option value="Assistance Required">Assistance Required</option>
                                                <option value="Self Booking">Self Booking</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1" style={{ display: showAssistanceType1 ? 'grid' : 'none' }}>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <TruckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <select
                                                id="location"
                                                name="location"
                                                onChange={(e) => setTravelAssistanceType1(e.target.value)}
                                                value={travelAssistanceType1}

                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue="Canada"
                                            >
                                                <option>Choose Assistance Type</option>
                                                <option value="Flight">Flight</option>
                                                <option value="Hotel">Hotel</option>
                                                <option value="Flight + Hotel">Flight + Hotel</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1" style={{ display: showTripType ? 'grid' : 'none' }}>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <TruckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <select
                                                id="location"
                                                name="location"
                                                onChange={(e) => setTripType(e.target.value)}
                                                value={tripType}
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue="Canada"
                                            >
                                                <option>Choose Trip Type</option>
                                                <option value="One Way">One Way</option>
                                                <option value="Round Trip">Round Trip</option>
                                                <option value="Multicity">Multicity</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <textarea
                                            rows={2}
                                            name="comment"
                                            id="comment"
                                            onChange={(e) => setTravelNotes(e.target.value)}
                                            value={TravelNotes}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                            placeholder="Notes"
                                        />
                                    </div>
                                </div>
                                <div style={{ display: showTravelModeDetail1 ? 'grid' : 'none' }} className="mt-2 grid lg:grid-cols-2 grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2 sm:grid-cols-2">

                                    <div className="sm:col-span-1">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Departure Date
                                        </label>
                                        <DatePicker selected={startDate} onChange=
                                            {(date: React.SetStateAction<Date>) => setStartDate(date)} className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <Listbox value={selectedFA} onChange={setSelectedFA}>
                                            {({ open }) => (
                                                <>
                                                    <div className="relative lg:mt-10">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                            <span className="block truncate">{selectedFA.name}</span>
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
                                                                {flightpreferance.map((person) => (
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
                                                                                <span className={classNames(selectedFA ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                    {person.name}
                                                                                </span>

                                                                                {selectedFA ? (
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
                                    <div className="sm:col-span-1" style={{ display: showArrivalDate ? 'grid' : 'none' }}>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Arrival Date
                                        </label>
                                        <DatePicker selected={endDate} onChange=
                                            {(date: React.SetStateAction<Date>) => setEndDate(date)} className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                    <div className="sm:col-span-1" style={{ display: showArrivalDate ? 'grid' : 'none' }}>
                                        <Listbox value={selectedFA2} onChange={setSelectedFA2}>
                                            {({ open }) => (
                                                <>
                                                    <div className="relative lg:mt-10">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                            <span className="block truncate">{selectedFA2.name}</span>
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
                                                                {flightpreferance.map((person) => (
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
                                                                                <span className={classNames(selectedFA2 ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                    {person.name}
                                                                                </span>

                                                                                {selectedFA2 ? (
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
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            onChange={(e) => setFromLocation(e.target.value)}
                                            value={fromLocation}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Departure City"
                                        />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            onChange={(e) => setToLocation(e.target.value)}
                                            value={toLocation}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Arrival City"
                                        />
                                    </div>
                                </div>
                                <div style={{ display: showTravelModeDetail2 ? 'block' : 'none' }} className="mt-2 grid lg:grid-cols-2 grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2 sm:grid-cols-2">
                                    <div className="mt-2 grid lg:grid-cols-3 grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                From Date
                                            </label>
                                            <DatePicker selected={startDate} onChange=
                                                {(date: React.SetStateAction<Date>) => setStartDate(date)} className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                            />
                                        </div>
                                    </div>
                                    {listItems?.map((item, index) => (
                                        <div key={index} className="mt-2 grid lg:grid-cols-3 grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2 sm:grid-cols-2">
                                            <div className="sm:col-span-1">
                                                <input
                                                    type="email"
                                                    name="fromAddress"
                                                    id={`fromAddress-${index}`}
                                                    onChange={(e) => handleAddressChange(index, 'fromAddress', e.target.value)}
                                                    value={listItems[index].fromAddress}
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="From Address"
                                                />
                                            </div>
                                            <div className="sm:col-span-1">
                                                <input
                                                    type="email"
                                                    name="toAddress"
                                                    id={`toAddress-${index}`}
                                                    onChange={(e) => handleAddressChange(index, 'toAddress', e.target.value)}
                                                    value={listItems[index].toAddress}
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="To Address"
                                                />
                                            </div>
                                            <div className="sm:col-span-1">
                                                <button onClick={() => removeItem(index)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                    <MinusSmallIcon className="h-6 w-6" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-2 grid lg:grid-cols-3 grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <button onClick={appendItem} className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                <PlusSmallIcon className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 grid lg:grid-cols-3 grid-cols-1 gap-x-6 lg:gap-y-4 gap-y-2 sm:grid-cols-2">

                                    <div className="sm:col-span-1">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Checkin Date
                                        </label>
                                        <DatePicker selected={checkin} onChange=
                                            {(date: React.SetStateAction<Date>) => setCheckin(date)} className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Checkout Date
                                        </label>
                                        <DatePicker selected={checkout} onChange=
                                            {(date: React.SetStateAction<Date>) => setCheckout(date)} className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <CitySearch onCityValueChange={handleCityValueChange} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" items-center">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>

                    </div>

                </div>


            </div>
        </div >
    )
}
