import { gql } from "@apollo/client";

export const ADD_ActivityAudience_MUTATION = gql`
  mutation CreateActivitiesaudience($createActivitiesaudienceInput: CreateActivitiesaudienceInput!) {
    createActivitiesaudience(createActivitiesaudienceInput: $createActivitiesaudienceInput)
  }
`;