import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { XCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';

// Define the type for the onFileDrop prop
type OnFileDropFunction = (acceptedFiles: File[]) => void;

interface FileDropzoneProps {
    onFileDrop: OnFileDropFunction;
}

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

export default FileDropzone;
