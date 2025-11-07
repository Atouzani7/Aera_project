import Image from "next/image";
export default function StatusLayout({
    title,
    message,
    action,
}: {
    title: string;
    message?: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
            <div className="max-w-md">
                <Image
                    src="/aera_project.logo.svg"
                    alt="logo"
                    width={200}
                    height={40}
                    className="mx-auto mb-8"
                    priority
                />
                <h1 className="text-4xl font-semibold text-gray-800 mb-4">{title}</h1>
                {message && <p className="text-gray-600 mb-6">{message}</p>}
                {action}
            </div>
        </div>
    );
}
