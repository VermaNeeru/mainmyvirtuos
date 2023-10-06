
import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { useDropzone } from 'react-dropzone';
import { XCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import AWS from 'aws-sdk';

// import awsConfig from '../../awsConfig'; // Import the AWS configuration
// Define the type for the onFileDrop prop
type OnFileDropFunction = (acceptedFiles: File[]) => void;
interface DragDropFileProps {
    onFileDrop: (acceptedFiles: File[]) => void;
    handleFileUrl: (url: string) => void; // Define this prop for passing the fileUrl
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
const DragDropFile: React.FC<DragDropFileProps> = ({ onFileDrop, handleFileUrl }) => {
    const [fileUrl1, setFileUrl1] = useState<string | null>(null);
    const [droppedFile, setDroppedFile] = useState<File | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleFileDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]; // Assuming you want to use the first accepted file
        console.log(file);

        try {
            // Generate a unique filename by appending Date.now()
            const timestamp = Date.now();
            const uniqueFileName = `${timestamp}_${file.name}`;

            // Upload the file to S3
            const s3BucketName = 'myvirtuos';
            const folder = 'uploads'; // Your desired folder in the S3 bucket
            const fileName = `${folder}/${uniqueFileName}`;
            const params = {
                Bucket: s3BucketName,
                Key: fileName,
                Body: file,
            };

            await s3.upload(params).promise();

            // Get the URL of the uploaded file
            const fileUrl = `https://${s3BucketName}.s3.amazonaws.com/${fileName}`;
            console.log("fileurl is", fileUrl);
            // Set the fileUrl in the state
            setFileUrl1(fileUrl);
            // You can use the fileUrl or perform additional actions with it as needed
            handleFileUrl(fileUrl);

            // Add the uploaded file to the list of uploadedFiles
            setUploadedFiles([...uploadedFiles, file]);
            console.log("uploadedFiles is", uploadedFiles);
            // onFileDrop(acceptedFiles);
        } catch (error) {
            console.error('Error uploading to S3:', error);
        }
    };
    const UploadedFile: React.FC<{ file: File }> = ({ file }) => (
        <div className="flex items-center mt-2">
            {file.type.includes("image") ? (
                <div className="mr-2">
                    <Image
                        loader={({ src }) => src}
                        src={URL.createObjectURL(file)}
                        height={100}
                        width={100}
                        alt="Uploaded File Preview"
                        className="max-h-52"
                    />
                </div>
            ) : (
                <div className="mr-2">
                    <p>File Type: {file.type}</p>
                </div>
            )}
            <p className="lg:text-sm text-xs font-semibold lg:font-semibold">
                File Name: {file.name}
            </p>
        </div>
    );


    const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileDrop }) => {
        const [droppedFile, setDroppedFile] = useState<File | null>(null);

        const onDrop = useCallback((acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            setDroppedFile(file);
            onFileDrop(acceptedFiles);
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
                                {uploadedFiles.map((file, index) => (
                                    <UploadedFile key={index} file={file} />
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
