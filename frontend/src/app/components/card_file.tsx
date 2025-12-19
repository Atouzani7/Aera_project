export default function CardFiles() {
    return (
        <div className="bg-background border-2 border-border rounded-lg shadow-md p-6 w-80">
            <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">Document</h2>
                {/* <p className="text-sm text-foreground mb-4">Description des fichiers</p> */}
                <p className="text-sm text-foreground mb-4">Notion</p>
                <p className="text-sm text-foreground mb-4">Google Drive</p>
                <button className="bg-detail-pink text-black px-4 py-2 rounded hover:bg-detail-pink-hover transition">
                    Ajouter un fichier
                </button>
            </div>
        </div>
    );
}   