import { gql } from "@apollo/client";

export const GET_Skills = gql`
  query Skills {
    skills {
        id
        skill_name
    status
    }
  }
`;

export const GET_Skill_BY_ID = gql`
  query Skill($id: Int!) {
    skill(id: $id) {
        id
        skill_name
    status
    }
  }
`;


export const ADD_Skill_MUTATION = gql`
  mutation CreateSkill($createSkillInput: CreateSkillInput!) {
    createSkill(createSkillInput: $createSkillInput){
      id
    }
  }
`;

export const UPDATE_Skill_MUTATION = gql`
  mutation UpdateSkill($updateSkillInput: UpdateSkillInput!) {
    updateSkill(updateSkillInput: $updateSkillInput)
  }
`;

export const DELETE_Skill_MUTATION = gql`
mutation RemoveSkill($id: Int!) {
  removeSkill(id: $id)
}
`;

export const REMOVE_MULTIPLE_Skills = gql`
  mutation RemoveMultipleSkills($ids: [Int!]!) {
    removeMultipleSkills(ids: $ids)
  }
`;

