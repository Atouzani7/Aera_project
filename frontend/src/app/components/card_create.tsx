export default function CardCreate() {
    return (
        <div className="flex min-h-4/5 items-center justify-center bg-zinc-50 font-sans ">
            {/* <h1 className="text-3xl font-semibold text-black">Composant card création d élément d&apos;un projet
                Nouvelle étape

                Nouveau fichiers

                Nouveau commentaire

                Nouveau bloc texte libre

                Ajouter une nouvelle section </h1>
                
                CaRD CREATE : à mettre dans la page du project id /project/[id]
                permet d'ajoouter un élément au projet en cours d'affichage
                
                */}
            <div className="bg-background border-2 border-border rounded-lg shadow-md p-6 w-80">
                <div className="flex flex-col items-start">
                    <h2 className="text-xl font-semibold text-foreground mb-2">Ajouter un élément</h2>
                    <p className="text-sm text-foreground mb-4">Nouvelle étape</p>
                    <p className="text-sm text-foreground mb-4">Nouveau fichiers</p>
                    <p className="text-sm text-foreground mb-4">Nouveau commentaire</p>
                    {/* <button className="bg-detail-pink text-black px-4 py-2 rounded hover:bg-detail-pink-hover transition">
                        Modifier
                    </button> */}
                </div>
            </div>
        </div>
    );
}