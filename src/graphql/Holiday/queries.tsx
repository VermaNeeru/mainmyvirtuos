import { gql } from "@apollo/client";

export const GET_Holidaylists = gql`
  query Holidaylists {
    holidaylists {
        id
    holiday_name
    holiday_type
    holiday_year
    holiday_date
    holiday_image
    holiday_description
    notes
    }
  }
`;

export const GET_Holidaylist_BY_ID = gql`
  query Holidaylist($id: Int!) {
    holidaylist(id: $id) {
        id
        holiday_name
        holiday_type
        holiday_year
        holiday_date
        holiday_image
        holiday_description
        notes
    }
  }
`;


export const ADD_Holidaylist_MUTATION = gql`
  mutation CreateHolidaylist($createHolidaylistInput: CreateHolidaylistInput!) {
    createHolidaylist(createHolidaylistInput: $createHolidaylistInput){
      id
    }
  }
`;

export const UPDATE_Holidaylist_MUTATION = gql`
  mutation UpdateHolidaylist($updateHolidaylistInput: UpdateHolidaylistInput!) {
    updateHolidaylist(updateHolidaylistInput: $updateHolidaylistInput)
  }
`;

export const DELETE_Holidaylist_MUTATION = gql`
mutation RemoveHolidaylist($id: Int!) {
  removeHolidaylist(id: $id)
}
`;

export const REMOVE_MULTIPLE_Holidaylists = gql`
  mutation RemoveMultipleHolidaylists($ids: [Int!]!) {
    removeMultipleHolidaylists(ids: $ids)
  }
`;

