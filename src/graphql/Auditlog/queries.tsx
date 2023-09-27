import { gql } from "@apollo/client";

export const GET_Auditlogs = gql`
  query Auditlogs {
    auditlogs {
        id
    user_id
    table_name
    field_name
    browser
    os
    action
    page_url
    ip_address
    user{
      firstname
      lastname
    }
    }
  }
`;

export const GET_Auditlog_BY_ID = gql`
  query Auditlog($id: Int!) {
    auditlog(id: $id) {
        id
    user_id
    table_name
    field_name
    browser
    os
    action
    page_url
    ip_address
    user{
      firstname
      lastname
    }
    }
  }
`;


export const ADD_Auditlog_MUTATION = gql`
  mutation CreateAuditlog($createAuditlogInput: CreateAuditlogInput!) {
    createAuditlog(createAuditlogInput: $createAuditlogInput){
      id
    }
  }
`;

export const UPDATE_Auditlog_MUTATION = gql`
  mutation UpdateAuditlog($updateAuditlogInput: UpdateAuditlogInput!) {
    updateAuditlog(updateAuditlogInput: $updateAuditlogInput)
  }
`;

export const DELETE_Auditlog_MUTATION = gql`
mutation RemoveAuditlog($id: Int!) {
  removeAuditlog(id: $id)
}
`;

export const REMOVE_MULTIPLE_Auditlogs = gql`
  mutation RemoveMultipleAuditlogs($ids: [Int!]!) {
    removeMultipleAuditlogs(ids: $ids)
  }
`;

