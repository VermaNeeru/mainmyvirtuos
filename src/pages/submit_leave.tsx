import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_Leave, CREATE_WFH, GET_ALL_FAq, GET_FaqById, GET_OfficalInfoByUser } from '@/graphql/User/queries';
import { useRouter } from 'next/router';



export default function SubmitLeave() {
  
  const router = useRouter();
  const { leaveType, startDate, endDate, leaveReason } = router.query;
  // Log the query parameters to the console
  console.log('Query Parameters:', { leaveType, startDate, endDate, leaveReason });
    return (
        <div className=' w-full rounded px-2'>
          <h1>Submit leave --in progress</h1>
        </div>
    )
}
