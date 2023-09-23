import { gql } from "@apollo/client";

export const GET_Tutorials = gql`
  query Tutorials {
    tutorials {
        id
        user_id
        tutorial_name
        attachment
        status
        user{
          firstname
          lastname
        }
    }
  }
`;

export const GET_Tutorial_BY_ID = gql`
  query Tutorial($id: Int!) {
    tutorial(id: $id) {
        id
        user_id
        tutorial_name
        attachment
        status
        user{
          firstname
          lastname
        }
    }
  }
`;


export const ADD_Tutorial_MUTATION = gql`
  mutation CreateTutorial($createTutorialInput: CreateTutorialInput!) {
    createTutorial(createTutorialInput: $createTutorialInput){
      id
    }
  }
`;

export const UPDATE_Tutorial_MUTATION = gql`
  mutation UpdateTutorial($updateTutorialInput: UpdateTutorialInput!) {
    updateTutorial(updateTutorialInput: $updateTutorialInput)
  }
`;

export const DELETE_Tutorial_MUTATION = gql`
mutation RemoveTutorial($id: Int!) {
  removeTutorial(id: $id)
}
`;

export const REMOVE_MULTIPLE_Tutorials = gql`
  mutation RemoveMultipleTutorials($ids: [Int!]!) {
    removeMultipleTutorials(ids: $ids)
  }
`;

