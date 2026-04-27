import { STEPS_BY_PROJECT } from "@/graphQL/queries/steps.queries";
import { StepsByProjectQuery } from "@/types/types";
import { useQuery } from "@apollo/client/react";

export const useProjectSteps = (projectId: string) => {
  const { data, loading, error } = useQuery<StepsByProjectQuery>(
    STEPS_BY_PROJECT,
    {
      variables: { projectId },
      skip: !projectId,
    },
  );

  const sortedSteps = data?.stepsByProject
    ? [...data.stepsByProject].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
    : [];

  return {
    steps: sortedSteps,
    isLoading: loading,
    error,
  };
};
