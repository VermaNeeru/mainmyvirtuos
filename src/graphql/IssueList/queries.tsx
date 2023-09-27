import { gql } from "@apollo/client";

export const GET_Issues = gql`
  query Issues {
    issues {
        id
        issue_color
        issue_description
        status
        role_id
        role{
            id
            role_name
          }
    }
  }
`;

export const GET_Issue_BY_ID = gql`
  query Issue($id: Int!) {
    issue(id: $id) {
        id
        issue_color
        issue_description
        status
        role_id
        role{
            id
            role_name
          }
    }
  }
`;


export const ADD_Issue_MUTATION = gql`
  mutation CreateIssue($createIssueInput: CreateIssueInput!) {
    createIssue(createIssueInput: $createIssueInput){
      id
    }
  }
`;

export const UPDATE_Issue_MUTATION = gql`
  mutation UpdateIssue($updateIssueInput: UpdateIssueInput!) {
    updateIssue(updateIssueInput: $updateIssueInput)
  }
`;

export const DELETE_Issue_MUTATION = gql`
mutation RemoveIssue($id: Int!) {
  removeIssue(id: $id)
}
`;

export const REMOVE_MULTIPLE_Issues = gql`
  mutation RemoveMultipleIssues($ids: [Int!]!) {
    removeMultipleIssues(ids: $ids)
  }
`;

