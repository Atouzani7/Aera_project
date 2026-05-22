
export default function PrivacyPage() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800 mt-20">
            <h1 className="text-4xl font-bold mb-10">
                Politique de confidentialité
            </h1>

            <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">Introduction</h2>
                <p>
                    Cette politique explique comment aera-project collecte, utilise et protège
                    les données personnelles des utilisateurs conformément au RGPD.
                </p>
            </section>

            <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">
                    Données collectées
                </h2>

                <ul className="list-disc pl-6 space-y-2">
                    <li>Adresse e-mail</li>
                    <li>Nom ou pseudonyme</li>
                    <li>Données de progression</li>
                    <li>Préférences utilisateur</li>
                    <li>Données techniques de navigation</li>
                </ul>
            </section>

            <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">
                    Utilisation des données
                </h2>

                <ul className="list-disc pl-6 space-y-2">
                    <li>Créer et gérer un compte utilisateur</li>
                    <li>Sauvegarder les fiches et contenus</li>
                    <li>Personnaliser l’expérience utilisateur</li>
                    <li>Améliorer les fonctionnalités du service</li>
                </ul>
            </section>

            <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">
                    Partage des données
                </h2>

                <p>
                    Les données personnelles ne sont ni vendues ni cédées à des tiers.
                </p>

                <p>
                    Certaines données peuvent être traitées par des prestataires
                    techniques nécessaires au fonctionnement du service.
                </p>
            </section>

            <section className="space-y-4 mb-10">
                <h2 className="text-2xl font-semibold">Cookies</h2>

                <p>
                    Le site peut utiliser des cookies afin d’améliorer l’expérience
                    utilisateur et mesurer l’audience.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Droits des utilisateurs
                </h2>

                <p>
                    Conformément au RGPD, les utilisateurs disposent d’un droit d’accès,
                    de modification et de suppression de leurs données personnelles.
                </p>

                <p>Contact : contact@aera-project.app</p>
            </section>
        </main>
    );
}