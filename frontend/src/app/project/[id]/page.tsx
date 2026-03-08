"use client";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { useQuery } from "@apollo/client/react";
import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Project, UserWorkspacesQuery } from "@/types/types";
import { HorizontalStepper } from "@/src/components/Step/Stepper";
import StatusBadge from "@/src/components/StatusBadge";


type WorkspaceQueryResult = {
    userWorkspaces: {
        projects: {
            id: string;
            name: string;
            description: string;
            status: string;
            deadline: Date
        };
        id: string;
        name: string;
        workspace: {
            id: string;
            name: string;
            projects: {
                id: string;
                name: string;
                description: string;
                status: string;
            }[]
        }
    }[];
};

function formatDate(dateString?: string) {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function toSlug(name: string) {
    return name
        .toLowerCase()                  // tout en minuscule
        .trim()                         // enlève espaces avant/après
        .replace(/[\s]+/g, "-")         // remplace espaces par "-"
        .replace(/[^\w\-]+/g, "")       // supprime caractères spéciaux
}

type CardProjectIDProps = {
    projects?: Project[]; // le tableau de projets à afficher
    status?: string;
};
export default function CardProjectID({ projects, status }: CardProjectIDProps) {
    const { user, isLoading, isAuthenticated } = useCurrentUser();

    const userId = user?.id;
    const { data, loading, error } = useQuery<UserWorkspacesQuery>(
        FIND_WORKSPACE_BY_USERID,
        {
            variables: { userId }
        }
    )

    const router = useRouter();

    const filteredProjects =
        status && status !== "All"
            ? projects?.filter((p) => p.status === status)
            : projects;

    if (!filteredProjects?.length) return <p>Aucun projet</p>;




    const project = data?.userWorkspaces?.[0]?.projects?.[0]
    const projectId = data?.userWorkspaces?.[0]?.projects?.[0]?.id


    if (!project?.name) return

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to access this project.</div>;
    }

    if (!isAuthenticated) {
        return <div>Please log in to access this project.</div>;
    }
    return (

        < motion.div
            initial={{ opacity: 0 }
            }
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >

            <div className="flex flex-col gap-4">
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className="flex flex-col md:flex-row items-start border-3 md:items-start justify-between gap-4 bg-white shadow-sm hover:shadow-md rounded-xl p-4 sm:p-6 border border-gray-200 transition-all w-full"
                    >
                        {/* SECTION GAUCHE : Avatar + Infos de base */}
                        <div className="flex gap-4 items-start flex-1">
                            <div className="flex flex-col">
                                <h2 className="text-lg font-bold text-gray-800">{project.name}</h2>
                                <p className="text-sm text-gray-500">{project.contact_email || "email@gmail.com"}</p>
                                <p className="text-sm text-gray-500">{project.contact_phone}</p>

                                <div className="mt-4 max-w-xs">
                                    <h4 className="text-xs font-bold uppercase text-gray-400">Description</h4>
                                    <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                                </div>
                                <div className="mt-8 text-xs text-gray-400 flex gap-4">
                                    <span>Créer le: {formatDate(project.createdAt)}</span>
                                    <span>Update: {formatDate(project.updatedAt)}</span>
                                    <span>Deadline: {formatDate(project.deadline)}</span>
                                </div>
                            </div>
                        </div>

                        {/* SECTION CENTRALE : Statut & Progress */}
                        <div className="flex flex-col items-center gap-2 min-w-[100px]">
                            <HorizontalStepper />
                        </div>

                        {/* SECTION DROITE : Status & Boutons */}
                        <div className="flex flex-col gap-2 min-w-[100px]">
                            <div className="flex-1 px-8">
                                <StatusBadge status={project.status} />
                            </div>
                            <div className="flex flex-col gap-2 min-w-[150px]">
                                <Button
                                    variant="default"
                                    className="bg-[#1e293b] text-white hover:text-black shadow-sm hover:shadow-md"
                                    onClick={() => {
                                        if (!project?.name || !project.id) return;
                                        router.push(`/project/${project.id}/${toSlug(project.name)}`);
                                    }}
                                >
                                    Espace client
                                </Button>
                                <div className="flex gap-2">
                                    <Button className="flex-1">Modifier</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}



        </motion.div >



    );


}