import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { defineStepper } from "@stepperize/react";
import { HorizontalStepper } from "./Stepper";
export default function Step() {
    type Step = {
        id: string
        title: string
        completed: boolean
    }

    type Props = {
        steps: Step[]
    }

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