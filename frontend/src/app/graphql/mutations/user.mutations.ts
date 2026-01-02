import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $pass: String!) {
    signIn(email: $email, pass: $pass) {
      access_token
      user {
        id
        email
      }
    }
  }
`;
