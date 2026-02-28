// "use client";
// import { Card } from "@/components/ui/card";
// import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
// import { useCurrentUser } from "@/lib/useCurrentUser";
// import { UserWorkspacesQuery } from "@/types/types";
// import { useQuery } from "@apollo/client/react";
// import { Separator } from "@radix-ui/react-separator";
// import { motion } from "motion/react";

// type WorkspaceQueryResult = {
//     userWorkspaces: {
//         projects: {
//             id: string;
//             name: string;
//             description: string;
//             status: string;
//             deadline: Date
//         };
//         id: string;
//         name: string;
//         workspace: {
//             id: string;
//             name: string;
//             projects: {
//                 id: string;
//                 name: string;
//                 description: string;
//                 status: string;
//             }[]
//         }
//     }[];
// };

// export default function ProjectId({ params }: { params: { id: string; slug: string } }) {
//     const { id, slug } = params

//     const workspace = data?.userWorkspaces?.find((w) =>
//         w.projects.some((p) => p.id === id || p.name === decodeURIComponent(slug))
//     )

//     const project = workspace?.projects.find(
//         (p) => p.id === id || p.name === decodeURIComponent(slug)
//     )


//     const { user, isLoading, isAuthenticated } = useCurrentUser();

//     const userId = user?.id;

//     // const { data, loading, error } = useQuery<WorkspaceQueryResult>(FIND_WORKSPACE_BY_USERID, {
//     //     variables: { userId },
//     //     skip: !isAuthenticated || !userId,
//     // });

//     const { data } = useQuery<UserWorkspacesQuery>(
//         FIND_WORKSPACE_BY_USERID,
//         {
//             variables: { userId }
//         }
//     )
//     console.log("🦁 PROJECT ID - data project", data);

//     return (
//         <motion.div className="items-start justify-center h-screen font-avenir">
//             <div className="mb-10 text-center mt-50 md:mt-40  pb-4">
//                 <h1 className="text-2xl font-light tracking-wider">Mon projet</h1>
//                 <h1 className="text-m font-medium text-muted-foreground md:mr-4">
//                     <span className="text-foreground">{data?.userWorkspaces?.[0]?.projects?.[0]?.name}</span>&nbsp; <br />
//                     <span className="text-m font-medium text-muted-foreground md:mr-4">{data?.userWorkspaces?.[0]?.projects?.[0]?.description}</span>
//                 </h1>
//             </div>
//             {/* <Separator className="" /> */}
//             <div className=" text-center md:mt-40 ">
//                 <h1 className="text-2xl font-light tracking-wider pb-4">Etat du projet</h1>
//                 <h1 className="text-m font-medium text-muted-foreground md:mr-4">
//                     <span className="text-foreground">{data?.userWorkspaces?.[0]?.projects?.[0]?.status}</span>&nbsp; <br />
//                     <span className="text-m font-medium text-muted-foreground md:mr-4">{data?.userWorkspaces?.[0]?.projects?.[0]?.deadline}</span>
//                 </h1>
//             </div>




//         </motion.div>
//     );
// }

"use client";

import { useQuery } from "@apollo/client/react";
import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { UserWorkspacesQuery } from "@/types/types";
import { motion } from "motion/react";
import { useParams } from "next/navigation"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Step from "@/src/components/Step/Step";

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


export default function ProjectIdPage() {
    const params = useParams()
    const { id, slug } = params as { id: string; slug: string }

    const { user, isLoading, isAuthenticated } = useCurrentUser();
    const userId = user?.id;

    const { data, loading, error } = useQuery<UserWorkspacesQuery>(FIND_WORKSPACE_BY_USERID, {
        variables: { userId },
        skip: !isAuthenticated || !userId,
    });

    const workspace = data?.userWorkspaces?.find((w) =>
        w.projects.some((p) => p.id === id || p.name === decodeURIComponent(slug))
    );

    // const project = workspace?.projects.find(
    //     (p) => p.id === id || p.name === decodeURIComponent(slug)
    // );
    const project = data?.userWorkspaces
        ?.flatMap((w) => w.projects)
        .find((p) => p.id === id || toSlug(p.name) === slug);

    if (isLoading || loading) return <div>Loading...</div>;
    if (!project) return <div>Projet non trouvé</div>;


    const ExternalLink = ({ href, children }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline"
        >
            {children}
        </a>
    );

    const links = [
        { label: "Google Drive", url: project.GDriveId },
        { label: "Notion", url: project.Notion_id },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="items-start justify-center font-avenir">
            <div className="mb-10 text-center mt-50 md:mt-40  pb-4">
                <h1 className="text-2xl font-light tracking-wider">Mon projet</h1>
                <h1 className="text-m font-medium text-muted-foreground md:mr-4 ">
                    <span className="text-muted-foreground md:m-auto italic">{project.name}</span>&nbsp; <br />
                </h1>
            </div>
            <motion.div className="flex items-center md:m-10">
                <Button >Modifier le projet</Button>
                <Button >Partager le projet</Button>
                <Button
                    onClick={() => {
                        window.location.href = `/workspace/${workspace?.id}`;
                    }}
                >
                    Retourner au workspace
                </Button>
            </motion.div>


            <div className="m-10">
                <motion.div className=" border-1 border-muted-foreground/10 p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-light tracking-wider pb-4">Détails du projet</h1>
                    <h1 className="text-m font-medium md:m-auto">
                        <span className="text-foreground">Nom du projet :&nbsp; {project.name}</span>&nbsp; <br />
                        <div className="mt-4">
                            <span className="text-m font-medium  md:mr-4 ">Description :&nbsp; <br />
                                <p className="text-sm w-1/2 md:w-2/3 ">{project.description}</p></span>&nbsp; <br />
                            <span className="text-sm font-medium text-muted-foreground md:mr-4">Deadline :&nbsp; {formatDate(project.deadline)}</span>
                        </div>
                    </h1>
                    <p className="text-sm font-medium text-muted-foreground md:mr-4">Derniere mise à jour : {formatDate(project.updatedAt)}</p>
                </motion.div>
                <Separator className="my-10" />
                <motion.div className=" border-1 border-muted-foreground/10 p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-light tracking-wider pb-4">Info client</h1>
                    <h1 className="text-m font-medium text-muted-foreground md:mr-4">
                        <span className="text-foreground">Nom  :&nbsp; {project.contact_name}</span>&nbsp; <br />
                        <span className="text-m font-medium text-muted-foreground md:mr-4">Email :&nbsp; {project.contact_email}</span>&nbsp; <br />
                        <span className="text-m font-medium text-muted-foreground md:mr-4">Téléphone :&nbsp; {project.contact_phone}</span>&nbsp; <br />
                    </h1>
                </motion.div>
                <Separator className="my-10" />
                <motion.div className=" border-1 border-muted-foreground/10 p-6 rounded-lg">
                    <h1 className="text-2xl font-light tracking-wider pb-4">Etape du projet</h1>
                    <h1 className="text-m font-medium text-muted-foreground md:mr-4">
                        <span className="text-foreground">Statut :&nbsp; {project.status}</span>&nbsp; <br />
                        <span className="text-m font-medium text-muted-foreground md:mr-4">Deadline :&nbsp; {formatDate(project.deadline)}</span>
                    </h1>
                </motion.div>

                <Separator className="my-10" />
                <motion.div className=" border-1 border-muted-foreground/10 p-6 rounded-lg shadow-sm ">

                    <h1 className="text-2xl font-light tracking-wider pb-4 ">Etat du projet</h1>
                    <h1 className="text-m font-medium text-muted-foreground md:mr-4">
                        <span className="text-foreground">Statut :&nbsp; {project.status}</span>&nbsp; <br />
                        <span className="text-m font-medium text-muted-foreground md:mr-4">Deadline :&nbsp; {formatDate(project.deadline)}</span>
                    </h1>
                    <Step />
                </motion.div>
                <Separator className="my-10" orientation="horizontal" />
                <motion.div className=" border-1 border-muted-foreground/10 p-6 rounded-lg shadow ">

                    <h1 className="text-2xl font-light tracking-wider pb-4 ">Documents liés au projet</h1>
                    <h1 className="text-m font-medium text-muted-foreground md:mr-4">
                        {links.map((link, index) => (
                            <span key={link.label}>
                                {link.label} :{" "}
                                <ExternalLink href={link.url}>Lien du dossier</ExternalLink>
                                {index < links.length - 1 && " | "}
                            </span>
                        ))}
                    </h1>
                </motion.div>
            </div>
        </motion.div >
    );
}
