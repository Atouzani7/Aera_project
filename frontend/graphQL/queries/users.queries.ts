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

export const ME = gql`
  query Me {
    me {
      email
      firstname
      id
      lastname
      profilePicture
      role
      status
      unarchiveDateColumn
      updatedAt
      workspace {
        id
        projects {
          createdAt
          description
          id
          name
          status
          updatedAt
        }
      }
    }
  }
`;
