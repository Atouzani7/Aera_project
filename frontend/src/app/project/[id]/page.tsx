import { useCurrentUser } from "@/lib/useCurrentUser";
import { UserType } from "../../hook/context/authContext";
import { LoaderCircleIcon } from "lucide-react";

export default function ProjectID() {
    const { user, isLoading, isAuthenticated } = useCurrentUser() as unknown as { user: UserType | null; isLoading: boolean; isAuthenticated: boolean };
    console.log("ProjectID - user:", user?.workspace?.projects);

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
        <div>
            {user?.workspace?.projects && user.workspace.projects.length > 0 ? (
                user.workspace.projects.map((project: any) => (
                    <div key={project.id} className="p-2 border-b">
                        {project.name} (ID: {project.id}) (Status: {project.status})
                    </div>
                ))
            ) : (
                <LoaderCircleIcon className="animate-spin" />
            )}
            {!user.workspace?.projects || user.workspace.projects.length === 0 && (
                <p>Aucun projet dans ce workspace.</p>
            )}
        </div>
    );
}