// import CardContact from "../components/card_contact";
// import CardCreate from "../components/card_create";
// import CardProfilCustomer from "../components/card_profil_customer";
import CardProjectId from "../components/card_project_id";
// import CardStep from "../components/card_step";

export default function Workspace() {

    return <div className="flex min-h-screen mt-40 m-2 font-sans sm:flex-col lg:flex-row ">
        <main className="flex-1">
            <div>
                <h1 className="text-3xl font-semibold underline">Workspace Page</h1>
                <p className="text-lg text-gray-700">Bienvenue dans votre espace de travail</p>
                <CardProjectId />
                <CardProjectId />
                <CardProjectId />
                <CardProjectId />
            </div>
        </main>
    </div>

}