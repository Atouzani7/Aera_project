import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { defineStepper } from "@stepperize/react";
import { HorizontalStepper } from "./Stepper";
import { useQuery } from "@apollo/client/react";
import { FIND_WORKSPACE_BY_ID } from "@/graphQL/queries/workspace.queries";
import { Project } from "@/types/types";
import { LoaderCircleIcon, LoaderPinwheel, LoaderPinwheelIcon } from "lucide-react";
export default function Step() {
    type Step = {
        id: string
        title: string
        completed: boolean
    }

    type Props = {
        steps: Step[]
    }

    // const { data, loading, error } = useQuery<Project>(FIND_WORKSPACE_BY_ID, {
    //     variables: { projectId: '1' },
    // });
    // console.log("data kkkkk:", data);

    // if (loading) return <LoaderCircleIcon className="animate-spin" />;
    // if (error) return <p>Aucune data</p>;

    return (
        <div className="border-foreground/20 rounded-xl p-6 bg-yellow-100/10">
            <HorizontalStepper />
            <Button className="mt-6" >
                Continuer
            </Button>
            <Button className="mt-6" >
                Ajouter étape
            </Button>
            <Button className="mt-6" variant="outline">
                {/* TODO Cahnger STAUTS EN COURS */}
                Valider l&apos;étape en cours
            </Button>
        </div>
    )
}