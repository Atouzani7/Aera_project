"use client"
import React, { useState } from "react";
import { defineStepper } from "@stepperize/react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client/react";

import { StepsByProjectQuery } from "@/types/types";
import { STEPS_BY_PROJECT } from "@/graphQL/queries/steps.queries";
import { CreateStep } from "./CreateStep";
import StatusBadge from "../StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckIcon, SquarePen, SquarePenIcon } from "lucide-react";


export function HorizontalStepper({ projectId, withoutDetails = false }: { projectId?: string, withoutDetails?: boolean }) {


    // const { id } = useParams<{ id: string }>();

    const { data, loading, error } = useQuery<StepsByProjectQuery>(STEPS_BY_PROJECT, {
        variables: { projectId: projectId }, // Utilise projectId ici
        skip: !projectId,
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <> <p className="text-gray-500">Aucune étape pour ce projet. Crée ta première étape 👇</p>
        {projectId && <CreateStep projectId={projectId} />}
    </>;
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

    function StepperForm() {
        // 1. On crée un état pour l'onglet actif
        const [currentTab, setCurrentTab] = useState("step-1");
        const handleNext = () => {
            if (currentTab === "step-1") setCurrentTab("step-2");
            else if (currentTab === "step-2") setCurrentTab("step-3");
        };
    }


    if (withoutDetails) {
        return (
            <div className="flex items-center justify-center flex-col items-center  rounded-lg max-w-[400px] ">

                <Stepper.Root className="flex items-center justify-center flex flex-col items-center  rounded-lg">
                    {({ stepper }) => (
                        <>

                            {data.stepsByProject.length === 0 ? (
                                <> <p className="text-gray-500 text-sm mb-4">Aucune étape pour ce projet. Crée ta première étape 👇</p>
                                    {projectId && <CreateStep projectId={projectId} />}
                                </>
                            ) : (
                                <> <p className="text-sm font-bold mb-4">Avancement</p>
                                    <Stepper.List className="m-0 flex list-none flex-wrap gap-2 p-0   overflow-x-auto scrollbar-hide  rounded-lg">
                                        <div className="h-[120px] w-[400px] border border-gray-300 border-shadow bg-white rounded-lg p-2 m-2 overflow-y-auto scrollbar-thin">
                                            {sortedSteps.map((step) => (
                                                <Stepper.Content key={step.id} step={step.id}>
                                                    <p className="m-auto"> <StatusBadge status={step.status} onlyDot />&nbsp;  <span className="font-bold text-sm">{step.name}</span></p>
                                                    {sortedSteps.find(s => s.id === step.id)?.description && <p className="text-sm text-muted-foreground">{step.description}</p>}
                                                </Stepper.Content>
                                            ))}
                                        </div>

                                    </Stepper.List>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {stepper.state.isLast ? (
                                            <Button
                                                type="button"
                                                onClick={() => stepper.navigation.reset()}
                                            >
                                                Revenir à la première étape
                                            </Button>
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
                                        <Button> <CheckIcon /> Valider l&apos;étape</Button>
                                    </div>
                                    <div className="m-4" >

                                        {projectId && <CreateStep projectId={projectId} />}
                                    </div>
                                </>

                                /*  todo : ajouter la validdation de l'étape (terminé ou pas) et faire en sorte que les étapes validées soient vertes et les étapes en cours soient jaunes et les étapes à venir soient grises */
                            )}</>
                    )}
                </Stepper.Root>
            </div>
        );
    }

    return (
        <div className="">
            <h1 className="text-sm font-bold mb-4">Avancement</h1>
            <Tabs defaultValue={sortedSteps[0]?.id} className="w-[full] h-[400px] md:min-w-[400px] rounded-lg p-2">
                <TabsList className="flex w-full overflow-x-auto scrollbar-hide scrollbar-thin rounded-lg  gap-2 mb-4 p-1">
                    {sortedSteps.map((step) => (
                        <TabsTrigger key={step.id} value={step.id} className="bg-purple-100">
                            {step.name} &nbsp;
                            <StatusBadge status={step.status} onlyDot />
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* N'oublie pas de mapper aussi le contenu ! */}
                {sortedSteps.map((step) => (
                    <TabsContent key={step.id} value={step.id} className="bg-white rounded-lg p-4 border border-gray-300 shadow-sm">
                        <StatusBadge status={step.status} /><span className="font-bold text-sm">{step.name}</span><br />
                        {step.description}
                        <div className="flex justify-end m-auto gap-2" >
                            <Button className="px-8 py-4 bg-purple-600/10 hover:bg-purple-600/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-black font-medium transition-all duration-300 hover:bg-purple/20 hover:border-white/30 hover:scale-105 active:scale-95">
                                <CheckIcon /> Valider l&apos;étape
                            </  Button>
                            <Button className="px-8 py-4 bg-purple-600/10 hover:bg-purple-600/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-black font-medium transition-all duration-300 hover:bg-purple/20 hover:border-white/30 hover:scale-105 active:scale-95">
                                <SquarePenIcon /> Modifier
                            </  Button>
                        </div>

                    </TabsContent>
                ))}
                <div className="m-4" >

                    {projectId && <CreateStep projectId={projectId} />}
                </div>
            </Tabs>

            <Stepper.Root className="flex items-center justify-center flex flex-col items-center  rounded-lg">
                {({ stepper }) => (
                    <>

                        {data.stepsByProject.length === 0 ? (
                            <> <p className="text-gray-500 text-sm mb-4">Aucune étape pour ce projet. Crée ta première étape 👇</p>
                                {projectId && <CreateStep projectId={projectId} />}
                            </>
                        ) : (
                            <><Stepper.List className="m-0 flex list-none flex-wrap gap-2 p-0 ">
                                {data.stepsByProject.map((step, index) => (
                                    <React.Fragment key={step.id}>
                                        <Stepper.Item step={step.id}>
                                            <Stepper.Trigger>
                                                <Stepper.Title className="flex text-center rounded-lg md:min-w-[100px] bg-purple-100 text-black text-sm px-2 py-1 text-s shadow-sm/50 hover:bg-green-200/30">
                                                    {step.name}
                                                </Stepper.Title>
                                            </Stepper.Trigger>
                                        </Stepper.Item>

                                        {index !== sortedSteps.length - 1 && (
                                            <span className="self-center text-gray-400">→</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </Stepper.List><div className="mt-4 min-h-12 rounded-lg p-4 w-full">
                                    {sortedSteps.map((step) => (
                                        <Stepper.Content key={step.id} step={step.id}>
                                            <p className=""> <StatusBadge status={step.status} /></p>
                                            <p>{step.description}</p>

                                        </Stepper.Content>
                                    ))}
                                </div><div className="mt-4 flex flex-wrap gap-2">
                                    {stepper.state.isLast ? (
                                        <Button
                                            type="button"
                                            onClick={() => stepper.navigation.reset()}
                                        >
                                            Revenir à la première étape
                                        </Button>
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
                                <div className="m-4" >

                                    {projectId && <CreateStep projectId={projectId} />}
                                </div>
                            </>

                            /*  todo : ajouter la validdation de l'étape (terminé ou pas) et faire en sorte que les étapes validées soient vertes et les étapes en cours soient jaunes et les étapes à venir soient grises */
                        )}</>
                )}
            </Stepper.Root>
        </div >
    );
}
