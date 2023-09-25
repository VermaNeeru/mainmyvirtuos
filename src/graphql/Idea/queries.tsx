import { gql } from "@apollo/client";

export const GET_Ideas = gql`
  query Ideas {
    ideas {
        id
    idea_for
    idea_category
    idea_description
    submit_type
    user{
      firstname
      lastname
    }
    }
  }
`;

export const GET_Idea_BY_ID = gql`
  query Idea($id: Int!) {
    idea(id: $id) {
        id
    idea_for
    idea_category
    idea_description
    submit_type
    user{
      firstname
      lastname
    }
    }
  }
`;


export const ADD_Idea_MUTATION = gql`
  mutation CreateIdea($createIdeaInput: CreateIdeaInput!) {
    createIdea(createIdeaInput: $createIdeaInput){
      id
    }
  }
`;

export const UPDATE_Idea_MUTATION = gql`
  mutation UpdateIdea($updateIdeaInput: UpdateIdeaInput!) {
    updateIdea(updateIdeaInput: $updateIdeaInput)
  }
`;

export const DELETE_Idea_MUTATION = gql`
mutation RemoveIdea($id: Int!) {
  removeIdea(id: $id)
}
`;

export const REMOVE_MULTIPLE_Ideas = gql`
  mutation RemoveMultipleIdeas($ids: [Int!]!) {
    removeMultipleIdeas(ids: $ids)
  }
`;

