import { gql } from "@apollo/client";

export const GET_ALL_TEMPLATES = gql`
  query Templates {
    templates {
        id
    template_name
    template_constant
    template_description
    template_subject
    template_status
    template_type
    }
  }
`;

export const GET_TEMPLATE = gql`
  query GetTemplate($id: Int!) {
    template(id: $id) {
      id
      template_name
      template_type
    }
  }
`;