import { gql } from "@apollo/client";

export const GET_Officialinfos = gql`
  query Officialinfos {
    officialinfos {
        id
        employee_code
        employment_status
        team
        doj
        division_id
        division{
          division_name
          division_code
        }
        user{
          username
        }
        manager1{
          username
        }
        manager2{
          username
        }
        department{
          department_name
          department_code
        }
    }
  }
`;

export const GET_Officialinfo_BY_ID = gql`
  query Officialinfo($id: Int!) {
    officialinfo(id: $id) {
        id
    employee_code
    employment_status
    team
    doj
    division_id
    division{
      division_name
      division_code
    }
    user{
      username
    }
    manager1{
      username
    }
    manager2{
      username
    }
    department{
      department_name
      department_code
    }
    }
  }
`;

export const GET_Officialinfo_BY_ECODE = gql`
  query UserDetailByCode($ecode: String!) {
    userDetailByCode(ecode: $ecode) {
        user_id
    }
  }
`;


export const ADD_Officialinfo_MUTATION = gql`
  mutation CreateOfficialinfo($createOfficialinfoInput: CreateOfficialinfoInput!) {
    createOfficialinfo(createOfficialinfoInput: $createOfficialinfoInput){
      id
    }
  }
`;

export const UPDATE_Officialinfo_MUTATION = gql`
  mutation UpdateOfficialinfo($updateOfficialinfoInput: UpdateOfficialinfoInput!) {
    updateOfficialinfo(updateOfficialinfoInput: $updateOfficialinfoInput)
  }
`;

export const DELETE_Officialinfo_MUTATION = gql`
mutation RemoveOfficialinfo($id: Int!) {
  removeOfficialinfo(id: $id)
}
`;

export const REMOVE_MULTIPLE_Officialinfos = gql`
  mutation RemoveMultipleOfficialinfos($ids: [Int!]!) {
    removeMultipleOfficialinfos(ids: $ids)
  }
`;

