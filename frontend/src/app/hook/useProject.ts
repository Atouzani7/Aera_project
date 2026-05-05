import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { UserWorkspacesQuery } from "@/types/types";
import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";

export default function useProject() {
  const params = useParams();
  const { id, slug } = params as { id?: string; slug?: string };

  const { user, isLoading: userLoading } = useCurrentUser();
  const userId = user?.id;

  const {
    data,
    loading: queryLoading,
    error,
  } = useQuery<UserWorkspacesQuery>(FIND_WORKSPACE_BY_USERID, {
    variables: { userId },
    skip: !userId,
    fetchPolicy: "cache-and-network",
  });

  /**
   * 🧠 Workspaces de l'utilisateur
   */
  const workspaces = data?.userWorkspaces ?? [];

  /**
   * 📦 Tous les projets (tous workspaces)
   */
  const projects =
    workspaces.flatMap((workspace) => workspace.projects ?? []) ?? [];

  /**
   * 🔍 Projet actif (par id ou slug)
   */
  const project = projects.find((p) => {
    if (id && p.id === id) return true;
    if (slug && toSlug(p.name) === slug) return true;
    return false;
  });

  return {
    project,
    projects,
    workspaces,
    isLoading: userLoading || queryLoading,
    error,
  };
}

/**
 * 🔧 slug utilitaire
 */
function toSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

export function useProjectByRoute() {
  const params = useParams();
  const { id, slug } = params as { id?: string; slug?: string };

  const { projects, isLoading, error } = useProject();

  const project = projects.find((p) => {
    if (id && p.id === id) return true;
    if (slug && toSlug(p.name) === slug) return true;
    return false;
  });

  return { project, isLoading, error };
}
