"use client";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { UserType } from "../../hook/context/authContext";
import ProjectID from "../../project/[id]/page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CardProjectID from "../../project/[id]/page";

export default function WorkspaceIdPage() {

    const { user, isLoading, isAuthenticated } = useCurrentUser() as unknown as { user: UserType | null; isLoading: boolean; isAuthenticated: boolean };

    console.log("🚀 WorkspaceIdPage - user:", user?.workspace);

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
    return <div className="md:min-h-[600px] min-h-[500px]  ">

        <div className="mb-10 text-center mt-50 md:mt-40 ">
            <h1 className="text-2xl font-light tracking-wider font-avenir">Dashboard</h1>
            <h1 className="text-m font-medium text-muted-foreground md:mr-4">
                Bienvenue,&nbsp;
                <span className="text-foreground">{user?.firstname}</span>
            </h1>
        </div>

        {/* <p>Votre id : {user?.id}</p> */}
        <Button onClick={handClickCreateProject}>
            Créer un nouveau projet
        </Button>
        {user?.workspace?.id ? (
            <div className="mt-4 p-6 shadow">
                <p>Votre Workspace : <strong>{user.workspace.name}</strong></p>
                <p>ID du Workspace : {user?.workspace.id}</p>
            </div>
        ) : (
            <p>Aucun workspace trouvé pour cet utilisateur.</p>
        )}
        <div className="mt-4 p-6 @ shadow ">
            <h2 className="text-xl font-semibold mb-2 ">Détails des Projets :</h2>
            <CardProjectID />
        </div>
    </div>

}