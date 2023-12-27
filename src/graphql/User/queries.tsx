import { gql } from "@apollo/client";

export const GET_Login = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      id
      firstname
      lastname
      username
      password
    role{
      id
    }
      officialemail
      extn
      gender
      designation
      # Include any other user fields you want to retrieve upon login
    }
  }
}
`;
export const GET_PUBLIC_DOCUMENTS_BY_ID = gql`
mutation GetPublicDocumentsByUserId($userId: Float!) {
  getPublicDocumentsByUserId(userId: $userId) {
    id
    document_name
    document_description
    cdate
    document_attachment
  }
}

`;
export const GET_USER_BY_ID = gql`
query Getuser($id:Int!){
  getuser(id: $id) {
    id
    officialemail
    username
    extn
    education
    role{
      id
    }
    gender
    accesstype{
      id
      access_type_name
    }
    firstname
    lastname
    username
    userlogonhours{
      id
      user_logon_hours_logon_hours
      
    }
    userattendences{
      id
      late_hours
      shortfall
      early_hours
      excess_hours
      employee_code
      employee_name
      employee_department
      notes
      swipe_in
      swipe_out
      shortfall
      source_id
      late_hours
    }
    officialemail
    hobbies
    cdate
  }
}

`;
export const GET__DOCUMENTS_BY_ID = gql`
query Document($id:Int!){
  documentupload(id: $id) {
    document_name
    document_description
    document_attachment
    cdate
  }
}

`;
export const GET_PUBLIC_DOCUMENTS = gql`
query {
  publicDocuments {
    id
    document_name
    document_access
    cdate
    document_description
  }
}
`;

export const GET_Managers = gql`
query {
  getmanagers {
    id
   firstname
   lastname
  }
}
`;

export const GET_ALL_DOCUMENTS = gql`
query{
  documentuploads{
    id
    document_name
    cdate
    document_attachment
  }
}

`;
export const GET_ALL_FAq = gql`
query{
  faqs{
    id
    faq_ques
    faq_ans
    }
   
  }


`;


export const GET_ForgotPassword = gql`
mutation SendEmailToUser($email: String!, $template: String!) {  
  sendEmailToUser(email: $email,  templateName: $template) 
}
`;
export const CREATE_DOCUMENT_UPLOAD_MUTATION = gql`
mutation CreateDocumentUpload($input: CreateDocumentuploadInput!) {
  createDocumentupload(createDocumentuploadInput: $input) {
    id
    user_id
    role_id
    viewer_id
    document_name
    document_description
    document_attachment
    document_access
  }
}

`;
export const CREATE_WFH = gql`
mutation($input: CreateUserWfhInput!) {
  createUserWfh(createUserWfhInput: $input) {
    user_id
    manager_id
    m_manager_id
    date
    day_type
    time_slot
    hours_slot
    reason
    manager_approval
    m_manager_approval
  }
}


`;
export const CREATE_Leave = gql`
mutation CreateLeave($input: CreateLeaveInput!) {
  createLeave(createLeaveInput: $input) {
    id
    user_id
    leave_start_date
    leave_end_date
    leave_reason
   
  }
}


`;



export const GET_ChangePassword = gql`
mutation changePassword($resetKey: String!, $newPassword: String!) {
  changePassword(resetKey: $resetKey, newPassword: $newPassword)
}

`;
export const GET_CATEGORIES = gql`
  query GetAllUsers {
    getalluser {
        id
        firstname
        lastname
        officialemail
        extn
        designation
        gender
        education
        hobbies
        status
    }
  }
`;
export const GET_WFH = gql`
query {
  userWfhall {
  id
    hours_slot
    day_type
    date
    type
    time_slot
    
  }
}

`;
export const GET_Leave = gql`
query {
  leavesall {
  id
  leave_end_date
  leave_start_date
  leave_reason
  leave_total_days
  leave_type
    
  }
}

`;
// export const REMOVE_USER_WFH = gql`
// mutation {
//   removeUserWfh(id: 2) 
// }

// `;
export const REMOVE_USER_WFH = gql`
  mutation RemoveUserWfh($id: Int!) {
    removeUserWfh(id: $id)
  }
`;
export const REMOVE_USER_Leave = gql`
  mutation RemoveUserLeave($id: Int!) {
    removeLeave(id: $id)
  }
`;

export const GET_Employees = gql`
  query GetAllUsers {
    getalluser {
        id
        firstname
        lastname
    }
  }
`;
export const GET_OfficalInfoByUser = gql`
query OfficalInfo($id:Int!){
  officialinfoforuser(id:$id){
    id,
    manager_id1
    manager_id2
  }
  }
`;
export const GET_FaqById = gql`
query GetFaqsByCategoryId($id: Int!) {
  faqsByCategoryId(categoryId: $id) {
  id
    faq_ques
    faq_ans
  }
}
`;


/*

export const GET_DIVISION_BY_ID = gql`
  query Division($id: Int!) {
    division(id: $id) {
        id
        division_name
        division_code
        division_color
        status
    }
  }
`;

*/
export const ADD_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput){
      id
    }
  }
`;



// export const ADD_USER_MUTATION = gql`
//   mutation CreateUser($createUserInput: CreateUserInput!) {
//     createUser(createUserInput: $createUserInput) {
//       firstname
//       lastname
//       email
//       mobile
//       status
//     }
//   }
// `;

// export const UPDATE_CATEGORY_MUTATION = gql`
//   mutation UpdateCategory($updateCategoryArgs: UpdateCategoryArgs!) {
//     updateCategory(updateCategoryArgs: $updateCategoryArgs)
//   }
// `;

// export const DELETE_CATEGORY = gql`
//   mutation DeleteCategory($categoryId: Int!) {
//     deleteCategory(categoryId: $categoryId)
//   }
// `;