import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($createProjectInput: CreateProjectInput!) {
    createProject(createProjectInput: $createProjectInput) {
      id
      name
      description
      status: status
      tag: tag
      createdAt
      deadline
      client {
        name
        lastname
        email
        id
        address
        city
        country
        phone
        postalCode
      }
    }
  }
`;
