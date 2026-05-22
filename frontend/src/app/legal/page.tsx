
export default function LegalPage() {
    return (
        <main className="max-w-4xl mx-auto  text-gray-800  ">
            <div className=" px-6 py-10 mt-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-200/20 via-transparent to-cyan-200/20 pointer-events-none" />

            <h1 className="text-4xl font-bold mb-10">Mentions légales</h1>

            <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">Éditeur du site</h2>
                <p>
                    Le site aera-project est édité par Asma .
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Statut : Développeuse web indépendante</li>
                    <li>Localisation : Hauts-de-France, France</li>
                    <li>Contact : contact@aera-project.app</li>
                </ul>
            </section>

            <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">Hébergement</h2>
                <p>
                    Le site est hébergé par Vercel.
                </p>
            </section>

            <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">
                    Propriété intellectuelle
                </h2>
                <p>
                    L’ensemble du contenu présent sur aera-project, incluant les textes,
                    illustrations, éléments graphiques, logos, designs et code source,
                    est protégé par les lois relatives à la propriété intellectuelle.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Responsabilité</h2>
                <p>
                    L’éditrice du site s’efforce d’assurer le bon fonctionnement du
                    service mais ne peut garantir l’absence totale d’erreurs ou
                    d’interruptions.
                </p>
            </section>
        </main>
    );
}