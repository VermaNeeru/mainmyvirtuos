import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]
export default function TextEditor({ onEditorContentChange, updateData }: any) {
    console.log('Editor', updateData)
    const [editorContent, setEditorContent] = useState('');
    // useEffect(() => {
    //     setEditorContent(updateData)
    // }, [updateData])

    console.log('editorContent', editorContent)
    const handleEditorChange = (content: string) => {
        setEditorContent(content);
        onEditorContentChange(content);
        // console.log('editorContent', editorContent)
    };
    return (
        <div className='h-72'>
            <QuillNoSSRWrapper
                {...(updateData && updateData !== '' && { value: updateData })}
                modules={modules}
                formats={formats}
                theme="snow"
                className='h-52'
                onChange={handleEditorChange}
            />

            <div dangerouslySetInnerHTML={{ __html: editorContent }} className='hidden' />
        </div>
    )


}