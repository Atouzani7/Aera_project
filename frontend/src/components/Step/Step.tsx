import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { defineStepper } from "@stepperize/react";
import { HorizontalStepper } from "./Stepper";
import { useQuery } from "@apollo/client/react";
import { FIND_WORKSPACE_BY_ID } from "@/graphQL/queries/workspace.queries";
import { Project } from "@/types/types";
import { LoaderCircleIcon, LoaderPinwheel, LoaderPinwheelIcon } from "lucide-react";
import { CreateStep } from "./CreateStep";
export default function Step(projectId: string, stepId: string) {
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

            {/* <CreateStep projectId={projectId} /> */}
        </div>
    )
}