import { gql } from "@apollo/client";

export const GET_Travelhotels = gql`
  query Travelhotels {
    travelhotels {
        id
  traveldate{
    trip_type
    travelrequest{
      travel_name
    }
  }
  travel_date_id
  checkin_date
  checkout_date
  cdate
    }
  }
`;

export const GET_Travelhotel_BY_ID = gql`
  query Travelhotel($id: Int!) {
    travelhotel(id: $id) {
        id
  traveldate{
    trip_type
    travelrequest{
      travel_name
    }
  }
  travel_date_id
  checkin_date
  checkout_date
  cdate
    }
  }
`;

export const GET_Travelhotel_BY_UID = gql`
  query TravelhotelByUid($id: Int!) {
    travelhotelByUid(id: $id) {
        id
  traveldate{
    trip_type
    travelrequest{
      travel_name
    }
  }
  travel_date_id
  checkin_date
  checkout_date
  cdate
    }
  }
`;


export const ADD_Travelhotel_MUTATION = gql`
  mutation CreateTravelhotel($createTravelhotelInput: CreateTravelhotelInput!) {
    createTravelhotel(createTravelhotelInput: $createTravelhotelInput){
      id
    }
  }
`;

export const UPDATE_Travelhotel_MUTATION = gql`
  mutation UpdateTravelhotel($updateTravelhotelInput: UpdateTravelhotelInput!) {
    updateTravelhotel(updateTravelhotelInput: $updateTravelhotelInput)
  }
`;

export const DELETE_Travelhotel_MUTATION = gql`
mutation RemoveTravelhotel($id: Int!) {
  removeTravelhotel(id: $id)
}
`;

export const REMOVE_MULTIPLE_Travelhotels = gql`
  mutation RemoveMultipleTravelhotels($ids: [Int!]!) {
    removeMultipleTravelhotels(ids: $ids)
  }
`;

