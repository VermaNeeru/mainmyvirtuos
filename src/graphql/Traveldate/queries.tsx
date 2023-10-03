import { gql } from "@apollo/client";

export const GET_Traveldates = gql`
  query Traveldates {
    traveldates {
        id
  travelrequest{
    travel_name
    travel_type
  }
  travel_id
  from_date
  to_date
  from_address
  to_address
  trip_type
  flight_preference
  cdate
    }
  }
`;

export const GET_Traveldate_BY_ID = gql`
  query Traveldate($id: Int!) {
    traveldate(id: $id) {
        id
        travelrequest{
          travel_name
          travel_type
        }
        travel_id
        from_date
        to_date
        from_address
        to_address
        trip_type
        flight_preference
        cdate
    }
  }
`;

export const GET_Traveldate_BY_UID = gql`
  query TraveldateByUid($id: Int!) {
    traveldateByUid(id: $id) {
        id
  travelrequest{
    travel_name
    travel_type
  }
  travel_id
  from_date
  to_date
  from_address
  to_address
  trip_type
  flight_preference
  cdate
    }
  }
`;


export const ADD_Traveldate_MUTATION = gql`
  mutation CreateTraveldate($createTraveldateInput: CreateTraveldateInput!) {
    createTraveldate(createTraveldateInput: $createTraveldateInput){
      id
    }
  }
`;

export const UPDATE_Traveldate_MUTATION = gql`
  mutation UpdateTraveldate($updateTraveldateInput: UpdateTraveldateInput!) {
    updateTraveldate(updateTraveldateInput: $updateTraveldateInput)
  }
`;

export const DELETE_Traveldate_MUTATION = gql`
mutation RemoveTraveldate($id: Int!) {
  removeTraveldate(id: $id)
}
`;

export const REMOVE_MULTIPLE_Traveldates = gql`
  mutation RemoveMultipleTraveldates($ids: [Int!]!) {
    removeMultipleTraveldates(ids: $ids)
  }
`;

