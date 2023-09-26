import { gql } from "@apollo/client";

export const GET_Notifications = gql`
  query Notifications {
    notifications {
        id
        sender_id
        notification_type
        notification_message
        notification_audience
        notification_seen_audience
        notification_type_id
    user{
          firstname
          lastname
        }
    }
  }
`;

export const GET_Notification_BY_ID = gql`
  query Notification($id: Int!) {
    notification(id: $id) {
        id
    sender_id
    notification_type
    notification_message
    notification_audience
    notification_seen_audience
    notification_type_id
user{
      firstname
      lastname
    }
    }
  }
`;


export const ADD_Notification_MUTATION = gql`
  mutation CreateNotification($createNotificationInput: CreateNotificationInput!) {
    createNotification(createNotificationInput: $createNotificationInput){
      id
    }
  }
`;

export const UPDATE_Notification_MUTATION = gql`
  mutation UpdateNotification($updateNotificationInput: UpdateNotificationInput!) {
    updateNotification(updateNotificationInput: $updateNotificationInput)
  }
`;

export const DELETE_Notification_MUTATION = gql`
mutation RemoveNotification($id: Int!) {
  removeNotification(id: $id)
}
`;

export const REMOVE_MULTIPLE_Notifications = gql`
  mutation RemoveMultipleNotifications($ids: [Int!]!) {
    removeMultipleNotifications(ids: $ids)
  }
`;

