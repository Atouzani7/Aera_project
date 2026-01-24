import { gql } from "@apollo/client";

export const FIND_WORKSPACE_BY_USERID = gql`
  query UserWorkspaces($userId: String!) {
    userWorkspaces(userId: $userId) {
      id
      name
      users {
        email
        id
        lastname
      }
    }
  }
`;
