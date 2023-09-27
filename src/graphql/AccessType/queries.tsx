import { gql } from "@apollo/client";

export const GET_Useraccesstypes = gql`
  query Useraccesstypes {
    useraccesstypes {
        id
        access_type_name
    status
    }
  }
`;

export const GET_Useraccesstype_BY_ID = gql`
  query Useraccesstype($id: Int!) {
    useraccesstype(id: $id) {
        id
        access_type_name
    status
    }
  }
`;


export const ADD_Useraccesstype_MUTATION = gql`
  mutation CreateUseraccesstype($createUseraccesstypeInput: CreateUseraccesstypeInput!) {
    createUseraccesstype(createUseraccesstypeInput: $createUseraccesstypeInput){
      id
    }
  }
`;

export const UPDATE_Useraccesstype_MUTATION = gql`
  mutation UpdateUseraccesstype($updateUseraccesstypeInput: UpdateUseraccesstypeInput!) {
    updateUseraccesstype(updateUseraccesstypeInput: $updateUseraccesstypeInput)
  }
`;

export const DELETE_Useraccesstype_MUTATION = gql`
mutation RemoveUseraccesstype($id: Int!) {
  removeUseraccesstype(id: $id)
}
`;

export const REMOVE_MULTIPLE_Useraccesstypes = gql`
  mutation RemoveMultipleUseraccesstypes($ids: [Int!]!) {
    removeMultipleUseraccesstypes(ids: $ids)
  }
`;

