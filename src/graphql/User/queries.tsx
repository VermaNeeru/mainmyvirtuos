import { gql } from "@apollo/client";

export const GET_Login = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      id
      firstname
      lastname
      username
      password
      role
      officialemail
      extn
      gender
      designation
      # Include any other user fields you want to retrieve upon login
    }
  }
}


`;

export const GET_ForgotPassword = gql`
mutation SendEmailToUser($email: String!, $template: String!) {  
  sendEmailToUser(email: $email,  templateName: $template) 
}
`;
export const CREATE_DOCUMENT_UPLOAD_MUTATION = gql`
mutation CreateDocumentUpload($createDocumentUploadInput: CreateDocumentuploadInput!) {
  createDocumentupload(createDocumentuploadInput: $createDocumentUploadInput) {
    id
    user_id
    role_id
    viewer_id
    document_name
    document_description
    document_attachment
    document_access
  }
}

`;



export const GET_ChangePassword= gql`
mutation changePassword($resetKey: String!, $newPassword: String!) {
  changePassword(resetKey: $resetKey, newPassword: $newPassword)
}

`;
export const GET_CATEGORIES = gql`
  query GetAllUsers {
    getalluser {
        id
        firstname
        lastname
        officialemail
        extn
        designation
        gender
        education
        hobbies
        status
    }
  }
`;

export const GET_Employees = gql`
  query GetAllUsers {
    getalluser {
        id
        firstname
        lastname
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput)
  }
`;


// export const ADD_USER_MUTATION = gql`
//   mutation CreateUser($createUserInput: CreateUserInput!) {
//     createUser(createUserInput: $createUserInput) {
//       firstname
//       lastname
//       email
//       mobile
//       status
//     }
//   }
// `;

// export const UPDATE_CATEGORY_MUTATION = gql`
//   mutation UpdateCategory($updateCategoryArgs: UpdateCategoryArgs!) {
//     updateCategory(updateCategoryArgs: $updateCategoryArgs)
//   }
// `;

// export const DELETE_CATEGORY = gql`
//   mutation DeleteCategory($categoryId: Int!) {
//     deleteCategory(categoryId: $categoryId)
//   }
// `;



