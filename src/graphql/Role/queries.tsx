import { gql } from "@apollo/client";

export const GET_Roles = gql`
  query Roles {
    roles {
        id
   role_name
    priority
    status
    }
  }
`;

export const GET_Role_BY_ID = gql`
  query Role($id: Int!) {
    role(id: $id) {
        id
   role_name
    priority
    status
    }
  }
`;


export const ADD_Role_MUTATION = gql`
  mutation CreateRole($createRoleInput: CreateRoleInput!) {
    createRole(createRoleInput: $createRoleInput){
      id
    }
  }
`;

export const UPDATE_Role_MUTATION = gql`
  mutation UpdateRole($updateRoleInput: UpdateRoleInput!) {
    updateRole(updateRoleInput: $updateRoleInput)
  }
`;

export const DELETE_Role_MUTATION = gql`
mutation RemoveRole($id: Int!) {
  removeRole(id: $id)
}
`;

export const REMOVE_MULTIPLE_Roles = gql`
  mutation RemoveMultipleRoles($ids: [Int!]!) {
    removeMultipleRoles(ids: $ids)
  }
`;

