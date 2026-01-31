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
      projects {
        id
        name
      }
    }
  }
`;

export const FIND_WORKSPACE_BY_ID = gql`
  query Workspace($workspaceId: String!) {
    workspace(workspaceId: $workspaceId) {
      id
      name
      projects {
        id
        name
      }
    }
  }
`;
