import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// Custom hook to read and write cookies
export function UseCookies(key: any) {
    const [cookie, setCookie] = useState<any>('');
    console.log(key);
    useEffect(() => {
        // Read the cookie when the component mounts
        console.log(key);
        const cookieValue = Cookies.get(key);
        console.log('cookie', cookieValue);
        setCookie(cookieValue);
    }, [key]);

    const updateCookie = (value: string, options = {}) => {
        // Write the cookie with optional options
        Cookies.set(key, value, options);
        setCookie(value);
    };

    const removeCookie = () => {
        // Remove the cookie
        Cookies.remove(key);
        setCookie(null);
    };

    return [cookie, updateCookie, removeCookie];
}
