import { gql } from "@apollo/client";

export const GetLocations = gql`
  query GetUSer($data: CreateUserInput!) {
    register(data: $data) {
      firstname
      lastname
      email
    }
  }
`;
