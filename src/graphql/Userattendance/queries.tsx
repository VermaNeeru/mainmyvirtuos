import { gql } from "@apollo/client";

export const GET_USER_ATTENDANCE = gql`
  query Userattendences {
    Userattendences {
        id
        attendence_date
        attendence_day
        attendence_status
        employee_code
        employee_name
        employee_department
        swipe_in
        swipe_out
        shortfall
        source_id
        notes
        late_hours
        early_hours
        total_hours
        excess_hours
    }
  }
`;

export const GET_USER_ATTENDANCE_BY_ID = gql`
  query Userattendence($id: Int!) {
    Userattendence(id: $id) {
        id
        attendence_date
        attendence_day
        attendence_status
        employee_code
        employee_name
        employee_department
        swipe_in
        swipe_out
        shortfall
        source_id
        notes
        late_hours
        early_hours
        total_hours
        excess_hours
    }
  }
`;

export const GET_USER_ATTENDANCE_BY_DATE = gql`
query FindUserAttendance($userId: Int!, $startDate: Date!, $endDate: Date!) {
  findUserAttendance(userId: $userId, startDate: $startDate, endDate: $endDate) {
    id
    user_id
    attendence_date
    attendence_day
    attendence_status
    employee_code
    employee_name
    employee_department
    swipe_in
    swipe_out
    shortfall
    source_id
    notes
    late_hours
    early_hours
    logon_hours
    excess_hours
  }
}
`;

export const GET_CURRENT_MY_ATTENDANCE = gql`
query CurrentMyAttendance($userId: Int!, $startDate: Date!, $endDate: Date!) {
  currentMyAttendance(userId: $userId, startDate: $startDate, endDate: $endDate) {
    id
    user_id
    attendence_date
    attendence_day
    attendence_status
    employee_code
    employee_name
    employee_department
    swipe_in
    swipe_out
    shortfall
    source_id
    notes
    late_hours
    early_hours
    total_hours
    excess_hours
  }
}
`;

export const ADD_USER_ATTENDANCE_MUTATION = gql`
  mutation CreateUserattendence($createUserattendenceInput: CreateUserattendenceInput!) {
    createUserattendence(createUserattendenceInput: $createUserattendenceInput){
      id
    }
  }
`;

export const UPDATE_USER_ATTENDANCE_MUTATION = gql`
  mutation UpdateUserattendence($updateUserattendenceInput: UpdateUserattendenceInput!) {
    updateUserattendence(updateUserattendenceInput: $updateUserattendenceInput)
  }
`;

export const DELETE_USER_ATTENDANCE_MUTATION = gql`
mutation RemoveUserattendence($id: Int!) {
  removeUserattendence(id: $id)
}
`;

export const REMOVE_MULTIPLE_UserattendenceS = gql`
  mutation RemoveMultipleUserattendences($ids: [Int!]!) {
    removeMultipleUserattendences(ids: $ids)
  }
`;
