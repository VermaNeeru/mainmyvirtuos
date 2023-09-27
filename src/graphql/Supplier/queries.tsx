import { gql } from "@apollo/client";

export const GET_Suppliers = gql`
  query Suppliers {
    suppliers {
        id
        supplier_name
    status
    }
  }
`;

export const GET_Supplier_BY_ID = gql`
  query Supplier($id: Int!) {
    supplier(id: $id) {
        id
        supplier_name
    status
    }
  }
`;


export const ADD_Supplier_MUTATION = gql`
  mutation CreateSupplier($createSupplierInput: CreateSupplierInput!) {
    createSupplier(createSupplierInput: $createSupplierInput){
      id
    }
  }
`;

export const UPDATE_Supplier_MUTATION = gql`
  mutation UpdateSupplier($updateSupplierInput: UpdateSupplierInput!) {
    updateSupplier(updateSupplierInput: $updateSupplierInput)
  }
`;

export const DELETE_Supplier_MUTATION = gql`
mutation RemoveSupplier($id: Int!) {
  removeSupplier(id: $id)
}
`;

export const REMOVE_MULTIPLE_Suppliers = gql`
  mutation RemoveMultipleSuppliers($ids: [Int!]!) {
    removeMultipleSuppliers(ids: $ids)
  }
`;

