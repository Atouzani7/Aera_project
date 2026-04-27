"use client";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { useQuery } from "@apollo/client/react";
import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CardProjectID from "../../project/[id]/page";
import { FolderCheck, FolderClock, FolderCog, FolderDown, FolderHeart, FolderInputIcon, ListFilter, PlusCircleIcon, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ResumeCountProject from "@/src/components/ResumeCountProject";

export default function WorkspaceIdPage() {
    const { user, isLoading, isAuthenticated } = useCurrentUser();

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
                <h1 className="text-2xl font-light tracking-wider font-avenir">Dashboard</h1>
                <h1 className="text-m font-medium text-muted-foreground md:mr-4">
                    Bienvenue,&nbsp;
                    <span className="text-foreground">{user?.firstname}</span>
                </h1>

                <div className="items-center md:m-10">
                    <ResumeCountProject />
                    {projects.length === 0 && <p className="text-gray-500 text-sm">Aucun projet trouvé. Crée ton premier projet ✨</p>}
                    {projects.length === 0 && <Button variant="create" onClick={handClickCreateProject} className="m-2">
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        Créer un nouveau projet
                    </Button>}

                </div>

            </div>

            <Button variant="default" onClick={handClickCreateProject} className="m-2">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Créer un nouveau projet
            </Button>

            <Tabs defaultValue="All" className="relative w-full">


                <div className="flex items-center justify-between">
                    <button
                        className="md:hidden rounded-lg hover:bg-gray-100"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={18} /> : <ListFilter size={18} />}
                    </button>

                    {/* desktop tabs */}
                    <TabsList className="hidden md:flex gap-2">
                        {statuses.map((status) => (
                            <TabsTrigger key={status.key} value={status.key}>
                                {status.icon} {status.label} ({status.count})
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* mobile dropdown */}
                {isOpen && (
                    <div className="absolute top-2 left-10 w-72 max-h-[60vh] overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-40 md:hidden">
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
                    <TabsContent key={status.key} value={status.key} className="mt-4">
                        <CardProjectID projects={projects} status={status.key} />
                    </TabsContent>
                ))}
            </Tabs>





        </div>
    );
}