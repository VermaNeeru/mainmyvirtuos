import React from 'react'
import AWS from 'aws-sdk';
AWS.config.update({
    accessKeyId: 'AKIA5OGENUOFMH34TIVU',
    secretAccessKey: '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',
    region: 'ap-south-1', // Set this to the correct region
});

export default function FileUpload(file: any, folder: any) {
    const s3 = new AWS.S3();
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}_${file.name}`;

    // Upload the file to S3
    const s3BucketName = 'myvirtuos';
    // const folder = 'uploads'; // Your desired folder in the S3 bucket
    const fileName = `${folder}/${uniqueFileName}`;
    const params = {
        Bucket: s3BucketName,
        Key: fileName,
        Body: file,
    };

    s3.upload(params).promise();

    // Get the URL of the uploaded file
    const fileUrl = `https://${s3BucketName}.s3.amazonaws.com/${fileName}`;

    return fileUrl;
}
