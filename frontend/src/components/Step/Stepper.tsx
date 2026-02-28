import React from "react";
import { defineStepper } from "@stepperize/react";
import { Button } from "@/components/ui/button";

const { Stepper } = defineStepper(
    { id: "Etape 1", title: "1" },
    { id: "Etape 2", title: "2" },
    { id: "Etape 3", title: "3" },
    { id: "Etape 4", title: "4" },
    { id: "Etape 5", title: "5" }

);

function Trigger({ children }: { children: React.ReactNode }) {
    return (
        <Stepper.Trigger className="border border-primary bg-white px-2 py-1 text-sm data-[status=active]:bg-primary bg-foreground/10 text-muted-foreground rounded-full">
            {children}
        </Stepper.Trigger>
    );
}

export function HorizontalStepper() {
    return (
        <div className="">
            <h1>Avancement</h1>
            <Stepper.Root className=" flex items-center justify-center border-2 border-gray-200 flex flex-col items-center   px-4 py-2 rounded-lg ">
                {({ stepper }) => (
                    <>
                        <Stepper.List className="m-0 flex list-none flex-wrap gap-2 p-0">
                            {stepper.state.all.map((step) => (
                                <React.Fragment key={step.id}>
                                    <Stepper.Item step={step.id}>
                                        <Trigger>
                                            <Stepper.Title render={(props) => <span {...props}>{step.title}</span>} />
                                        </Trigger>
                                    </Stepper.Item>
                                    {step.id !== "Etape 5" && <span className="self-center text-gray-400">→</span>}
                                </React.Fragment>
                            ))}
                        </Stepper.List>
                        <div className="mt-4 min-h-12">
                            <Stepper.Content step="Etape 1"><p>step.description</p></Stepper.Content>
                            <Stepper.Content step="Etape 2"><p>Profile form</p></Stepper.Content>
                            <Stepper.Content step="Etape 3"><p>DEcouverte</p></Stepper.Content>
                            <Stepper.Content step="Etape 4"><p>Projet</p></Stepper.Content>
                            <Stepper.Content step="Etape 5"><p>All done!</p></Stepper.Content>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {stepper.state.isLast ? (
                                <button type="button" onClick={() => stepper.navigation.reset()}>
                                    Revoir détails de l&apos;étape 1
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