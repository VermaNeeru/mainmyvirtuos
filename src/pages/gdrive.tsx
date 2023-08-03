import React, { useState } from 'react';

const GDrive = () => {
    const [authUrl, setAuthUrl] = useState('');

    const handleAuthButtonClick = async () => {
        try {
            const response = await fetch('/api/googleDrive', {
                method: 'GET',
            });

            const data = await response.json();
            setAuthUrl(data.authUrl);
        } catch (error) {
            console.error('Error getting authentication URL:', error);
        }
    };

    return (
        <div>
            <h1>Google Drive Integration</h1>
            <button onClick={handleAuthButtonClick}>Connect with Google Drive</button>
            {authUrl && (
                <a href={authUrl} target="_blank" rel="noopener noreferrer">
                    Authorize Google Drive
                </a>
            )}
        </div>
    );
};

export default GDrive;
