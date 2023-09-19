import { gql } from "@apollo/client";

export const GET_Manufacturers = gql`
  query Manufacturers {
    manufacturers {
        id
        manufacturer_name
    status
    }
  }
`;

export const GET_Manufacturer_BY_ID = gql`
  query Manufacturer($id: Int!) {
    manufacturer(id: $id) {
        id
        manufacturer_name
    status
    }
  }
`;


export const ADD_Manufacturer_MUTATION = gql`
  mutation CreateManufacturer($createManufacturerInput: CreateManufacturerInput!) {
    createManufacturer(createManufacturerInput: $createManufacturerInput){
      id
    }
  }
`;

export const UPDATE_Manufacturer_MUTATION = gql`
  mutation UpdateManufacturer($updateManufacturerInput: UpdateManufacturerInput!) {
    updateManufacturer(updateManufacturerInput: $updateManufacturerInput)
  }
`;

export const DELETE_Manufacturer_MUTATION = gql`
mutation RemoveManufacturer($id: Int!) {
  removeManufacturer(id: $id)
}
`;

export const REMOVE_MULTIPLE_Manufacturers = gql`
  mutation RemoveMultipleManufacturers($ids: [Int!]!) {
    removeMultipleManufacturers(ids: $ids)
  }
`;

