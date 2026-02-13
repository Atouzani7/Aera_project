import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($createProjectInput: CreateProjectInput!) {
    createProject(createProjectInput: $createProjectInput) {
      id
      name
      description
      contact_name
      contact_email
      contact_phone
      status: status
      tag: tag
      createdAt
      deadline
    }
  }
`;
