import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { useDropzone } from 'react-dropzone';
import { XCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import AWS from 'aws-sdk';

// import awsConfig from '../../awsConfig'; // Import the AWS configuration
// Define the type for the onFileDrop prop
type OnFileDropFunction = (acceptedFiles: File[]) => void;
// interface DragDropFileProps {
//     onFileDrop: (acceptedFiles: File[]) => void;
//     handleFileUrl: (url: string) => void; // Define this prop for passing the fileUrl
// }
interface DragDropFileProps {
    onFileDrop?: (acceptedFiles: File[]) => void;
    handleFileUrl?: (url: string) => void;
    handleUploadedFiles?: (urls: string[]) => void;
}

interface FileDropzoneProps {
    onFileDrop: OnFileDropFunction;
}
AWS.config.update({
    accessKeyId: 'AKIA5OGENUOFMH34TIVU',
    secretAccessKey: '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',
    region: 'ap-south-1', // Set this to the correct region
});

// AWS.config.update(awsConfig); // Use the imported AWS configuration

const s3 = new AWS.S3();
// const DragDropFile: React.FC<DragDropFileProps> = ({ onFileDrop, handleFileUrl }) => {
// const DragDropFile: React.FC<DragDropFileProps> = ({ onFileDrop, handleFileUrl, handleUploadedFiles }) => {
const DragDropFile: React.FC<DragDropFileProps> = ({
    onFileDrop,
    handleFileUrl,
    handleUploadedFiles
}) => {
    const [fileUrl1, setFileUrl1] = useState<string | null>(null);
    const [droppedFile, setDroppedFile] = useState<File | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const handleFileDrop = async (acceptedFiles: File[]) => {
        try {
            const s3BucketName = 'myvirtuos';
            const folder = 'uploads';

            const uploadedFileUrls: string[] = [];

            for (const file of acceptedFiles) {
                // Generate a unique filename by appending Date.now()
                const timestamp = Date.now();
                const uniqueFileName = `${timestamp}_${file.name}`;

                // Upload the file to S3
                const fileName = `${folder}/${uniqueFileName}`;
                const params = {
                    Bucket: s3BucketName,
                    Key: fileName,
                    Body: file,
                };

                await s3.upload(params).promise();

                // Get the URL of the uploaded file
                const fileUrl = `https://${s3BucketName}.s3.amazonaws.com/${fileName}`;

                // Log the file URL to the console
                console.log('Uploaded File URL:', fileUrl);

                // Add the file URL to the list of uploadedFileUrls
                uploadedFileUrls.push(fileUrl);
            }
            if (handleUploadedFiles) {
                handleUploadedFiles(uploadedFileUrls);
            }
            // Log the array of uploaded file URLs to the console
            console.log('All file URLs uploaded:', uploadedFileUrls);

            // Update the state with all uploaded file URLs
            setUploadedFiles([...uploadedFiles, ...uploadedFileUrls]);

            console.log('All files uploaded successfully.');
        } catch (error) {
            console.error('Error uploading files to S3:', error);
        }
    };

    const UploadedFile: React.FC<{ fileUrl: string }> = ({ fileUrl }) => {
        // Log the value of fileUrl to the console
        console.log("File URL:", fileUrl);

        return (
            <div className="flex items-center  mt-2">

                <div className="mr-2">
                    <Image
                        loader={({ src }) => src}
                        src={fileUrl}
                        height={200}
                        width={200}
                        alt="Uploaded File Preview"
                        className="max-h-52"
                    />
                </div>
                <p className="lg:text-sm text-xs font-semibold lg:font-semibold">
                    File Name: {fileUrl.split('/').pop()}
                </p>
            </div>
        );
    };


    const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileDrop }) => {
        const [droppedFile, setDroppedFile] = useState<File | null>(null);

        const onDrop = useCallback((acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            console.log(file)
            setDroppedFile(file);
            onFileDrop(acceptedFiles);  
             console.log(acceptedFiles)
        }, [onFileDrop]);

        const { getRootProps, getInputProps } = useDropzone({ onDrop });

        return (
            <div className="bg-gray-50 border-dashed border-2 border-gray-300 px-4 py-4 w-full">
                {droppedFile ? (
                    <div>
                        <span onClick={() => setDroppedFile(null)}><XCircleIcon className="h-6 w-6 text-gray-500" /></span>
                    </div>
                ) : (
                    <div></div>
                )}
                <div {...getRootProps()} className='dropzone'>
                    <input {...getInputProps()} />
                    {droppedFile ? (
                        <div>
                            <div className='border border-gray-300 px-4 py-4 w-full'>
                                {/* {droppedFile.type.includes('image') ? ( */}
                                {droppedFile.type.includes('image') ? (
                                    <Image
                                        loader={({ src }) => `${src}`}
                                        src={URL.createObjectURL(droppedFile)}
                                        height={100} width={100}
                                        alt="Dropped File Preview"
                                        className='max-h-52'
                                    />
                                ) : (
                                    <p>File Type: {droppedFile.type}</p>
                                )}
                                <p className='lg:text-sm text-xs font-semibold lg:font-semibold'>File Name: {droppedFile.name}</p>
                            </div>
                        </div>
                    ) : (
                        <p className='text-gray-700 font-semibold text-sm lg:text-lg'>Drag &amp; drop files here, or click to select files..</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div>
            <Head>
                <title>Dropzone in Next.js</title>
            </Head>
            <main>
                <h1>Attachment</h1>
                <FileDropzone onFileDrop={handleFileDrop} />
                <div className='mt-2'>
                    <p className='text-gray-500 text-sm font-semibold'>Max. 10MB</p>
                </div>
                <div>
                    {uploadedFiles.length > 0 && (
                        <div className="mt-4">
                            <h2>Uploaded Files</h2>
                            <div>
                                {uploadedFiles.map((fileUrl, index) => (
                                    <UploadedFile key={index} fileUrl={fileUrl} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default DragDropFile;