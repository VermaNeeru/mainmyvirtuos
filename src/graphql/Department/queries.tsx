import { gql } from "@apollo/client";

export const GET_Departments = gql`
  query Departments {
    departments {
        id
        department_name
        department_code
        department_color
        department_status
    }
  }
`;

export const GET_Department_BY_ID = gql`
  query Department($id: Int!) {
    department(id: $id) {
        id
        department_name
        department_code
        department_color
        department_status
    }
  }
`;


export const ADD_Department_MUTATION = gql`
  mutation CreateDepartment($createDepartmentInput: CreateDepartmentInput!) {
    createDepartment(createDepartmentInput: $createDepartmentInput){
      id
    }
  }
`;

export const UPDATE_Department_MUTATION = gql`
  mutation UpdateDepartment($updateDepartmentInput: UpdateDepartmentInput!) {
    updateDepartment(updateDepartmentInput: $updateDepartmentInput)
  }
`;

export const DELETE_Department_MUTATION = gql`
mutation RemoveDepartment($id: Int!) {
  removeDepartment(id: $id)
}
`;

export const REMOVE_MULTIPLE_Departments = gql`
  mutation RemoveMultipleDepartments($ids: [Int!]!) {
    removeMultipleDepartments(ids: $ids)
  }
`;

