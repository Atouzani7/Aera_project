import { useCurrentUser } from "@/lib/useCurrentUser";
import { UserType } from "../../hook/context/authContext";
import { LoaderCircleIcon } from "lucide-react";
import { useQuery } from "@apollo/client/react";
import { FIND_WORKSPACE_BY_ID, FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";


type WorkspaceQueryResult = {
    userWorkspaces: {
        projects: {
            id: string;
            name: string;
            description: string;
            status: string;
        };
        id: string;
        name: string;
        // workspace: {
        //     id: string;
        //     name: string;
        // projects: {
        //     id: string;
        //     name: string;
        //     description: string;
        //     status: string;
        // }[]
        // }
    }[];
};

export default function ProjectID() {

    const { user, isLoading, isAuthenticated } = useCurrentUser();

    const userId = user?.id;

    const { data, loading, error } = useQuery<WorkspaceQueryResult>(FIND_WORKSPACE_BY_USERID, {
        variables: { userId },
        skip: !isAuthenticated || !userId,
    });

    console.log("🤖 PROJECT ID - data project", data);


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

            {isLoading ? (
                <LoaderCircleIcon className="animate-spin" />
            ) : (data?.userWorkspaces && data.userWorkspaces.length > 0 &&
                data.userWorkspaces[0]?.projects?.length > 0) ? (
                data.userWorkspaces[0].projects.map((project) => (
                    <div key={project.id} className="p-2 border-b">
                        {project.name} (ID: {project.id})
                    </div>
                ))
            ) : (
                <p>Aucun projet dans ce workspace.</p>
            )}
        </div>
    );


}