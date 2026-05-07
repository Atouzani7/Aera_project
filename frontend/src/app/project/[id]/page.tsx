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
import { CalendarIcon, Clock, ContactIcon, RefreshCw, SquarePenIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import useMyClients from "../../hook/useClient";


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
    // step?: Project["step"] | null;
    projectId?: string;
};
export default function CardProjectID({ projects, status, projectId }: CardProjectIDProps) {
    const { user, isLoading, isAuthenticated } = useCurrentUser();

    const userId = user?.id;
    const { data, loading, error } = useQuery<UserWorkspacesQuery>(
        FIND_WORKSPACE_BY_USERID,
        {
            variables: { userId }
        }
    )

    const { clients, loading: clientLoading, error: clientError } = useMyClients();


    const router = useRouter();

    const filteredProjects =
        status && status !== "All"
            ? projects?.filter((p) => p.status === status)
            : projects;

    if (!filteredProjects?.length) return <p>Aucun projet</p>;

    const allProjectIds = filteredProjects.map(p => p.id);
    console.log("Tous les IDs de mes projets :", allProjectIds);

    // if (!projects.?.name) return

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
                        className="flex flex-col md:flex-row w-full  bg-white/20 shadow-glassButtonShadow shadow-sm hover:shadow-md rounded-xl sm:p-6 p-4 border border-white border-1 transition-all"
                    >
                        {/* SECTION GAUCHE : Avatar + Infos de base */}

                        <div className=" flex md:flex-row flex-col items-start shadow-sm p-3 rounded-lg bg-gray-100/50  md:w-1/2 w-full m-auto md:m-0">


                            <div className="flex gap-4 items-start flex-1 w-full">
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-bold text-gray-800">{project.name}</h2>
                                    <p className="text-sm text-gray-500">{clients?.find((client) => client.id === project.client?.id)?.email || "email@erer.com"}</p>
                                    <p className="text-sm text-gray-500">{clients?.find((client) => client.id === project?.client.id)?.phone}</p>

                                    <div className="mt-4 ">
                                        <h4 className="text-xs font-bold uppercase text-gray-400">Description</h4>
                                        <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                                    </div>
                                    {/* <div className="mt-8 text-xs text-gray-400 w-full flex flex-col md:flex-row gap-2"> */}
                                    {/* <div className="flex gap-4 items-start flex-1 w-full"> */}
                                    <div className="mt-8 text-xs text-gray-400 w-full gap-4 flex flex-col md:flex-row">
                                        <p><CalendarIcon /> Créer le: {formatDate(project.createdAt)}</p>
                                        <p><RefreshCw /> Dernière mise à jour: {formatDate(project.updatedAt)}</p>
                                        <p><Clock /> Deadline: {formatDate(project.deadline)}</p>
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-col gap-2 min-w-[100px] m-auto md:m-0 w-full md:w-auto p-3 rounded-lg">
                                <div className="flex-1 px-8">
                                    <StatusBadge status={project.status} />
                                </div>
                                <div className="flex flex-col flex-end gap-2 min-w-[150px] m-auto ">
                                    <Button
                                        variant="default"
                                        className="bg-[#1e293d] text-white hover:text-black shadow-sm hover:shadow-md"
                                        onClick={() => {
                                            if (!project?.name || !project.id) return;
                                            router.push(`/project/${project.id}/${toSlug(project.name)}`);
                                        }}
                                    >
                                        <ContactIcon /> Espace client
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button className="flex-1"> <SquarePenIcon /> Modifier</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="m-4">

                            <Separator orientation="vertical" className="h-full hiden md:h-[200px] m-auto md:flex w-px bg-primary/70 hidden md:flex" />
                        </div>

                        {/* SECTION CENTRALE : Statut & Progress */}
                        <div className=" flex md:flex-row flex-col items-start shadow-sm p-3 rounded-lg bg-gray-100/50  md:w-1/2 m-auto md:m-0">

                            <HorizontalStepper projectId={project.id} withoutDetails={true} />

                        </div>




                        {/* SECTION DROITE : Status & Boutons */}

                    </div>
                ))}
            </div>


            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}



        </motion.div >



    );


}