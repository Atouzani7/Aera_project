import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { UserWorkspacesQuery } from "@/types/types";
import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";

/**
 * Hook pour récupérer les workspaces de l'utilisateur et identifier le workspace actuel
 */
export default function useWorkspace() {
  const params = useParams();
  const { id, slug } = params as { id?: string; slug?: string };

  const { user, isLoading: userLoading, isAuthenticated } = useCurrentUser();
  const userId = user?.id;

  const shouldSkip = !isAuthenticated || !userId;

  const {
    data,
    loading: queryLoading,
    error,
  } = useQuery<UserWorkspacesQuery>(FIND_WORKSPACE_BY_USERID, {
    variables: { userId },
    skip: shouldSkip,
  });

  const workspaces = data?.userWorkspaces ?? [];
  console.log("workspaces dans le useWorkspace DATA", data);

  // 🔍 Trouver LE workspace actuel basé sur l'ID ou le Slug dans l'URL
  const workspace = workspaces.find((w) => {
    if (id && w.id === id) return true;
    if (slug && toSlug(w.name) === slug) return true;
    console.log("workspaces dans le useWorkspace", workspace);
    return false;
  });

  return {
    workspace,
    workspaces,
    isLoading: userLoading || queryLoading,
    error,
  };
}

// 🔧 Utils (doublon possible avec useProject, à centraliser si besoin)
function toSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

/**
 * Version simplifiée pour récupérer uniquement le workspace de la route actuelle
 */
export function useWorkspaceByRoute() {
  const { workspace, isLoading, error } = useWorkspace();
  return { workspace, isLoading, error };
}
