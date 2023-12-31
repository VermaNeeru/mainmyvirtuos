import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './drop-file-input.module.css';
import { ImageConfig } from './config/ImageConfig';
import uploadImg from './config/cloud-upload-regular-240.png';
import Image from 'next/image';

interface DropFileInputProps {
    onFileChange: (files: File[]) => void;
}

const DropFileInput: React.FC<DropFileInputProps> = ({ onFileChange }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [fileList, setFileList] = useState<File[]>([]);

    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');

    const onDrop = () => wrapperRef.current?.classList.remove('dragover');

    const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            onFileChange(updatedList);
        }
    };

    const fileRemove = (file: File) => {
        const updatedList = fileList.filter((item) => item !== file);
        setFileList(updatedList);
        onFileChange(updatedList);
    };

    return (
        <div id="dropzonecss">
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <Image src={uploadImg} alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop} />
            </div>
            {fileList.length > 0 && (
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">Ready to upload</p>
                    {fileList.map((item, index) => (
                        <div key={index} className="drop-file-preview__item">
                            {/* <Image loader={({ src }) => `${src}`} width={100} height={100}
                                src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']}
                                alt=""
                            /> */}
                            <div className="drop-file-preview__item__info">
                                <p>{item.name}</p>
                                <p>{item.size}B</p>
                            </div>
                            <span
                                className="drop-file-preview__item__del"
                                onClick={() => fileRemove(item)}
                            >
                                x
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

DropFileInput.propTypes = {
    onFileChange: PropTypes.any, // Keep the type as 'any'
    // onFileChange: PropTypes.func
};

export default DropFileInput;
