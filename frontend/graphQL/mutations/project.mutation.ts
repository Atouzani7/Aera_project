import { gql } from "@apollo/client";

// export const CREATE_PROJECT = gql`
//   mutation CreateProject($createProjectInput: CreateProjectInput!) {
//     createProject(createProjectInput: $createProjectInput)(
//         createProjectInput: {
//             description,
//             name,
//             contact_name
//         }
//     ) {
//         description
//         id
//         name
//         contact_name
//     }
// }
// `;

export const CREATE_PROJECT = gql`
  mutation CreateProject($createProjectInput: CreateProjectInput!) {
    createProject(
      createProjectInput: {
        contact_name: $contact_name
        name: $name
        description: $description
      }
    ) {
      Brand_identity
      GDriveId
      Notion_id
      archivedAt
      contact_email
      contact_name
      contact_phone
      createdAt
      description
      endDate
      id
      name
      status
      tag
      updatedAt
    }
  }
`;
