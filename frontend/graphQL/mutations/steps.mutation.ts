import { gql } from "@apollo/client";

export const CREATE_STEP = gql`
  mutation CreateStep($createStepInput: CreateStepInput!, $projectId: String!) {
    createStep(createStepInput: $createStepInput, projectId: $projectId) {
      id
      name
      createdAt
    }
  }
`;

export const UPDATE_STEP = gql`
  mutation UpdateStep($updateStepInput: UpdateStepInput!) {
    updateStep(updateStepInput: $updateStepInput) {
      id
      name
      createdAt
      status
      sequence_number
      description
      endDate
    }
  }
`;
