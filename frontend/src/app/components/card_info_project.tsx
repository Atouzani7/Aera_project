export default function CardInfoProject() {
    return (
        <div className="bg-background border-2 border-border rounded-lg shadow-md p-6 w-80">
            <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">Info Project</h2>
                <p className="text-sm text-foreground mb-4">Description du projet</p>
                <p className="text-sm text-foreground mb-4">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur nihil minus corrupti magni facere dicta! Inventore, libero. Nulla officiis eligendi repudiandae obcaecati quia! Ullam in labore voluptatibus perspiciatis dolore quasi!
                </p>
                <div className="flex flex-row gap-10">

                    <p className="text-sm text-foreground mb-4">
                        debut : 01/01/2023
                    </p>
                    <p className="text-sm text-foreground mb-4">
                        fin : 01/01/2023
                    </p>
                </div>
                <button className="bg-detail-pink text-black px-4 py-2 rounded hover:bg-detail-pink-hover transition">
                    Modifier
                </button>
            </div>
        </div>
    );
}