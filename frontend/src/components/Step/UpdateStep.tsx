import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { buttonStyles } from "../ButtonStyle"
import { PencilIcon } from "lucide-react" // Changé pour une icône d'édition
import { useState } from "react"
import { UPDATE_STEP } from "@/graphQL/mutations/steps.mutation"
import { useMutation } from "@apollo/client/react"
import { en } from "zod/v4/locales"


interface Step {
    id: string
    name: string
    description: string
    status: string
}

interface UpdateStepProps {
    step: Step
}

export default function UpdateStep({ step }: UpdateStepProps) {
    const [open, setOpen] = useState(false)

    // On initialise le state avec les valeurs actuelles de la step
    const [updateStepInput, setUpdateStepInput] = useState({
        name: step.name,
        description: step.description,
        status: step.status,
    })

    const [updateStep, { loading }] = useMutation(UPDATE_STEP);

    // Gestion des changements pour les inputs classiques (text, textarea)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdateStepInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateStep({
                variables: {
                    updateStepInput: {
                        id: step.id,
                        name: updateStepInput.name,
                        description: updateStepInput.description,
                        status: updateStepInput.status,
                        endDate: Date.now(),
                    }
                }
            });

            setOpen(false);
        } catch (error) {
            console.error("Erreur lors de la modification de l'étape :", error);
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {/* Bouton "Modifier" au lieu de "Ajouter" */}
                    <Button className={buttonStyles.warning}>
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Modifier l’étape
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Modifier l&lsquo;étape</DialogTitle>
                            <DialogDescription>
                                Modifiez les informations de cette étape pour le suivi du projet.
                            </DialogDescription>
                        </DialogHeader>

                        <FieldGroup className="mt-4 space-y-4">
                            <Field>
                                <Label htmlFor="name">Titre de l&lsquo;étape</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={updateStepInput.name} // Corrigé ici
                                    onChange={handleChange}
                                    className="rounded-xl"
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Précisez l’objectif et les livrables de cette étape."
                                    value={updateStepInput.description} // Corrigé ici
                                    onChange={handleChange}
                                    className="min-h-[140px] resize-none rounded-xl"
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="status">Statut</Label>
                                <Select
                                    value={updateStepInput.status} // Corrigé ici
                                    onValueChange={(value) =>
                                        setUpdateStepInput((prev) => ({ ...prev, status: value }))
                                    }
                                >
                                    <SelectTrigger id="status" className="rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="NOT_STARTED">Non commencé</SelectItem>
                                        <SelectItem value="IN_PROGRESS">En cours</SelectItem>
                                        <SelectItem value="PLANNED">Plannifié</SelectItem>
                                        <SelectItem value="TERMINED">Terminé</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </FieldGroup>

                        <DialogFooter className="mt-6">
                            <DialogClose asChild>
                                <Button type="button" className={buttonStyles.danger}>
                                    Annuler
                                </Button>
                            </DialogClose>

                            <Button type="submit" disabled={loading} className={buttonStyles.warning}>
                                {loading ? "Modification..." : "Enregistrer les modifications"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}