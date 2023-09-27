import { gql } from "@apollo/client";

export const GET_Modules = gql`
  query Modules {
    modules {
        id
        parent_id
      module_name
        module_controller
        submodule_name
        class_name
        sort_order
        status
    }
  }
`;

export const GET_Module_BY_ID = gql`
  query Module($id: Int!) {
    module(id: $id) {
        id
  parent_id
module_name
  module_controller
  submodule_name
  class_name
  sort_order
  status
    status
    }
  }
`;


export const ADD_Module_MUTATION = gql`
  mutation CreateModule($createModuleInput: CreateModuleInput!) {
    createModule(createModuleInput: $createModuleInput){
      id
    }
  }
`;

export const UPDATE_Module_MUTATION = gql`
  mutation UpdateModule($updateModuleInput: UpdateModuleInput!) {
    updateModule(updateModuleInput: $updateModuleInput)
  }
`;

export const DELETE_Module_MUTATION = gql`
mutation RemoveModule($id: Int!) {
  removeModule(id: $id)
}
`;

export const REMOVE_MULTIPLE_Modules = gql`
  mutation RemoveMultipleModules($ids: [Int!]!) {
    removeMultipleModules(ids: $ids)
  }
`;

