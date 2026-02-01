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
      status
      tag
      createdAt
    }
  }
`;

// export const CREATE_PROJECT = gql`
//   mutation CreateProject($createProjectInput: CreateProjectInput!) {
//     createProject(
//       createProjectInput: {
//         contact_name: $contact_name
//         name: $name
//         description: $description
//       }
//     ) {
//       Brand_identity
//       GDriveId
//       Notion_id
//       archivedAt
//       contact_email
//       contact_name
//       contact_phone
//       createdAt
//       description
//       endDate
//       id
//       name
//       status
//       tag
//       updatedAt
//     }
//   }
// `;
