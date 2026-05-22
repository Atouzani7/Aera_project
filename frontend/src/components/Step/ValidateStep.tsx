import { Button } from "@/components/ui/button";
import { UPDATE_STEP } from "@/graphQL/mutations/steps.mutation";
import UpdateStep from "./UpdateStep";
import { CheckIcon } from "lucide-react";
import { useMutation } from "@apollo/client/react";

interface Step {
    id: string;
    name: string;
    description?: string | null;
    status: string;
    endDate?: string | null;
    sequence_number: number;
}

interface ValidateStepProps {
    step: Step;
    onSuccess?: (currentSequenceNumber: number) => void; // On ajoute cette prop optionnelle
}

export default function ValidateStep({ step, onSuccess }: ValidateStepProps) {

    const [updateStep, { loading: validationLoading }] = useMutation(UPDATE_STEP);

    const handleValidateStep = async (step: Step) => {
        try {
            await updateStep({
                variables: {
                    updateStepInput: {
                        id: step.id,
                        name: step.name,
                        description: step.description,
                        status: "TERMINED",
                        endDate: step.endDate || new Date().toISOString(), // GraphQL préfère souvent le format ISO String au timestamp
                    }
                }
            });

            // Si la mutation a réussi et que la fonction est fournie, on l'appelle en passant le numéro de séquence actuel
            if (onSuccess) {
                onSuccess(step.sequence_number);
            }

        } catch (error) {
            console.error("Erreur lors de la validation de l'étape :", error);
        }
    };

    return (
        <div className="flex m-auto gap-2">
            <Button
                onClick={() => handleValidateStep(step)}
                disabled={validationLoading || step.status === "TERMINED"}
                className="px-8 py-4 bg-purple-600/10 hover:bg-purple-600/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-black font-medium transition-all duration-300 hover:bg-purple/20 hover:border-white/30 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
                <CheckIcon className="mr-2 h-4 w-4" />
                {step.status === "TERMINED" ? "Étape validée" : "Valider l'étape"}
            </Button>

            {/* Ensure description is a string to match the UpdateStep prop type (avoid conflicting Step types) */}
            <UpdateStep step={{ ...step, description: step.description ?? "" }} />
        </div>
    )
}