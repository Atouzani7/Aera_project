import Link from "next/link";
import StatusLayout from "./ui/StatusLayout";

export default function NotFound() {
    return (
        <StatusLayout
            title="404 - Page introuvable"
            message="Oups 😅 La page que tu cherches n’existe pas."
            action={
                <Link
                    href="/"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Retour à l’accueil
                </Link>
            }
        />
    );
}
