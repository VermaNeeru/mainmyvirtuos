import { gql } from "@apollo/client";

export const GET_DIVISIONS = gql`
  query Divisions {
    divisions {
        id
        division_name
        division_code
        division_color
        status
    }
  }
`;

export const GET_DIVISION_BY_ID = gql`
  query Division($id: Int!) {
    division(id: $id) {
        id
        division_name
        division_code
        division_color
        status
    }
  }
`;

export const GET_FILTERED_DIVISIONS = gql`
query FilterDivisions($filter: String!) {
  filterDivisions(filter: $filter) {
    id
    division_name
    division_code
    division_color
    status
  }
}
`;

export const ADD_DIVISION_MUTATION = gql`
  mutation CreateDivision($createDivisionInput: CreateDivisionInput!) {
    createDivision(createDivisionInput: $createDivisionInput){
      id
    }
  }
`;

export const UPDATE_DIVISION_MUTATION = gql`
  mutation UpdateDivision($updateDivisionInput: UpdateDivisionInput!) {
    updateDivision(updateDivisionInput: $updateDivisionInput)
  }
`;

export const DELETE_DIVISION_MUTATION = gql`
mutation RemoveDivision($id: Int!) {
  removeDivision(id: $id)
}
`;

export const REMOVE_MULTIPLE_DIVISIONS = gql`
  mutation RemoveMultipleDivisions($ids: [Int!]!) {
    removeMultipleDivisions(ids: $ids)
  }
`;

