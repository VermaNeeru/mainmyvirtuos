import { gql } from "@apollo/client";

export const GET_USER_TYPES = gql`
  query Usertypes {
    usertypes {
        id
    type_name
    status
    }
  }
`;

export const GET_USER_TYPE_BY_ID = gql`
  query Usertype($id: Int!) {
    usertype(id: $id) {
        id
    type_name
    status
    }
  }
`;


export const ADD_USER_TYPE_MUTATION = gql`
  mutation CreateUsertype($createUsertypeInput: CreateUsertypeInput!) {
    createUsertype(createUsertypeInput: $createUsertypeInput){
      id
    }
  }
`;

export const UPDATE_USER_TYPE_MUTATION = gql`
  mutation UpdateUsertype($updateUsertypeInput: UpdateUsertypeInput!) {
    updateUsertype(updateUsertypeInput: $updateUsertypeInput)
  }
`;

export const DELETE_USER_TYPE_MUTATION = gql`
mutation RemoveUsertype($id: Int!) {
  removeUsertype(id: $id)
}
`;

export const REMOVE_MULTIPLE_USER_TYPES = gql`
  mutation RemoveMultipleUsertypes($ids: [Int!]!) {
    removeMultipleUsertypes(ids: $ids)
  }
`;

