import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_Leave, CREATE_WFH, GET_ALL_FAq, GET_FaqById, GET_OfficalInfoByUser } from '@/graphql/User/queries';



export default function SubmitLeave() {
  

    return (
        <div className=' w-full rounded px-2'>
          <h1>Submit leave --in progress</h1>
        </div>
    )
}
