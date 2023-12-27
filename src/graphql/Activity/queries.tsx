import { gql } from "@apollo/client";

export const ADD_ACTIVITY_MUTATION = gql`
mutation CreateActivity($createActivityInput: CreateActivityInput!) {
    createActivity(createActivityInput: $createActivityInput){
      id
    }
  }  
`;

export const GET_ACTIVITY_POST = gql`
query {
  activities {
    id
    user_id
    status
    description
    user{
      id
      firstname
      lastname
      username
    }
    cdate
  }
}
`;