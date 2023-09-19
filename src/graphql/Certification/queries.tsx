import { gql } from "@apollo/client";

export const GET_Certifications = gql`
  query Certifications {
    certifications {
          id
   certification_name
    status
    }
  }
`;

export const GET_Certification_BY_ID = gql`
  query Certification($id: Int!) {
    certification(id: $id) {
        id
        certification_name
    status
    }
  }
`;


export const ADD_Certification_MUTATION = gql`
  mutation CreateCertification($createCertificationInput: CreateCertificationInput!) {
    createCertification(createCertificationInput: $createCertificationInput){
      id
    }
  }
`;

export const UPDATE_Certification_MUTATION = gql`
  mutation UpdateCertification($updateCertificationInput: UpdateCertificationInput!) {
    updateCertification(updateCertificationInput: $updateCertificationInput)
  }
`;

export const DELETE_Certification_MUTATION = gql`
mutation RemoveCertification($id: Int!) {
  removeCertification(id: $id)
}
`;

export const REMOVE_MULTIPLE_Certifications = gql`
  mutation RemoveMultipleCertifications($ids: [Int!]!) {
    removeMultipleCertifications(ids: $ids)
  }
`;

