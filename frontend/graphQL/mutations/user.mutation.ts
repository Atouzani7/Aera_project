import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($data: CreateUserInput!) {
    register(data: $data) {
      firstname
      lastname
      email
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        email
        # password // 🚨 ne pas le retourné coté front
        firstname
        lastname
        role
        # workspaceName
      }
      access_token
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
