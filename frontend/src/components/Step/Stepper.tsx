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
            <div className="w-full">


                <Stepper.Root className=" ">
                    {({ stepper }) => (
                        <>

                            {data.stepsByProject.length === 0 ? (
                                <> <p className="text-gray-500 text-sm mb-4">Aucune étape pour ce projet. Crée ta première étape 👇</p>
                                    {projectId && <CreateStep projectId={projectId} />}
                                </>
                            ) : (
                                <>
                                    <Stepper.List className="   overflow-x-auto scrollbar-hide  rounded-lg ">
                                        <p className="text-sm font-bold mb-2 mt-2 ">Avancement</p>
                                        <p className="text-sm font-bold mb-2 mt-2 text-primary">Etape en cours</p>
                                        <div className="flex    border border-gray-300 border-shadow rounded-lg p-2 m-2 overflow-y-auto scrollbar-thin">
                                            {sortedSteps.map((step) => (
                                                <Stepper.Content key={step.id} step={step.id}>
                                                    <p className="m-auto"> <StatusBadge status={step.status} onlyDot />&nbsp;  <span className="font-bold text-sm">{step.name}</span></p>
                                                    {sortedSteps.find(s => s.id === step.id)?.description && <p className="text-sm text-muted-foreground hiden md:block">{step.description}</p>}
                                                    {/* {step.description && (
                                                        <p className="text-sm text-muted-foreground hidden md:block">
                                                            {step.description}
                                                        </p>
                                                    )} */}
                                                </Stepper.Content>
                                            ))}
                                        </div>

                                    </Stepper.List>
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
        <div className=" ">
            <h1 className="text-sm font-bold mb-2">Avancement </h1>
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
                        <div className="flex m-auto gap-2" >
                            <Button className="px-8 py-4 bg-purple-600/10 hover:bg-purple-600/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-black font-medium transition-all duration-300 hover:bg-purple/20 hover:border-white/30 hover:scale-105 active:scale-95">
                                <CheckIcon /> Valider l&apos;étape
                            </  Button>
                            <Button className="px-8 py-4 bg-purple-600/10 hover:bg-purple-600/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-black font-medium transition-all duration-300 hover:bg-purple/20 hover:border-white/30 hover:scale-105 active:scale-95">
                                <SquarePenIcon /> Modifier
                            </  Button>
                        </div>
                        Bouton suivant step a ajouter
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
                            <>

                            </>

                            /*  todo : ajouter la validdation de l'étape (terminé ou pas) et faire en sorte que les étapes validées soient vertes et les étapes en cours soient jaunes et les étapes à venir soient grises */
                        )}</>
                )}
            </Stepper.Root>
        </div >
    );
}
