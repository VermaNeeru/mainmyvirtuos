import { UPLOAD_MEDIA } from '@/graphql/Mediaupload/queries';
import { useMutation } from '@apollo/client';
import { ChangeEventHandler } from 'react';
// import UPLOAD_MEDIA from './yourUploadMediaMutation.graphql'; // Define your GraphQL mutation

export default function MediaUploadForm() {
    const [uploadMedia] = useMutation(UPLOAD_MEDIA);

    const handleFileUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
        console.log('Upload');
        const file = event.target.files?.[0];
        console.log(file);

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            console.log('FormData:', formData);

            try {
                console.log("hello");
                const { data } = await uploadMedia({ variables: { file: formData } });

                if (data && data.uploadMedia) {
                    const { id } = data.uploadMedia; // Remove "url" if you don't need it
                    console.log('Media uploaded successfully. ID:', id);
                }

                // Handle the uploaded media data as needed
            } catch (error: any) {
                console.error('Error uploading media', error.message);
            }
        }
    };


    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileUpload} />

        </div>
    );
}
