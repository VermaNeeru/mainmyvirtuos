import { gql } from "@apollo/client";

export const GET_Templates = gql`
  query Templates {
    templates {
        id
        template_name
         template_type
         template_status
         template_subject
         template_constant
         template_description
    }
  }
`;

export const GET_Template_BY_ID = gql`
  query Template($id: Int!) {
    template(id: $id) {
        id
        template_name
         template_type
         template_status
         template_subject
         template_constant
         template_description
    }
  }
`;


export const ADD_Template_MUTATION = gql`
  mutation CreateTemplate($createTemplateInput: CreateTemplateInput!) {
    createTemplate(createTemplateInput: $createTemplateInput){
      id
    }
  }
`;

export const UPDATE_Template_MUTATION = gql`
  mutation UpdateTemplate($updateTemplateInput: UpdateTemplateInput!) {
    updateTemplate(updateTemplateInput: $updateTemplateInput)
  }
`;

export const DELETE_Template_MUTATION = gql`
mutation RemoveTemplate($id: Int!) {
  removeTemplate(id: $id)
}
`;

export const REMOVE_MULTIPLE_Templates = gql`
  mutation RemoveMultipleTemplates($ids: [Int!]!) {
    removeMultipleTemplates(ids: $ids)
  }
`;

