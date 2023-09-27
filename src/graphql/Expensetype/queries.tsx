import { gql } from "@apollo/client";

export const GET_Expensetypes = gql`
  query Expensetypes {
    expensetypes {
        id
        type_name
        color
        status
    }
  }
`;

export const GET_Expensetype_BY_ID = gql`
  query Expensetype($id: Int!) {
    expensetype(id: $id) {
        id
        type_name
        color
        status
    }
  }
`;


export const ADD_Expensetype_MUTATION = gql`
  mutation CreateExpensetype($createExpensetypeInput: CreateExpensetypeInput!) {
    createExpensetype(createExpensetypeInput: $createExpensetypeInput){
      id
    }
  }
`;

export const UPDATE_Expensetype_MUTATION = gql`
  mutation UpdateExpensetype($updateExpensetypeInput: UpdateExpensetypeInput!) {
    updateExpensetype(updateExpensetypeInput: $updateExpensetypeInput)
  }
`;

export const DELETE_Expensetype_MUTATION = gql`
mutation RemoveExpensetype($id: Int!) {
  removeExpensetype(id: $id)
}
`;

export const REMOVE_MULTIPLE_Expensetypes = gql`
  mutation RemoveMultipleExpensetypes($ids: [Int!]!) {
    removeMultipleExpensetypes(ids: $ids)
  }
`;

