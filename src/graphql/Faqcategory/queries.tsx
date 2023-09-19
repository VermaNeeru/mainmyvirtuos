import { gql } from "@apollo/client";

export const GET_Faqcategories = gql`
  query Faqcategories {
    faqcategories {
        id
        category
        cat_name
    status
    }
  }
`;

export const GET_Faqcategory_BY_ID = gql`
  query Faqcategory($id: Int!) {
    faqcategory(id: $id) {
        id
        category
        cat_name
    status
    }
  }
`;


export const ADD_Faqcategory_MUTATION = gql`
  mutation CreateFaqcategory($createFaqcategoryInput: CreateFaqcategoryInput!) {
    createFaqcategory(createFaqcategoryInput: $createFaqcategoryInput){
      id
    }
  }
`;

export const UPDATE_Faqcategory_MUTATION = gql`
  mutation UpdateFaqcategory($updateFaqcategoryInput: UpdateFaqcategoryInput!) {
    updateFaqcategory(updateFaqcategoryInput: $updateFaqcategoryInput)
  }
`;

export const DELETE_Faqcategory_MUTATION = gql`
mutation RemoveFaqcategory($id: Int!) {
  removeFaqcategory(id: $id)
}
`;

export const REMOVE_MULTIPLE_Faqcategories = gql`
  mutation RemoveMultipleFaqcategories($ids: [Int!]!) {
    removeMultipleFaqcategories(ids: $ids)
  }
`;

