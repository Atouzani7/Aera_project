import CardContact from "./card_contact";
import CardCreate from "./card_create";
import CardProjectId from "./card_project_id";

export default function CardProfilCustomer() {


    {/* /*

Afficher info client                            --> Voir espace client              --> /project/[id] 


Deadline                         -->                    --> /project.endDate
Derniere mise à jour             -->                    --> /project.updatedAt
Status                           -->                    --> /project.status
Description
vue Files 
tag project                     --> /                   --> /project.tag            


 */ }

    return (
        // <div className="bg-background  border-2 border-border rounded-lg shadow-md p-2 m-2 w-100 max-w-sm max-h-1/2">
        <div className="sm:w-1/2 bg-background   rounded-lg  text-start ">
            {/* <div className="flex flex-col items-center"> */}
            <div>
                <div className="bg-background  gap-4 rounded-lg  flex items-center p-2 mb-2 ">
                    <h2 className="text-xl font-semibold text-foreground mb-2 ">Name Lastname</h2>
                    <div className="flex flex-col">
                        <p className="text-sm text-foreground mb-4">Email : asma@gmail.com</p>
                        <p className="text-sm text-foreground mb-4">Telephone : 123456789</p>
                    </div>
                </div>

                <p className="text-sm text-foreground mb-4">Description project</p>
                <p className="text-sm text-foreground mb-4 maw-w-full">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, sequi quia! Quam nihil explicabo porro dolor dicta, veniam ut, maxime debitis obcaecati perspiciatis necessitatibus animi deleniti temporibus, vitae laborum itaque.
                </p>
            </div>
        </div>
    );
}