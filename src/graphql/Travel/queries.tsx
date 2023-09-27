import { gql } from "@apollo/client";

export const GET_Travelrequests = gql`
  query Travelrequests {
    travelrequests {
        id
        user{
          firstname
          lastname
        }
        travel_type
        travel_name
        travel_mode
        travel_notes
        travel_status
        travel_purpose
        travel_assistance
        travel_approved_by
        distance
        advance_amount
        amount_approved
        assistance_type
        approvedby{
          firstname
          lastname
        }
    }
  }
`;

export const GET_Travelrequest_BY_ID = gql`
  query Travelrequest($id: Int!) {
    travelrequest(id: $id) {
        id
        user{
          firstname
          lastname
        }
        travel_type
        travel_name
        travel_mode
        travel_notes
        travel_status
        travel_purpose
        travel_assistance
        travel_approved_by
        distance
        advance_amount
        amount_approved
        assistance_type
        approvedby{
          firstname
          lastname
        }
    }
  }
`;

export const GET_Travelrequest_BY_UID = gql`
  query TravelrequestByUid($id: Int!) {
    travelrequestByUid(id: $id) {
        id
        user{
          firstname
          lastname
        }
        travel_type
        travel_name
        travel_mode
        travel_notes
        travel_status
        travel_purpose
        travel_assistance
        travel_approved_by
        distance
        advance_amount
        amount_approved
        assistance_type
        approvedby{
          firstname
          lastname
        }
    }
  }
`;


export const ADD_Travelrequest_MUTATION = gql`
  mutation CreateTravelrequest($createTravelrequestInput: CreateTravelrequestInput!) {
    createTravelrequest(createTravelrequestInput: $createTravelrequestInput){
      id
    }
  }
`;

export const UPDATE_Travelrequest_MUTATION = gql`
  mutation UpdateTravelrequest($updateTravelrequestInput: UpdateTravelrequestInput!) {
    updateTravelrequest(updateTravelrequestInput: $updateTravelrequestInput)
  }
`;

export const DELETE_Travelrequest_MUTATION = gql`
mutation RemoveTravelrequest($id: Int!) {
  removeTravelrequest(id: $id)
}
`;

export const REMOVE_MULTIPLE_Travelrequests = gql`
  mutation RemoveMultipleTravelrequests($ids: [Int!]!) {
    removeMultipleTravelrequests(ids: $ids)
  }
`;

