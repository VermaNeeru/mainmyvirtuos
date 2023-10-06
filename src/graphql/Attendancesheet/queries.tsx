import { gql } from "@apollo/client";

export const GET_Attendancesheets = gql`
  query Attendancesheets {
    Attendancesheets {
        id
    month
    sheet_type
    attachment
    comments
       
    }
  }
`;

export const GET_Attendancesheet_BY_ID = gql`
  query Attendancesheet($id: Int!) {
    Attendancesheet(id: $id) {
        id
    month
    sheet_type
    attachment
    comments
    }
  }
`;


export const ADD_Attendancesheet_MUTATION = gql`
mutation CreateAttendancesheet($createAttendancesheetInput: CreateAttendancesheetInput!) {
  createAttendancesheet(createAttendancesheetInput: $createAttendancesheetInput){
    id
  }
}
`;

export const UPDATE_Attendancesheet_MUTATION = gql`
  mutation UpdateAttendancesheet($updateAttendancesheetInput: UpdateAttendancesheetInput!) {
    updateAttendancesheet(updateAttendancesheetInput: $updateAttendancesheetInput)
  }
`;

export const DELETE_Attendancesheet_MUTATION = gql`
mutation RemoveAttendancesheet($id: Int!) {
  removeAttendancesheet(id: $id)
}
`;

export const REMOVE_MULTIPLE_Attendancesheets = gql`
  mutation RemoveMultipleAttendancesheets($ids: [Int!]!) {
    removeMultipleAttendancesheets(ids: $ids)
  }
`;

