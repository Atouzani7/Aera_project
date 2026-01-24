import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register(
    $email: String!
    $firstname: String!
    $lastname: String!
    $password: String!
    $workspaceName: String!
  ) {
    register(
      email: $email
      firstname: $firstname
      lastname: $lastname
      password: $password
      workspaceName: $workspaceName
    ) {
      user {
        email
        id
      }
      workspace {
        name
        id
      }
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
        workspace {
          id
          name
        }
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
