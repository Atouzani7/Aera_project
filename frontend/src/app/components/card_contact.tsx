export default function CardContact() {
    return (
        <div className="bg-background border-2 border-border rounded-lg shadow-md p-6 w-80">
            <div className="flex flex-col items-center items-start">
                <h2 className="text-xl font-semibold text-foreground mb-2">Espace message</h2>
                <p className="text-sm text-foreground mb-4">envoyer un mail</p>
                <p className="text-sm text-foreground mb-4">envoyer un une notification</p>
                <p className="text-sm text-foreground mb-4">envoyer un un message </p>
                <button className="bg-detail-pink text-black px-4 py-2 rounded hover:bg-detail-pink-hover transition">
                    Envoyer un message
                </button>
            </div>
        </div>
    );
}