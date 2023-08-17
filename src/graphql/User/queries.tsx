import { gql } from "@apollo/client";

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



