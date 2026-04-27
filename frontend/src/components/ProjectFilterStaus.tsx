import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderArchive, FolderCheck, FolderClock, FolderCog, FolderCog2Icon, FolderDotIcon, FolderDown, FolderHeart, FolderInputIcon, FolderSync, LoaderIcon } from "lucide-react";
import { HorizontalStepper } from "./Step/Stepper";
import { UserWorkspacesQuery } from "@/types/types";
import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
import { useQuery } from "@apollo/client/react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { is } from "zod/v4/locales";

export default function ProjectFilterStatus() {

    const { user } = useCurrentUser();

    const userId = user?.id;

    const { data, loading, error } = useQuery<UserWorkspacesQuery>(
        FIND_WORKSPACE_BY_USERID,
        {
            variables: { userId }
        }
    )
    const projects = data?.userWorkspaces?.flatMap((ws) => ws?.projects ?? [])

    const projectsByStatus = {
        IN_PROGRESS: projects?.filter((p) => p.status === "IN_PROGRESS") ?? [],
        PENDING: projects?.filter((p) => p.status === "PENDING") ?? [],
        NOT_STARTED: projects?.filter((p) => p.status === "NOT_STARTED") ?? [],
        TERMINATED: projects?.filter((p) => p.status === "TERMINATED") ?? [],
        PLANNED: projects?.filter((p) => p.status === "PLANNED") ?? [],
        ARCHIVED: projects?.filter((p) => p.status === "ARCHIVED") ?? [],
    }

    const statuses = [
        { key: "All", label: <FolderHeart color="#c3a6ff" />, title: "Tous les projets" },
        { key: "IN_PROGRESS", label: <FolderDown color="#c3a6ff" />, title: "Projet en cours" },
        { key: "PENDING", label: <FolderClock color="#c3a6ff" />, title: "Projet en attente" },
        { key: "NOT_STARTED", label: <FolderInputIcon color="#c3a6ff" />, title: "Projet non commencé" },
        { key: "TERMINATED", label: <FolderCheck color="#c3a6ff" />, title: "Projet terminé" },
        { key: "ARCHIVED", label: <FolderArchive color="#c3a6ff" />, title: "Projet archivé" },
        { key: "PLANNED", label: <FolderCog2Icon color="#c3a6ff" />, title: "Projet planifié" },
    ]

    loading && <p><LoaderIcon /></p>;
    error && <p>Erreur lors du chargement des projets</p>;

    const renderProjects = (list) => {
        if (list.length === 0) return "Aucun projet";

        return list.map((p) => (
            <div key={p.id}>
                {p.name}
            </div>
        ));
    };

    return (
        <div className="flex items-center gap-4">
            <Tabs defaultValue="All" className="">
                <TabsList>
                    {statuses.map((status) => (
                        <TabsTrigger
                            key={status.key}
                            value={status.key}
                            className="flex items-center gap-2"
                        >
                            {status.label}

                            <span className="hidden md:inline">
                                {status.title}
                            </span>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="All">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tous les projets</CardTitle>
                            <CardDescription>
                                {renderProjects(projects)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            Nombre : {projects?.length}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="IN_PROGRESS">
                    <Card>
                        <CardHeader>
                            <CardTitle>Projet en cours</CardTitle>
                            <CardDescription>
                                {renderProjects(projectsByStatus.IN_PROGRESS)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            Nombre : {projectsByStatus.IN_PROGRESS.length}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="PENDING">
                    <Card>
                        <CardHeader>
                            <CardTitle>Projet en attente</CardTitle>
                            <CardDescription>
                                {renderProjects(projectsByStatus.PENDING)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            Nombre : {projectsByStatus.PENDING.length}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="NOT_STARTED">
                    <Card>
                        <CardHeader>
                            <CardTitle>Projet non commencé</CardTitle>
                            <CardDescription>
                                {renderProjects(projectsByStatus.NOT_STARTED)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            Nombre : {projectsByStatus.NOT_STARTED.length}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="TERMINATED">
                    <Card>
                        <CardHeader>
                            <CardTitle>Projet terminé</CardTitle>
                            <CardDescription>
                                {renderProjects(projectsByStatus.TERMINATED)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            Nombre : {projectsByStatus.TERMINATED.length}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="PLANNED">
                    <Card>
                        <CardHeader>
                            <CardTitle>Projet planifié</CardTitle>
                            <CardDescription>
                                {renderProjects(projectsByStatus.PLANNED)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            Nombre : {projectsByStatus.PLANNED.length}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

        </div>
    );
}