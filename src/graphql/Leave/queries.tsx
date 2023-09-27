import { gql } from "@apollo/client";

export const GET_LEAVE_RULES = gql`
  query Leaverules {
    leaverules {
        id
        rule_name
        rule_description
        rule_condition
        rule_status
        leave_type_id
        user_type_id    
    }
  }
`;

export const GET_LEAVE_RULE_BY_ID = gql`
  query Leaverule($id: Int!) {
    leaverule(id: $id) {
        id
        rule_name
        rule_description
        rule_condition
        rule_status
        leave_type_id
        user_type_id
    }
  }
`;

export const GET_FILTERED_LEAVE_RULES = gql`
query FilterLeaverules($filter: String!) {
    filterLeaverules(filter: $filter) {
        id
        rule_name
        rule_description
        rule_condition
        rule_status
        leave_type_id
        user_type_id
  }
}
`;

export const ADD_LEAVE_RULE_MUTATION = gql`
  mutation CreateLeaverule($createLeaveruleInput: CreateLeaveruleInput!) {
    createLeaverule(createLeaveruleInput: $createLeaveruleInput){
      id
    }
  }
`;

export const UPDATE_LEAVE_RULE_MUTATION = gql`
  mutation UpdateLeaverule($updateLeaveruleInput: UpdateLeaveruleInput!) {
    updateLeaverule(updateLeaveruleInput: $updateLeaveruleInput)
  }
`;

export const DELETE_LEAVE_RULE_MUTATION = gql`
mutation RemoveLeaverule($id: Int!) {
  removeLeaverule(id: $id)
}
`;

export const REMOVE_MULTIPLE_LEAVE_RULES = gql`
  mutation RemoveMultipleLeaverules($ids: [Int!]!) {
    removeMultipleLeaverules(ids: $ids)
  }
`;

