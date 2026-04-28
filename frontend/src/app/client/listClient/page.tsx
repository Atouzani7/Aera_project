"use client"
import useProject from "../../hook/useProject";
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

export default function ListClientPage() {


    const project = useProject();
    const [search, setSearch] = useState("");

    const filteredProjects = project.projects.filter((p) =>
        `${p.contact_name} ${p.name} ${p.contact_email} ${p.contact_phone}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    function toSlug(name: string) {
        return name
            .toLowerCase()                  // tout en minuscule
            .trim()                         // enlève espaces avant/après
            .replace(/[\s]+/g, "-")         // remplace espaces par "-"
            .replace(/[^\w\-]+/g, "")       // supprime caractères spéciaux
    }

    const pathnameProject = `/project`;

    if (project.isLoading) {
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
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom - Prénom</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Adresse mail</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead className="w-8"><MoreHorizontalIcon /> </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredProjects.map((p) => (
                        <TableRow key={p.id}>

                            <TableCell className="font-medium">
                                {p.contact_name}
                            </TableCell>

                            <TableCell className="font-medium">
                                <a href={pathnameProject + "/" + p.id + "/" + toSlug(p.name)} className="text-sm text-muted-foreground">{p.name}</a>
                            </TableCell>

                            <TableCell>{p.contact_email}</TableCell>
                            <TableCell>{p.contact_phone}</TableCell>
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