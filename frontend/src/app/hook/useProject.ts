import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { UserWorkspacesQuery } from "@/types/types";
import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";

export default function useProject() {
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

  const projects = // 🛠️ Extraire tous les projets de tous les workspaces de l'utilisateur
    data?.userWorkspaces?.flatMap((workspace) => workspace.projects) ?? [];

  // 🔍 Trouver LE projet
  const project = projects.find((p) => {
    if (id && p.id === id) return true;
    if (slug && toSlug(p.name) === slug) return true;
    return false;
  });

  return {
    project,
    projects,
    isLoading: userLoading || queryLoading,
    error,
  };
}

// 🔧 Utils
function toSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\-]+/g, "");
}
