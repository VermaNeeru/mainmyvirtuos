import React from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function UnsetAllCookiesAndRedirect() {
    // const router = useRouter();

    // Unset/delete all cookies
    const cookieNames = Object.keys(Cookies.get());

    cookieNames.forEach(cookieName => {
        Cookies.remove(cookieName);
    });

    // Redirect to the login page
    // router.push('/login'); // Replace '/login' with the actual URL of your login page
    return (
        <div>

        </div>
    )
}
