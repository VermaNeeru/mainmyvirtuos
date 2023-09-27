import { gql } from "@apollo/client";

export const GET_Issuecategories = gql`
  query Issuecategories {
    issuecategories {
        id
        name
    status
    }
  }
`;

export const GET_Issuecategory_BY_ID = gql`
  query Issuecategory($id: Int!) {
    issuecategory(id: $id) {
        id
        name
    status
    }
  }
`;


export const ADD_Issuecategory_MUTATION = gql`
  mutation CreateIssuecategory($createIssuecategoryInput: CreateIssuecategoryInput!) {
    createIssuecategory(createIssuecategoryInput: $createIssuecategoryInput){
      id
    }
  }
`;

export const UPDATE_Issuecategory_MUTATION = gql`
  mutation UpdateIssuecategory($updateIssuecategoryInput: UpdateIssuecategoryInput!) {
    updateIssuecategory(updateIssuecategoryInput: $updateIssuecategoryInput)
  }
`;

export const DELETE_Issuecategory_MUTATION = gql`
mutation RemoveIssuecategory($id: Int!) {
  removeIssuecategory(id: $id)
}
`;

export const REMOVE_MULTIPLE_Issuecategories = gql`
  mutation RemoveMultipleIssuecategories($ids: [Int!]!) {
    removeMultipleIssuecategories(ids: $ids)
  }
`;

