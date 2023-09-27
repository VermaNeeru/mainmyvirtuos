import { gql } from "@apollo/client";

export const GET_Otherexpenses = gql`
  query Otherexpenses {
    otherexpenses {
        id
        user_id
        status
        expense_type
        expense_date
        expense_amount
        notes
        details
        drive_link
        account_approval
        amount_approved
        amount_requested
        user{
            firstname
            lastname
        }
    }
  }
`;

export const GET_Otherexpense_BY_ID = gql`
  query Otherexpense($id: Int!) {
    otherexpense(id: $id) {
        id
        user_id
        status
        expense_type
        expense_date
        expense_amount
        notes
        details
        drive_link
        account_approval
        amount_approved
        amount_requested
        user{
            firstname
            lastname
        }
    }
  }
`;

export const GET_Otherexpense_BY_UID = gql`
  query OtherexpenseByUid($id: Int!) {
    otherexpenseByUid(id: $id) {
        id
        user_id
        status
        expense_type
        expense_date
        expense_amount
        notes
        details
        drive_link
        account_approval
        amount_approved
        amount_requested
        user{
            firstname
            lastname
        }
    }
  }
`;


export const ADD_Otherexpense_MUTATION = gql`
  mutation CreateOtherexpense($createOtherexpenseInput: CreateOtherexpenseInput!) {
    createOtherexpense(createOtherexpenseInput: $createOtherexpenseInput){
      id
    }
  }
`;

export const UPDATE_Otherexpense_MUTATION = gql`
  mutation UpdateOtherexpense($updateOtherexpenseInput: UpdateOtherexpenseInput!) {
    updateOtherexpense(updateOtherexpenseInput: $updateOtherexpenseInput)
  }
`;

export const DELETE_Otherexpense_MUTATION = gql`
mutation RemoveOtherexpense($id: Int!) {
  removeOtherexpense(id: $id)
}
`;

export const REMOVE_MULTIPLE_Otherexpenses = gql`
  mutation RemoveMultipleOtherexpenses($ids: [Int!]!) {
    removeMultipleOtherexpenses(ids: $ids)
  }
`;

