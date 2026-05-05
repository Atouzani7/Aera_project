import { gql } from "@apollo/client";

export const GET_CLIENT = gql`
  query GetCLientProjects {
    getCLientProjects(id: $clientId) {
      Brand_identity
      GDriveId
      Notion_id
      archivedAt
      avatar
      createdAt
      deadline
      description
      id
      name
      status
      tag
      updatedAt
    }
  }
`;

export const GET_CLIENT_BY_USERID = gql`
  query FindMyClients {
    findMyClients {
      address
      city
      country
      createdAt
      email
      id
      lastname
      name
      phone
      postalCode
      updatedAt
    }
  }
`;

export const All_ClIENTS = gql`
  query FindAllClients {
    FindAllClients {
      address
      city
      country
      createdAt
      email
      id
      lastname
      name
      phone
      postalCode
      updatedAt
    }
  }
`;
