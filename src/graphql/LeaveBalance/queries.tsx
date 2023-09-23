import { gql } from "@apollo/client";

export const GET_Useryearlyleavebalances = gql`
  query Useryearlyleavebalances {
    useryearlyleavebalances {
        id
        leave_count
        user{
          firstname
          lastname
        }
        leavetype{
          leave_type_name
          leave_type_code
          leave_type_role
        }
        status
    }
  }
`;

export const GET_Useryearlyleavebalance_BY_ID = gql`
  query Useryearlyleavebalance($id: Int!) {
    useryearlyleavebalance(id: $id) {
        id
        leave_count
        user{
          firstname
          lastname
        }
        leavetype{
          leave_type_name
          leave_type_code
          leave_type_role
        }
        status
    }
  }
`;



export const ADD_Useryearlyleavebalance_MUTATION = gql`
  mutation CreateUseryearlyleavebalance($createUseryearlyleavebalanceInput: CreateUseryearlyleavebalanceInput!) {
    createUseryearlyleavebalance(createUseryearlyleavebalanceInput: $createUseryearlyleavebalanceInput){
      id
    }
  }
`;

export const UPDATE_Useryearlyleavebalance_MUTATION = gql`
  mutation UpdateUseryearlyleavebalance($updateUseryearlyleavebalanceInput: UpdateUseryearlyleavebalanceInput!) {
    updateUseryearlyleavebalance(updateUseryearlyleavebalanceInput: $updateUseryearlyleavebalanceInput)
  }
`;

export const DELETE_Useryearlyleavebalance_MUTATION = gql`
mutation RemoveUseryearlyleavebalance($id: Int!) {
  removeUseryearlyleavebalance(id: $id)
}
`;

export const REMOVE_MULTIPLE_Useryearlyleavebalances = gql`
  mutation RemoveMultipleUseryearlyleavebalances($ids: [Int!]!) {
    removeMultipleUseryearlyleavebalances(ids: $ids)
  }
`;

