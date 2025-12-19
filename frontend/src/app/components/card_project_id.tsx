import { MotionConfig } from "framer-motion";
import CardProfilCustomer from "./card_profil_customer";
import CardStep from "./card_step";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CardProjectId() {
    return (
        <div className="bg-background border-2 border-border rounded-lg shadow-md sm:p-2 mt-6 w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-screen-lg mx-auto">

            {/* /*

Afficher info client                            --> Voir espace client              --> /project/[id] 
Button modifier info client 
Afficher info projet 
Button modifier info projet 
Afficher info etape     
Button modifier info etape 

Deadline                         -->                    --> /project.endDate
Derniere mise à jour             -->                    --> /project.updatedAt
Status                           -->                    --> /project.status
Description
vue Files 
tag project                     --> /                   --> /project.tag            


 */ }

            <div className="flex flex-col md:flex-row  border-border rounded-lg w-full max-w-screen-lg max-h-full p-6 mb-4 items-top justify-center gap-4">

                <MotionConfig transition={{ type: "spring", stiffness: 100, damping: 20 }}>
                    <CardProfilCustomer />
                </MotionConfig>



                <div>
                    {/* <div className="mt-6 mb-6 space-y-4 flex flex-row items-start justify-end border-2 border-blue-500 rounded-lg w-full max-w-screen-lg max-h-full p-6"> */}
                    <div>
                        <MotionConfig transition={{ type: "spring", stiffness: 100, damping: 20 }}>
                            <CardStep />
                        </MotionConfig>
                    </div>
                </div>

            </div>
            <div className="flex md:flex-row flex-col gap-4 mb-4 space-x-6 items-center rounded-lg p-6 justify-between items-center">

                <div className=" text-zinc-500  text-sm ">

                    <p>Derniere mise à jour : 12 Decembre 2025</p>
                    <p>Deadline : 22 Decembre 2025</p>
                </div>
                <div className="flex flex-row space-x-6 items-end rounded-lg items-center justify-end" >
                    <Badge>Tag</Badge>
                    <Badge variant="secondary">Status</Badge>

                </div>
                <div className="flex flex-row space-x-6 items-end rounded-lg items-center">
                    <Button >Voir projet</Button> {/* link to /project/[id] */}
                    <Button type="submit" className="flex-1  bg-detail-pink hover:bg-detail-pink-hover text-black transition">
                        Modifier
                    </Button>
                </div>

            </div>
        </div >
    );
}   