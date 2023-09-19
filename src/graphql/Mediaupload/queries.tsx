import { gql } from "@apollo/client";

// export const UPLOAD_MEDIA = gql`
//   query UploadMedia {
//     uploadMedia {

//     }
//   }
// `;

export const UPLOAD_MEDIA = gql`
mutation UploadMedia($file: Upload!) {
    uploadMedia(file: $file) {
      id
    }
  }
`;

