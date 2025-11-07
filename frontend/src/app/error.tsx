'use client';

import StatusLayout from "./ui/StatusLayout";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <StatusLayout
            title="Une erreur est survenue 😬"
            message={error.message || "Quelque chose s’est mal passé..."}
            action={
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Réessayer
                </button>
            }
        />
    );
}
