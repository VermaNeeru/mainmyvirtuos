import { gql } from "@apollo/client";

export const GET_Leavetypes = gql`
  query Leavetypes {
    leavetypes {
        id
        leave_color
        leave_type_name
        leave_type_code
        leave_type_role
        leave_type_description
        encashable
        carry_forwarded
    }
  }
`;

export const GET_Leavetype_BY_ID = gql`
  query Leavetype($id: Int!) {
    leavetype(id: $id) {
        id
        leave_color
        leave_type_name
        leave_type_code
        leave_type_role
        leave_type_description
        encashable
        carry_forwarded
    }
  }
`;


export const ADD_Leavetype_MUTATION = gql`
  mutation CreateLeavetype($createLeavetypeInput: CreateLeavetypeInput!) {
    createLeavetype(createLeavetypeInput: $createLeavetypeInput){
      id
    }
  }
`;

export const UPDATE_Leavetype_MUTATION = gql`
  mutation UpdateLeavetype($updateLeavetypeInput: UpdateLeavetypeInput!) {
    updateLeavetype(updateLeavetypeInput: $updateLeavetypeInput)
  }
`;

export const DELETE_Leavetype_MUTATION = gql`
mutation RemoveLeavetype($id: Int!) {
  removeLeavetype(id: $id)
}
`;

export const REMOVE_MULTIPLE_Leavetypes = gql`
  mutation RemoveMultipleLeavetypes($ids: [Int!]!) {
    removeMultipleLeavetypes(ids: $ids)
  }
`;

