import { gql } from "@apollo/client";

export const GET_Teams = gql`
  query Teams {
    teams {
        id
        name
        code
    status
    cdate
    }
  }
`;

export const GET_Team_BY_ID = gql`
  query Team($id: Int!) {
    team(id: $id) {
        id
        name
        code
    status
    cdate
    }
  }
`;


export const ADD_Team_MUTATION = gql`
  mutation CreateTeam($createTeamInput: CreateTeamInput!) {
    createTeam(createTeamInput: $createTeamInput){
      id
    }
  }
`;

export const UPDATE_Team_MUTATION = gql`
  mutation UpdateTeam($updateTeamInput: UpdateTeamInput!) {
    updateTeam(updateTeamInput: $updateTeamInput)
  }
`;

export const DELETE_Team_MUTATION = gql`
mutation RemoveTeam($id: Int!) {
  removeTeam(id: $id)
}
`;

export const REMOVE_MULTIPLE_Teams = gql`
  mutation RemoveMultipleTeams($ids: [Int!]!) {
    removeMultipleTeams(ids: $ids)
  }
`;

