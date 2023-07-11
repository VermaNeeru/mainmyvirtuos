import DropFileInput from '@/Component/drop-file-input/DropFileInput'
import React from 'react'

export default function Testing() {
    return (
        <div>
            <DropFileInput onFileChange={function (files: File[]): void {
                throw new Error('Function not implemented.')
            }} />
        </div>
    )
}
