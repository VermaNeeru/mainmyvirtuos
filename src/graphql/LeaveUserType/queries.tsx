import { gql } from "@apollo/client";

export const GET_Leaveusertypes = gql`
  query Leaveusertypes {
    leaveusertypes {
        id
        user_type_id
    leave_type_id
    quarter_one
    quarter_two
    quarter_three
    leave_count
    leavetype{
        id
        leave_type_name
      }
    }
  }
`;

export const GET_Leaveusertype_BY_ID = gql`
  query Leaveusertype($id: Int!) {
    leaveusertype(id: $id) {
        id
        user_type_id
    leave_type_id
    quarter_one
    quarter_two
    quarter_three
    leave_count
    leavetype{
        id
        leave_type_name
      }
    }
  }
`;


export const GET_Leaveusertype_BY_LTID = gql`
  query LeaveusertypeByLtid($id: Int!) {
    leaveusertypeByLtid(id: $id) {
        id
        user_type_id
    leave_type_id
    quarter_one
    quarter_two
    quarter_three
    leave_count
    leavetype{
        id
        leave_type_name
      }
      usertype{
        id
        type_name
      }
    }
  }
`;


export const ADD_Leaveusertype_MUTATION = gql`
  mutation CreateLeaveusertype($createLeaveusertypeInput: CreateLeaveusertypeInput!) {
    createLeaveusertype(createLeaveusertypeInput: $createLeaveusertypeInput){
      id
    }
  }
`;

export const UPDATE_Leaveusertype_MUTATION = gql`
  mutation UpdateLeaveusertype($updateLeaveusertypeInput: UpdateLeaveusertypeInput!) {
    updateLeaveusertype(updateLeaveusertypeInput: $updateLeaveusertypeInput)
  }
`;

export const DELETE_Leaveusertype_MUTATION = gql`
mutation RemoveLeaveusertype($id: Int!) {
  removeLeaveusertype(id: $id)
}
`;

export const REMOVE_MULTIPLE_Leaveusertypes = gql`
  mutation RemoveMultipleLeaveusertypes($ids: [Int!]!) {
    removeMultipleLeaveusertypes(ids: $ids)
  }
`;

