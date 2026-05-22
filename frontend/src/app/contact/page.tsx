
export default function ContactPage() {
    return (

        <main className="max-w-3xl mx-auto  text-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-200/20 via-transparent to-cyan-200/20 pointer-events-none" />
            <div className="  pt-30" />
            <h1 className="text-4xl font-bold mb-10">Contact</h1>

            <div className="space-y-8">
                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">
                        Besoin d’aide ?
                    </h2>

                    <p>
                        Pour toute question concernant aera-project, vous pouvez nous contacter
                        par e-mail.
                    </p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">
                        Contact général
                    </h3>

                    <p>contact@aera-project.app</p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">
                        Support technique
                    </h3>

                    <p>support@aera-project.app</p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">
                        Types de demandes
                    </h3>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Signaler un bug</li>
                        <li>Obtenir de l’aide</li>
                        <li>Questions sur votre compte</li>
                        <li>Demandes liées aux données personnelles</li>
                        <li>Collaboration ou partenariat</li>
                    </ul>
                </section>
            </div>

        </main >
    );
}