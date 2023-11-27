import { gql } from "@apollo/client";

export const GET_USER_ACCESS_TYPES = gql`
  query Useraccesstypes {
    useraccesstypes {
        id
        access_type_name
        status
    }
  }
`;

export const GET_USER_ACCESS_TYPE_BY_ID = gql`
  query Useraccesstype($id: Int!) {
    useraccesstype(id: $id) {
        id
        access_type_name
        status
    }
  }
`;


export const ADD_USER_ACCESS_TYPE_MUTATION = gql`
  mutation CreateUseraccesstype($createUseraccesstypeInput: CreateUseraccesstypeInput!) {
    createUseraccesstype(createUseraccesstypeInput: $createUseraccesstypeInput){
      id
    }
  }
`;

export const UPDATE_USER_ACCESS_TYPE_MUTATION = gql`
  mutation UpdateUseraccesstype($updateUseraccesstypeInput: UpdateUseraccesstypeInput!) {
    updateUseraccesstype(updateUseraccesstypeInput: $updateUseraccesstypeInput)
  }
`;

export const DELETE_USER_ACCESS_TYPE_MUTATION = gql`
mutation RemoveUseraccesstype($id: Int!) {
  removeUseraccesstype(id: $id)
}
`;

export const REMOVE_MULTIPLE_USER_ACCESS_TYPES = gql`
  mutation RemoveMultipleUseraccesstypes($ids: [Int!]!) {
    removeMultipleUseraccesstypes(ids: $ids)
  }
`;

