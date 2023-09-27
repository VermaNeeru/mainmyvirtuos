import { gql } from "@apollo/client";

export const ADD_AuditLog_MUTATION = gql`
  mutation CreateAuditlog($createAuditlogInput: CreateAuditlogInput!) {
    createAuditlog(createAuditlogInput: $createAuditlogInput)
  }
`;