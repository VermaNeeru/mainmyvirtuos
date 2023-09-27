import { gql } from "@apollo/client";

export const GET_Faqs = gql`
  query Faqs {
    faqs {
        id
        cat_id
    faq_ques
    faq_ans
    faq_featured
    status
    faqcategory{
      id
      cat_name
      category
      status
    }
   
    }
  }
`;

export const GET_Faq_BY_ID = gql`
  query Faq($id: Int!) {
    faq(id: $id) {
        id
        cat_id
    faq_ques
    faq_ans
    faq_featured
    status
    faqcategory{
      id
      cat_name
      category
      status
    }
   
    }
  }
`;


export const ADD_Faq_MUTATION = gql`
  mutation CreateFaq($createFaqInput: CreateFaqInput!) {
    createFaq(createFaqInput: $createFaqInput){
      id
    }
  }
`;

export const UPDATE_Faq_MUTATION = gql`
  mutation UpdateFaq($updateFaqInput: UpdateFaqInput!) {
    updateFaq(updateFaqInput: $updateFaqInput)
  }
`;

export const DELETE_Faq_MUTATION = gql`
mutation RemoveFaq($id: Int!) {
  removeFaq(id: $id)
}
`;

export const REMOVE_MULTIPLE_Faqs = gql`
  mutation RemoveMultipleFaqs($ids: [Int!]!) {
    removeMultipleFaqs(ids: $ids)
  }
`;

