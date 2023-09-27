import { gql } from "@apollo/client";

export const GET_Companies = gql`
  query Companies {
    companies {
        id
        company_name
        status
    }
  }
`;

export const GET_Company_BY_ID = gql`
  query Company($id: Int!) {
    company(id: $id) {
        id
        company_name
        status
    }
  }
`;


export const ADD_Company_MUTATION = gql`
  mutation CreateCompany($createCompanyInput: CreateCompanyInput!) {
    createCompany(createCompanyInput: $createCompanyInput){
      id
    }
  }
`;

export const UPDATE_Company_MUTATION = gql`
  mutation UpdateCompany($updateCompanyInput: UpdateCompanyInput!) {
    updateCompany(updateCompanyInput: $updateCompanyInput)
  }
`;

export const DELETE_Company_MUTATION = gql`
mutation RemoveCompany($id: Int!) {
  removeCompany(id: $id)
}
`;

export const REMOVE_MULTIPLE_Companies = gql`
  mutation RemoveMultipleCompanies($ids: [Int!]!) {
    removeMultipleCompanies(ids: $ids)
  }
`;

