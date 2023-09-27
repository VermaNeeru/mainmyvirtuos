import React, { useState, useEffect } from 'react';

const IPAddress = () => {
    const [ip, setIp] = useState('');

    useEffect(() => {
        async function fetchIP() {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIp(data.ip);
            } catch (error) {
                console.error('Error fetching IP:', error);
            }
        }

        fetchIP();
    }, []);

    return ip;
};

export const getIp = async () => {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
};

export default IPAddress;
