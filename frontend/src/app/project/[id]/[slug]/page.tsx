"use client";

import { useQuery } from "@apollo/client/react";
import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { UserWorkspacesQuery } from "@/types/types";
import { motion } from "motion/react";
import { useParams } from "next/navigation"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/src/components/StatusBadge";
import { HorizontalStepper } from "@/src/components/Step/Stepper";
import { ArrowLeftIcon, Mail, MapPin, Pencil, Phone, Share2, User } from "lucide-react";
import useMyClients from "@/src/app/hook/useClient";
import { useState } from "react";
import { EditProjectModal } from "@/src/components/EditProjectModal";



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

    const { clients, loading: clientLoading } = useMyClients()


    const { data, loading, error } = useQuery<UserWorkspacesQuery>(FIND_WORKSPACE_BY_USERID, {
        variables: { userId },
        skip: !isAuthenticated || !userId,
    });
    const [open, setOpen] = useState(false);

    const workspace = data?.userWorkspaces?.find((w) =>
        w.projects.some((p) => p.id === id || p.name === decodeURIComponent(slug))
    );

    const project = data?.userWorkspaces
        ?.flatMap((w) => w.projects)
        .find((p) => p.id === id || toSlug(p.name) === slug);

    if (isLoading || loading) return <div>Loading...</div>;
    if (!project) return <div>Projet non trouvé</div>;
    const clientId = clients.find((c) => c.id === project.client.id);

    const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
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
    const filteredLinks = links.filter((link) => link.url)


    const cardVariants = {
        initial: { y: 0, scale: 1 },
        hover: {
            y: -4,
            scale: 1.01,
            transition: { type: "spring" as const, stiffness: 300, damping: 20 },
        },
    };
    const iconVariants = {
        hover: { scale: 1.2, rotate: 6 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="items-start justify-center font-avenir ">
            <div className="mb-5 text-center mt-50 md:mt-40  pb-4">
                <h1 className="text-2xl font-light tracking-wider">Mon projet</h1>
                <h1 className="text-m font-medium text-muted-foreground md:mr-4 ">
                    <span className="text-muted-foreground md:m-auto italic">{project.name}</span>&nbsp; <br />
                </h1>
            </div>
            <motion.div className="flex items-center md:m-10">

                <Button
                    onClick={() => {
                        window.location.href = `/workspace/${workspace?.id}`;
                    }}
                >
                    <ArrowLeftIcon className="mr-2 h-4 w-4" /> Retourner au workspace
                </Button>
            </motion.div>


            <div className="m-10">

                <>
                    <motion.div
                        variants={cardVariants}
                        initial="initial"
                        whileHover="hover"
                        className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-xl shadow-md p-6 space-y-6"
                    >
                        {/* HEADER */}
                        <div className="flex items-start justify-between gap-4">

                            <div>
                                <h2 className="text-xl font-semibold tracking-wide">
                                    Détails du projet
                                </h2>

                                <p className="text-sm text-muted-foreground mt-1">
                                    Statut : <StatusBadge status={project.status} />
                                </p>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex gap-2">

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setOpen(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs font-medium"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                    Modifier
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-white/30 text-xs font-medium"
                                >
                                    <Share2 className="w-3.5 h-3.5" />
                                    Partager
                                </motion.button>

                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="space-y-4">

                            <div>
                                <p className="text-xs text-muted-foreground">Nom du projet</p>
                                <p className="text-base font-semibold">{project.name}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Description</p>
                                <p className="text-sm leading-relaxed text-foreground/80">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex flex-col md:flex-row md:justify-between gap-2 text-sm text-muted-foreground">
                                <p>Deadline : {formatDate(project.deadline)}</p>
                                <p>Dernière mise à jour : {formatDate(project.updatedAt)}</p>
                            </div>

                        </div>
                    </motion.div>

                    {/* MODAL */}
                    <EditProjectModal
                        open={open}
                        setOpen={setOpen}
                        project={project}
                    />
                </>

                <Separator className="my-5" />

                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-xl shadow-md p-6 space-y-6"
                >
                    {/* HEADER */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold tracking-wide">
                            Client Overview
                        </h2>

                        {/* EDIT BUTTON */}
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs font-medium"
                            onClick={() => console.log("edit client")}
                        >
                            <motion.div
                                variants={iconVariants}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <Pencil className="w-3.5 h-3.5" />
                            </motion.div>
                            Éditer client
                        </motion.button>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* NAME */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="rounded-xl bg-white/50 p-4 border border-white/30 hover:shadow-lg transition"
                        >
                            <div className="flex items-center gap-2">
                                <motion.div whileHover={{ rotate: 10, scale: 1.2 }}>
                                    <User className="w-4 h-4 text-muted-foreground" />
                                </motion.div>
                                <p className="text-xs text-muted-foreground">Client</p>
                            </div>
                            <p className="text-base font-semibold mt-1">
                                {clientId?.name} {clientId?.lastname}
                            </p>
                        </motion.div>

                        {/* EMAIL */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="rounded-xl bg-white/50 p-4 border border-white/30 hover:shadow-lg transition"
                        >
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">Email</p>
                            </div>
                            <p className="text-sm font-medium mt-1">{clientId?.email}</p>
                        </motion.div>

                        {/* PHONE */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="rounded-xl bg-white/50 p-4 border border-white/30 hover:shadow-lg transition"
                        >
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">Téléphone</p>
                            </div>
                            <p className="text-sm font-medium mt-1">{clientId?.phone}</p>
                        </motion.div>

                        {/* ADDRESS */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="rounded-xl bg-white/50 p-4 border border-white/30 hover:shadow-lg transition md:col-span-2"
                        >
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">Adresse</p>
                            </div>
                            <p className="text-sm font-medium mt-1 leading-relaxed">
                                {clientId?.address}
                                <br />
                                {clientId?.city}, {clientId?.country}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>




                <Separator className="my-5" />
                {/* <motion.div className="bg-white/50 border-1 border-muted-foreground/40 p-6 rounded-lg shadow-sm "> */}
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-xl shadow-md p-6 space-y-6"
                >

                    <h1 className=" text-2xl font-light tracking-wider pb-4 ">Etape du projet</h1>
                    {/* <h1 className="text-m font-medium text-muted-foreground md:mr-4">
                        <span className="text-foreground">Statut :&nbsp;<StatusBadge status={project.status} /> </span>&nbsp; <br />
                    </h1> */}
                    {/* <Step /> */}
                    <HorizontalStepper projectId={project.id} />
                </motion.div>
                <Separator className="my-5" />
                {/* <motion.div className=" bg-white/50 border-1 border-muted-foreground/40 p-6 rounded-lg shadow-sm"> */}
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-xl shadow-md p-6 space-y-6"
                >

                    <h1 className="text-2xl tracking-wider text-bold  ">Documents liés au projet</h1>
                    <h1 className="text-m font-medium text-muted-foreground md:mr-4">
                        {filteredLinks.length > 0 ? (
                            filteredLinks.map((link, index) => (
                                <span key={link.label}>
                                    {link.label} :{" "}
                                    <Button variant="link"> <ExternalLink href={link.url!}>Lien du dossier</ExternalLink></Button>
                                    {index < filteredLinks.length - 1 && " | "}
                                </span>
                            ))
                        ) : (
                            "Ajouter un document dans le Drive"
                        )}
                        {/* TODO: Ajouter un bouton pour ajouter des liens vers les documents liés au projet */}
                    </h1>
                </motion.div>
            </div >
        </motion.div >
    );
}
