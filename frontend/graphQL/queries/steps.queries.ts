import { gql } from "@apollo/client";

export const STEPS_BY_PROJECT = gql`
  query StepsByProject($projectId: String!) {
    stepsByProject(projectId: $projectId) {
      createdAt
      description
      #   endDate
      id
      name
      status
      updatedAt
    }
  }
`;
