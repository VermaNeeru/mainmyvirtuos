import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
// Custom hook to read and write cookies

interface UserData {
    id: number;
    firstname: string;
    lastname: string;
    officialemail: string;
    username: string;
    role: number;
    iat: number;
    exp: number;
}

export function getUserData(): UserData | null {
    const cookieValue = Cookies.get('authToken');

    if (!cookieValue) {
        return null;
    }

    const decoded = jwtDecode(cookieValue) as UserData;
    return decoded;
}