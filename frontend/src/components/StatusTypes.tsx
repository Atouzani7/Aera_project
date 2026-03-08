export type StepStatus =
    | 'NOT_STARTED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'BLOCKED'
    | 'ARCHIVED'
    | 'DELETED'
    | 'UNDER_REVIEW'
    | 'WAITING_FOR_FEEDBACK';

type StatusConfig = {
    label: string;
    textColor: string;
    bgColor: string;
    dotColor: string;
    animate?: boolean;
};

export const STATUS_CONFIG: Record<StepStatus, StatusConfig> = {
    NOT_STARTED: {
        label: 'Non commencé',
        textColor: 'text-gray-700',
        bgColor: 'bg-gray-100',
        dotColor: 'bg-gray-400',
    },
    IN_PROGRESS: {
        label: 'En cours',
        textColor: 'text-blue-700',
        bgColor: 'bg-blue-100',
        dotColor: 'bg-blue-500',
        animate: true,
    },
    COMPLETED: {
        label: 'Terminé',
        textColor: 'text-green-700',
        bgColor: 'bg-green-100',
        dotColor: 'bg-green-500',
    },
    BLOCKED: {
        label: 'Bloqué',
        textColor: 'text-red-700',
        bgColor: 'bg-red-100',
        dotColor: 'bg-red-500',
        animate: true,
    },
    ARCHIVED: {
        label: 'Archivé',
        textColor: 'text-purple-700',
        bgColor: 'bg-purple-100',
        dotColor: 'bg-purple-500',
    },
    DELETED: {
        label: 'Supprimé',
        textColor: 'text-gray-500',
        bgColor: 'bg-gray-200',
        dotColor: 'bg-gray-500',
    },
    UNDER_REVIEW: {
        label: 'En révision',
        textColor: 'text-orange-700',
        bgColor: 'bg-orange-100',
        dotColor: 'bg-orange-500',
        animate: true,
    },
    WAITING_FOR_FEEDBACK: {
        label: 'En attente',
        textColor: 'text-yellow-700',
        bgColor: 'bg-yellow-100',
        dotColor: 'bg-yellow-500',
        animate: true,
    },
};