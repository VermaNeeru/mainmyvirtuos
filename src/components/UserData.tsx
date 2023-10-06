import React, { useState } from 'react'
import { UseCookies } from './UseCookies';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
export default function UserData() {
    const [cookie, setCookie] = useState('');
    // console.log(key);
    // useEffect(() => {
    // Read the cookie when the component mounts
    // console.log(key);
    const cookieValue = Cookies.get('authToken');
    console.log('cookie', cookieValue);
    // setCookie(cookieValue);
    // }, [key]);


    // const [authToken, setAuthToken, removeAuthToken] = UseCookies('authToken');
    console.log('AuthToken:', cookieValue);
    const decoded = jwt_decode(cookieValue);
    console.log('decoded', JSON.stringify(decoded));

    return decoded;
}
