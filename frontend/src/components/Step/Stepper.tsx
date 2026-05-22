
"use client"
import React, { useState, useEffect } from "react";
import { defineStepper } from "@stepperize/react";
import { useQuery } from "@apollo/client/react";

import { StepsByProjectQuery } from "@/types/types";
import { STEPS_BY_PROJECT } from "@/graphQL/queries/steps.queries";
import { CreateStep } from "./CreateStep";
import StatusBadge from "../StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ValidateStep from "./ValidateStep";


export function HorizontalStepper({ projectId, withoutDetails = false }: { projectId?: string, withoutDetails?: boolean }) {

    const { data, loading, error } = useQuery<StepsByProjectQuery>(STEPS_BY_PROJECT, {
        variables: { projectId: projectId },
        skip: !projectId,
    });

    // 1. Déclaration du State pour l'onglet actif (géré par ID)
    const [activeTab, setActiveTab] = useState<string>("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sortedSteps = data?.stepsByProject ? [...data.stepsByProject].sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }) : [];

    // 2. Initialise l'onglet actif sur la première étape dès que les données sont chargées
    useEffect(() => {
        if (sortedSteps.length > 0 && !activeTab) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveTab(sortedSteps[0].id);
        }
    }, [sortedSteps, activeTab]);

    if (loading) return <p>Loading...</p>;
    if (error) return <> <p className="text-gray-500">Aucune étape pour ce projet. Crée ta première étape 👇</p>
        {projectId && <CreateStep projectId={projectId} />}
    </>;
    if (!data) return null;

    const { Stepper } = defineStepper(
        ...sortedSteps.map((step, index) => ({
            id: step.id,
            title: String(index + 1),
        }))
    );

    // 3. Fonction pour passer automatiquement à l'étape suivante via le sequence_number
    const handleNextStep = (currentSequenceNumber: number) => {
        const nextStep = sortedSteps.find(s => s.sequence_number === currentSequenceNumber + 1);
        if (nextStep) {
            setActiveTab(nextStep.id);
        }
    };


    if (withoutDetails) {
        // 1. On cherche l'étape "En cours". Si elle n'existe pas, on prend la toute première étape.
        const currentStep = sortedSteps.find(step => step.status === "IN_PROGRESS") || sortedSteps[0];

        return (
            <div className="w-full rounded-lg p-2">
                <h1 className="text-sm font-bold mb-2">Avancement</h1>

                {/* Le titre s'adapte dynamiquement selon le statut de l'étape affichée */}
                <p className="text-sm font-bold mb-2 mt-2 text-primary">
                    {currentStep?.status === "IN_PROGRESS" ? "Étape en cours" : "Première étape"}
                </p>

                {currentStep ? (
                    // 2. On affiche l'étape trouvée (soit "En cours", soit la première)
                    <div className="bg-white rounded-lg p-4 border border-gray-300 shadow-sm mt-2">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-purple-100 px-2 py-1 rounded font-bold">
                                N° {currentStep.sequence_number}
                            </span>
                            <StatusBadge status={currentStep.status} />
                            <span className="font-bold text-sm">{currentStep.name}</span>
                        </div>

                        <p className="my-2 text-sm text-gray-600">{currentStep.description}</p>

                        <div className="flex gap-2 mt-4">
                            <ValidateStep step={currentStep} onSuccess={handleNextStep} />
                        </div>
                    </div>
                ) : (
                    // 3. Cas de secours si le tableau sortedSteps est complètement vide
                    <p className="text-sm text-gray-500 italic my-4">
                        Aucune étape disponible pour le moment.
                    </p>
                )}

                {/* Le bouton de création d'étape reste en bas */}
                <div className="mt-4">
                    {projectId && <CreateStep projectId={projectId} />}
                </div>
            </div>
        );
    }




    return (
        <div className=" ">
            <h1 className="text-sm font-bold mb-2">Avancement </h1>

            {/* 4. On lie la value et le onChange des Tabs à notre state */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-[400px] md:min-w-[400px] rounded-lg p-2">

                <TabsList className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide gap-2 mb-4 p-1 rounded-lg sm:flex-wrap sm:overflow-visible">
                    {sortedSteps.map((step) => (
                        <TabsTrigger
                            key={step.id}
                            value={step.id}
                            className="flex-shrink-0 bg-purple-100 text-xs sm:text-sm px-3 py-2 rounded-md"
                        >
                            <span className="truncate max-w-[140px] sm:max-w-none mr-1">
                                {step.sequence_number} - {step.name}
                            </span>
                            <StatusBadge status={step.status} onlyDot />
                        </TabsTrigger>
                    ))}
                </TabsList>

                {sortedSteps.map((step) => (
                    <TabsContent key={step.id} value={step.id} className="bg-white rounded-lg p-4 border border-gray-300 shadow-sm">
                        <StatusBadge status={step.status} /> <span className="font-bold text-sm">{step.name}</span><br />
                        <p className="my-2 text-sm text-gray-600">{step.description}</p>

                        <div className="flex m-auto gap-2 mt-4" >
                            {/* 5. On passe la fonction handleNextStep au composant ValidateStep */}
                            <ValidateStep step={step} onSuccess={handleNextStep} />
                        </div>
                    </TabsContent>
                ))}

                <div className="m-4" >
                    {projectId && <CreateStep projectId={projectId} />}
                </div>
            </Tabs>
        </div>
    );
}