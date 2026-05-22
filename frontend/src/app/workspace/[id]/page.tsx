/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { useQuery } from "@apollo/client/react";
import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CardProjectID from "../../project/[id]/page";
import { FolderCheck, FolderClock, FolderCog, FolderDown, FolderHeart, FolderInputIcon, ListFilter, PlusCircleIcon, PlusIcon, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ResumeCountProject from "@/src/components/ResumeCountProject";
import Filter from "@/src/components/Filter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "motion/react";

export default function WorkspaceIdPage() {
    const { user, isLoading, isAuthenticated } = useCurrentUser();

    const [search, setSearch] = useState("");

    const userId = user?.id;

    const { data, loading, error } = useQuery<{ userWorkspaces: Array<{ projects: any[] }> }>(FIND_WORKSPACE_BY_USERID, { variables: { userId } });

    const projects = data?.userWorkspaces?.flatMap(ws => ws.projects ?? []) ?? [];

    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter()
    const handClickCreateProject = () => {
        router.push("/project/newProject")
    }

    if (isLoading || loading) return <div>Loading...</div>;
    if (!user || !isAuthenticated) return <div>Please log in to access this workspace.</div>;

    const statuses = [
        { key: "All", label: "Tous", icon: <FolderHeart color="#c3a6ff" />, count: projects.length, className: "text-foreground" },
        { key: "PLANNED", label: "Planifié", icon: <FolderCog color="#c3a6ff" />, count: projects.filter(p => p.status === "PLANNED").length, className: "text-foreground" },
        { key: "IN_PROGRESS", label: "En cours", icon: <FolderDown color="#c3a6ff" />, count: projects.filter(p => p.status === "IN_PROGRESS").length, className: "text-foreground" },
        { key: "PENDING", label: "En attente", icon: <FolderClock color="#c3a6ff" />, count: projects.filter(p => p.status === "PENDING").length, className: "text-foreground" },
        { key: "NOT_STARTED", label: "Non commencé", icon: <FolderInputIcon color="#c3a6ff" />, count: projects.filter(p => p.status === "NOT_STARTED").length, className: "text-foreground" },
        { key: "TERMINED", label: "Terminé", icon: <FolderCheck color="#c3a6ff" />, count: projects.filter(p => p.status === "TERMINED").length, className: "text-foreground" },
    ];

    return (
        <div className="mt-4 p-6 shadow">
            <div className="mb-10 text-center mt-30 md:mt-40 ">

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className=" "
                >
                    <div className=" m-4 flex items-center justify-between">

                        <h1 className="text-2xl font-light tracking-wider font-avenir">Dashboard</h1>
                        <h1 className="text-m font-medium text-muted-foreground md:mr-4">
                            Bienvenue,&nbsp;

                            <span className="text-foreground">{user?.firstname}</span>
                        </h1>
                        <Avatar>
                            <AvatarImage src={user?.profilePicture || "https://images.pexels.com/photos/30414203/pexels-photo-30414203.jpeg"} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </motion.div>
                <div className="items-center md:m-10">
                    <ResumeCountProject />
                    {projects.length === 0 && <p className="text-gray-500 text-sm">Aucun projet trouvé. Crée ton premier projet ✨</p>}
                    {projects.length === 0 && <Button variant="create" onClick={handClickCreateProject} className="m-2">
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        Créer un nouveau projet
                    </Button>}

                </div>

            </div>

            <div className="
    flex flex-col md:flex-row
    md:items-center md:justify-between
    gap-3 mb-6
">

                <Filter onSearch={setSearch} />

                <Button
                    onClick={handClickCreateProject}
                    className="
            bg-gradient-to-r from-cyan-500/40 to-violet-500/40
            text-white
            hover:brightness-110
            transition
        "
                >
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    Nouveau projet
                </Button>
            </div>

            <Tabs defaultValue="All" className="relative w-full">


                <div className="flex items-center justify-between">
                    <button
                        className="md:hidden rounded-lg hover:bg-gray-100"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={18} /> : <ListFilter size={18} />}
                    </button>

                    {/* desktop tabs */}
                    <TabsList className="hidden md:flex gap-2 ">
                        {statuses.map((status) => (
                            <TabsTrigger key={status.key} value={status.key} className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10 rounded-lg px-3 py-1.5 transition">
                                {status.icon} {status.label} ({status.count})
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* mobile dropdown */}
                {isOpen && (

                    <div className="
    absolute top-12 left-0
    w-72
    overflow-y-auto
    bg-neutral-100/95
    border border-white/10
    rounded-2xl
    backdrop-blur-xl
    shadow-xl
    p-2
    z-40
">
                        <TabsList className="flex flex-col mt-20 gap-1 w-full">
                            {statuses.map((status) => (
                                <TabsTrigger
                                    key={status.key}
                                    value={status.key}
                                    className="justify-start w-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {status.icon} {status.label} ({status.count})
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                )}

                {/* content */}

                {statuses.map((status) => (
                    <TabsContent key={status.key} value={status.key} className="mt-4 flex flex-col gap-4 w-full">

                        {/* 1. On filtre d'abord les projets qui correspondent au status de l'onglet */}
                        {projects
                            .filter((project) => {
                                const matchStatus =
                                    status.key === "All" || project.status === status.key;

                                const matchSearch =
                                    (project.name || "")
                                        .toLowerCase()
                                        .includes(search.toLowerCase());

                                return matchStatus && matchSearch;
                            })
                            .map((project) => (
                                <CardProjectID
                                    key={project.id}
                                    projects={[project]}
                                    projectId={project.id}
                                />

                            ))}

                        {/* Optionnel : Message si l'onglet est vide */}
                        {projects.filter((project) => status.key === "All" || project.status === status.key).length === 0 && (
                            <p className="text-center text-muted-foreground py-10">
                                Aucun projet dans la catégorie {status.label}
                            </p>
                        )}

                    </TabsContent>
                ))}

            </Tabs>





        </div>
    );
}