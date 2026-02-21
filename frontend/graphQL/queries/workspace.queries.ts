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
        # step {
        #   id
        #   name
        #   description
        # }
        contact_name
        contact_email
        contact_phone
        Notion_id
        GDriveId
        avatar
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
