import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { UserWorkspacesQuery } from "@/types/types";
import { useQuery } from "@apollo/client/react";
import {
    Card
} from "@/components/ui/card"
import { BookmarkCheck, Clock, Folder, Hourglass, ListTodoIcon } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function ResumeCountProject() {

    const { user } = useCurrentUser();

    const userId = user?.id;

    const { data, loading, error } = useQuery<UserWorkspacesQuery>(
        FIND_WORKSPACE_BY_USERID,
        {
            variables: { userId }
        }
    )
    const projects = data?.userWorkspaces?.flatMap((ws) => ws?.projects ?? []) ?? []

    const counts = projects.reduce((acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const parts = [];

    if (counts.PLANNED) parts.push(`${counts.PLANNED} planifié${counts.PLANNED > 1 ? "s" : ""}`);
    if (counts.IN_PROGRESS) parts.push(`${counts.IN_PROGRESS} en cours`);
    if (counts.PENDING) parts.push(`${counts.PENDING} en attente`);
    if (counts.NOT_STARTED) parts.push(`${counts.NOT_STARTED} non commencé${counts.NOT_STARTED > 1 ? "s" : ""}`);
    if (counts.TERMINED) parts.push(`${counts.TERMINED} terminé${counts.TERMINED > 1 ? "s" : ""}`);

    const statusConfig = [
        { key: "PLANNED", label: "Planifiés", color: "bg-blue-100 text-blue-600", icons: <Folder color="#322abe" /> },
        { key: "IN_PROGRESS", label: "En cours", color: "bg-purple-300/20 text-purple-600", icons: <Clock color="#b992b8" /> },
        { key: "PENDING", label: "En attente", color: "bg-yellow-100 text-yellow-600", icons: <Hourglass color="#e3d24d" /> },
        { key: "NOT_STARTED", label: "Non commencés", color: "bg-gray-500/20 text-gray-600", icons: <ListTodoIcon color="#6b7280" /> },
        { key: "TERMINED", label: "Terminés", color: "bg-green-300/20 text-green-600", icons: <BookmarkCheck color="#16a34a" /> },
    ];

    return (
        <div className="mb-10 text-center flex flex-col items-center">
            <p className="text-lg text-muted-foreground text-sm mb-2 ">Tu as {Object.values(counts).reduce((a, b) => a + b, 0)} projet{Object.values(counts).reduce((a, b) => a + b, 0) > 1 ? "s" : ""} au total</p>
            <p>
            </p>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {statusConfig.map((status) => {
                    const count = counts[status.key] || 0;
                    if (count === 0) return null;

                    return (
                        <Card
                            key={status.key}
                            className="p-4 flex flex-row items-center gap-2 min-w-[200px] flex-shrink-0 bg-white/30 border-1 border-gray-200"
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status.color}`}>
                                <p>{status.icons}</p>
                            </div>
                            <div>
                                <p className="text-xl font-semibold">{count}</p>
                                <div className="flex items-center gap-2">
                                    <StatusBadge status={status.key} onlyDot={true} />
                                    <p className="text-sm text-muted-foreground whitespace-nowrap">{status.label}</p>

                                </div>

                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}
