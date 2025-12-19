import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Stepper } from "./stepper";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

export default function CardStep() {


    return (
        <div className="bg-background border-2 border-border rounded-lg shadow-md p-4 items-center justify-start h-full">
            <div className="flex flex-col items-center w-full">
                <h2 className="text-xl font-semibold text-foreground mb-2">Avanncelent du projet</h2>
                <p className="text-sm text-foreground mb-4">Description de l&apos;étape 1</p>

                {/* Conteneur scrollable horizontal */}
                <div className="w-full overflow-x-auto">
                    <div className="flex space-x-4 min-w-max">
                        <Stepper
                            steps={[
                                "Étape 1 : Briefing",
                                "Étape 2 : Design",
                                "Étape 3 : Développement",
                                "Étape 4 : Déploiement",
                                "Étape 5 : Maintenance",
                            ]}
                            currentStep={0}
                        />

                    </div>
                </div>


            </div>

            <div className="flex flex-col items-end mt-4">
                <button className="bg-detail-pink text-black px-4 py-2 rounded hover:bg-detail-pink-hover transition">
                    Ajouter une étape
                </button>
            </div>

        </div >

    );
}