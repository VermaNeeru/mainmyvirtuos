import { gql } from "@apollo/client";

export const ADD_BASIC_INFO_MUTATION = gql`
  mutation CreateBasicinfo($createBasicinfoInput: CreateBasicinfoInput!) {
    createBasicinfo(createBasicinfoInput: $createBasicinfoInput){
      id
    }
  }
`;





