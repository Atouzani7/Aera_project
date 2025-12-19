import CardContact from "../components/card_contact";
import CardCreate from "../components/card_create";
import CardFiles from "../components/card_file";
import CardInfoProject from "../components/card_info_project";
import CardProfilCustomer from "../components/card_profil_customer";
import CardStep from "../components/card_step";

export default function Project() {
    return (
        <div className="flex flex-col min-h-screen  justify-center bg-zinc-50 font-sans md:mt-30 mt-40 m-2 gap-4 ">
            <h1 className="text-3xl font-semibold text-black">Project Page</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row items-center justify-center p-4 gap-5">

                    <CardProfilCustomer />
                    <div >

                        <CardInfoProject />
                    </div>
                </div>
                <CardStep />
                <div className="w-90">

                </div>
                <div className="flex flex-col md:flex-row gap-4 items-center md:items-start justify-center">

                    <CardContact />
                    <CardFiles />
                    <CardCreate />
                </div>
            </div>
        </div >
    );
}