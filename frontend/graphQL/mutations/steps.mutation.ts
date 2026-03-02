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
  mutation UpdateStep($updateStepInput: UpdateStepInput!, $stepId: String!) {
    updateStep(updateStepInput: $updateStepInput, stepId: $stepId) {
      id
      name
      createdAt
    }
  }
`;
