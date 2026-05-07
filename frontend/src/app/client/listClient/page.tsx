"use client"
import Filter from "@/src/components/Filter";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontalIcon, PenBox, Trash2 } from "lucide-react";
import { useState } from "react";
import useMyClients from "../../hook/useClient";
import useProject from "../../hook/useProject";
import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { useQuery } from "@apollo/client/react";
import { Project } from "@/types/types";

export default function ListClientPage() {

    const { clients, loading, error } = useMyClients();
    const [search, setSearch] = useState("");
    const { user } = useCurrentUser();


    const userId = user?.id;
    const { data } = useQuery<{ userWorkspaces: Array<{ projects: Project[] }> }>(FIND_WORKSPACE_BY_USERID, { variables: { userId }, skip: !userId });


    const projects = data?.userWorkspaces?.flatMap(ws => ws.projects) ?? [];
    const { project, isLoading: projectLoading } = useProject();


    // if (isLoading) return <div>Loading...</div>;

    console.log("project dans la page client ", project?.name);




    const filteredClients = clients.filter((p) =>
        `${p.lastname} ${p.name} ${p.email} ${p.phone} ${p.address} ${p.city} ${p.country} ${p.postalCode}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;



    const pathnameProject = `/project`;

    if (projectLoading) {
        return <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>;
    }
    return (
        <div className="container mx-auto px-4 py-8 mt-[74px] min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Liste des clients</h1>

            <Filter onSearch={setSearch} />
            <Table>
                <TableHeader >
                    <TableRow className="text-primary ">
                        <TableHead className="bg-primary/20">Nom - Prénom</TableHead>
                        <TableHead className="bg-primary/20">Project</TableHead>
                        <TableHead className="bg-primary/20">Adresse mail</TableHead>
                        <TableHead className="bg-primary/20">Téléphone</TableHead>
                        <TableHead className="bg-primary/20">Ville </TableHead>
                        <TableHead className="bg-primary/20">Code Postal</TableHead>

                        <TableHead className="w-8 bg-primary/20"><MoreHorizontalIcon /> </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* {filteredProjects.map((p) => ( */}
                    {filteredClients.map((c) => (
                        <TableRow key={c.id}>

                            <TableCell className="font-medium">
                                {c.name + " " + c.lastname}
                            </TableCell>



                            <TableCell className="font-medium">
                                {(() => {
                                    const clientProjects = projects.filter(
                                        p => p.client?.id === c.id
                                    );
                                    console.log(
                                        "PROJECTS DEBUG",
                                        projects.map(p => ({
                                            project: p.name,
                                            clientId: p.client?.id,
                                            clientObjId: p.client?.id
                                        }))
                                    );
                                    if (clientProjects.length === 0) {
                                        return (
                                            <span className="italic opacity-50 text-sm">
                                                Aucun projet
                                            </span>
                                        );
                                    }

                                    return clientProjects.map((p) => (
                                        <span key={p.id} className="flex flex-wrap gap-2 ">
                                            <a
                                                href={`${pathnameProject}/${p.id}/${p.name}`}
                                                className="text-sm text-muted-foreground hover:text-primary hover:underline"
                                            >
                                                {/* {p.name} */}
                                                <ul className="px-2 py-1 text-xs rounded-md bg-muted hover:bg-primary hover:text-white transition list-none. bg-white/10">
                                                    <li>{p.name}</li>
                                                </ul>
                                            </a>

                                            {/* {index < clientProjects.length - 1 && " - "} */}
                                        </span>
                                    ));
                                })()}
                            </TableCell>

                            <TableCell>{c.email}</TableCell>
                            <TableCell>{c.phone}</TableCell>
                            <TableCell>{c.city}</TableCell>
                            <TableCell>{c.postalCode}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild >
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-background/80 text-300">
                                        <DropdownMenuItem><PenBox /> Modifier</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem >
                                            <Trash2 /> Supprimer
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

    );
}