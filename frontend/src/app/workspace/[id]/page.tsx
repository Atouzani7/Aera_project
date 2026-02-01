"use client";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { UserType } from "../../hook/context/authContext";
import ProjectID from "../../project/[id]/page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function WorkspaceIdPage() {

    const { user, isLoading, isAuthenticated } = useCurrentUser() as unknown as { user: UserType | null; isLoading: boolean; isAuthenticated: boolean };

    console.log("🚀 WorkspaceIdPage - user:", user?.workspace);
    console.log("🚀 WorkspaceIdPage - project:", user?.workspace?.projects);

    const router = useRouter()

    const handClickCreateProject = () => {
        router.push("/project/newProject")
    }


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to access this workspace.</div>;
    }

    if (!isAuthenticated) {
        return <div>Please log in to access this workspace.</div>;
    }

    if (!user) {
        return <div>Please log in to access this workspace.</div>;
    }
    return <div className="m-40">
        <h1 className="text-2xl font-bold">
            Bienvenue, {user?.firstname} {user?.lastname}

        </h1>
        <p>Votre id : {user?.id}</p>
        {/* <CreateProject /> */}
        <Button onClick={handClickCreateProject}>
            Créer un nouveau projet
        </Button>
        {user?.workspace?.id ? (
            <div className="mt-4 p-6 border rounded shadow">
                <p>Votre Workspace : <strong>{user.workspace.name}</strong></p>
                <p>ID du Workspace : {user?.workspace.id}</p>
                <p>Nombre de projets : {user?.workspace?.projects?.length}</p>
            </div>
        ) : (
            <p>Aucun workspace trouvé pour cet utilisateur.</p>
        )}

        <div className="mt-4 p-6 border rounded shadow ">
            <h2 className="text-xl font-semibold mb-2 ">Détails de l&apos;utilisateur :</h2>
            <div className="flex flex-row">

                <p><strong>Utilsateur :</strong> {user?.lastname}</p>
                <p><strong>{"    "}</strong> {user?.firstname}</p>
            </div>
            <div>
                <p><strong>ID de l&apos;utilisateur :</strong> {user?.id}</p>
                <p><strong>Email :</strong> {user?.email}</p>
            </div>
        </div>
        <div className="mt-4 p-6 border rounded shadow ">
            <h2 className="text-xl font-semibold mb-2 ">Détails du Workspace :</h2>
            <p><strong>Nom du Workspace :</strong> {user?.workspace?.name}</p>
            <p><strong>ID du Workspace :</strong> {user?.workspace?.id}</p>
            {/* <p>Nombre de projet : {user?.workspace.projects?.length}</p> */}
            {/* <p><strong>ID du projets :</strong> {user?.workspace.projects?.map((project) => project.id)}</p> */}
        </div>
        <div className="mt-4 p-6 border rounded shadow ">
            <h2 className="text-xl font-semibold mb-2 ">Détails des Projets :</h2>
            <ProjectID />
        </div>
    </div>

}