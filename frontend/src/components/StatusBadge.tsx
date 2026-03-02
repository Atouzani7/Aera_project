export default function StatusBadge({ status }: { status: string }) {
    const statusStyles: Record<string, string> = {
        NOT_STARTED: "bg-gray-200 text-gray-800",
        IN_PROGRESS: "bg-blue-200 text-blue-800",
        PLANNED: "bg-yellow-200 text-yellow-800",
        COMPLETED: "bg-green-200 text-green-800",
        BLOCKED: "bg-red-200 text-red-800",
        ARCHIVED: "bg-gray-300 text-gray-600",
        DELETED: "bg-black text-white",
        PENDING: "bg-yellow-200 text-yellow-800",
        WAITING_FOR_FEEDBACK: "bg-yellow-200 text-yellow-800",
    };

    const labelStatus: Record<string, string> = {
        NOT_STARTED: "Pas commencé",
        IN_PROGRESS: "En cours",
        PLANNED: "Planifié",
        COMPLETED: "Terminé",
        BLOCKED: "Bloqué",
        ARCHIVED: "Archivé",
        DELETED: "Supprimé",
        PENDING: "En attente",
        WAITING_FOR_FEEDBACK: "En attente de feedback",
    };

    const dotColors: Record<string, string> = {
        NOT_STARTED: "bg-gray-400",
        IN_PROGRESS: "bg-blue-500 animate-pulse",
        PLANNED: "bg-yellow-500 animate-pulse",
        COMPLETED: "bg-green-500",
        BLOCKED: "bg-red-500 animate-pulse",
        ARCHIVED: "bg-gray-500",
        DELETED: "bg-gray-500",
        PENDING: "bg-yellow-500 animate-pulse",
        WAITING_FOR_FEEDBACK: "bg-yellow-500 animate-pulse",
    };

    const style = statusStyles[status] || "bg-gray-200 text-gray-800";
    const label = labelStatus[status] || status.replace(/_/g, ' ');

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
            <span className={`inline-block w-2 h-2 rounded-full ${dotColors[status]}`}></span> {label}
        </span>
    );
}