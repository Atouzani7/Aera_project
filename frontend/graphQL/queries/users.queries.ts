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
      id
      email
      firstname
      lastname
      profilePicture
      role
      status
      unarchiveDateColumn
      updatedAt
      workspace {
        id
        name
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
