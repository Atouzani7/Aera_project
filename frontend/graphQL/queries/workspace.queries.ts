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
        description
        deadline
        status
        tag
        createdAt
        updatedAt
        archivedAt
        steps {
          id
          name
          description
        }
        Notion_id
        GDriveId
        avatar
        client {
          id
          name
          email
          phone
        }
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
