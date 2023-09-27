import { gql } from "@apollo/client";

export const ADD_ACTIVITY_MUTATION = gql`
mutation CreateActivity($createActivityInput: CreateActivityInput!) {
    createActivity(createActivityInput: $createActivityInput){
      id
    }
  }  
`;