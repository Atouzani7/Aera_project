import React from "react";
import { defineStepper } from "@stepperize/react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client/react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { FIND_WORKSPACE_BY_USERID } from "@/graphQL/queries/workspace.queries";
import { StepsByProjectQuery, UserWorkspacesQuery } from "@/types/types";
import { STEPS_BY_PROJECT } from "@/graphQL/queries/steps.queries";
import { Step } from "motion/react";
import { useParams } from "next/navigation";


export function HorizontalStepper() {

    const { projectId } = useParams<{ projectId: string }>();
    const { id } = useParams<{ id: string }>();


    const { data, loading, error } = useQuery<StepsByProjectQuery>(STEPS_BY_PROJECT, {
        variables: { projectId: id },
        skip: !id,
    });

    console.log("params:", useParams());

    console.log(" id:", id);

    console.log("projectId:", projectId);
    console.log("loading:", loading);
    console.log("error:", error);
    console.log("data hhh:", data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Aucune étape trouvée</p>;
    if (!data) return null;

    const sortedSteps = [...data.stepsByProject].sort((a, b) => {
        // On suppose que `createdAt` est au format ISO string
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });


    const { Stepper } = defineStepper(
        ...sortedSteps.map((step: StepsByProjectQuery["stepsByProject"][number], index: number) => ({
            id: step.id,
            title: String(index + 1),
        }))
    );



    return (
        <div className="">
            <h1>Avancement</h1>

            <Stepper.Root className="flex items-center justify-center border-2 border-gray-200 flex flex-col items-center   px-4 py-2 rounded-lg">
                {({ stepper }) => (
                    <>
                        <Stepper.List className="m-0 flex list-none flex-wrap gap-2 p-0 ">
                            {data.stepsByProject.map((step, index) => (
                                <React.Fragment key={step.id}>
                                    <Stepper.Item step={step.id}>
                                        <Stepper.Trigger>
                                            <Stepper.Title className="rounded-lg bg-primary text-black px-2 py-1 text-s shadow-sm/50 hover:bg-primary/50">
                                                {step.name}
                                            </Stepper.Title>
                                        </Stepper.Trigger>
                                    </Stepper.Item>

                                    {index !== sortedSteps.length - 1 && (
                                        <span className="self-center text-gray-400">→</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </Stepper.List>

                        <div className="mt-4 min-h-12">
                            {sortedSteps.map((step) => (
                                <Stepper.Content key={step.id} step={step.id}>
                                    <p>{step.description}</p>
                                </Stepper.Content>
                            ))}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {stepper.state.isLast ? (
                                <button
                                    type="button"
                                    onClick={() => stepper.navigation.reset()}
                                >
                                    Revoir la première étape
                                </button>
                            ) : (
                                <>
                                    <Stepper.Prev className="border border-gray-300 bg-white px-2 py-1 text-sm rounded-md disabled:opacity-50 disabled:pointer-events-none">
                                        Précédent
                                    </Stepper.Prev>
                                    <Stepper.Next className="border border-primary bg-primary px-2 py-1 text-sm rounded-md disabled:opacity-50 disabled:pointer-events-none">
                                        Suivant
                                    </Stepper.Next>
                                </>
                            )}
                        </div>
                    </>
                )}
            </Stepper.Root>
        </div >
    );
}
