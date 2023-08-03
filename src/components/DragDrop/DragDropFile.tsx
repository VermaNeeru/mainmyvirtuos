import React from 'react';
import Head from 'next/head';
import FileDropzone from './FileDropzone';

const DragDropFile = () => {
    const handleFileDrop = (acceptedFiles: any) => {
        console.log('Accepted files:', acceptedFiles);
        // Perform any additional actions with the accepted files (e.g., uploading to a server)
    };

    return (
        <div>
            <Head>
                <title>Dropzone in Next.js</title>
            </Head>
            <main>
                <h1>Attachement</h1>
                <FileDropzone onFileDrop={handleFileDrop} />
                <div className='mt-2'>
                    <p className='text-gray-500 text-sm font-semibold'>Max. 10MB</p>
                </div>

            </main>
        </div>
    );
};

export default DragDropFile;
