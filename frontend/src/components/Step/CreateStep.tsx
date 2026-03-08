// // import { Button } from "@/components/ui/button";

// // export default function CreateStep() {
// //     return (
// //         <div>
// //             <Button className="mt-6" >
// //                 Créer une étape
// //             </Button>
// //         </div>
// //     );
// // }

// import { Button } from "@/components/ui/button"
// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { Field, FieldGroup } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { CREATE_STEP } from "@/graphQL/mutations/steps.mutation"
// import { useMutation, useQuery } from "@apollo/client/react"
// import { PlusCircleIcon } from "lucide-react"

// export function CreateStep() {


//     const formData = {
//         title: "Phase de travail",
//         description: "Ajoutez des détails pour clarifier le travail à réaliser.",
//         status: "",
//         projectId: ""
//     }


//     const [createStep, { data, loading, error }] = useMutation(CREATE_STEP, {
//         onError: (error) => {
//             console.error("Erreur lors de la création de l'étape :", error);
//         },
//     })

//     console.log("data in CreateStep", data)

//     // const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
//     //     e.preventDefault();

//     //     try {
//     //         const { data } = await createStep({
//     //             variables: {
//     //                 title: formData.title,
//     //                 description: formData.description,
//     //                 status: formData.status,
//     //                 projectId: formData.projectId
//     //             }
//     //         })
//     //         console.log("Étape créée avec succès :", data);
//     //     } catch (error) {
//     //         console.error("Erreur lors de la création de l'étape :", error);
//     //     }


//     return (
//         <Dialog>
//             {/* <form onSubmit={handleFormSubmit}> */}
//             <form >
//                 <DialogTrigger asChild>
//                     <Button variant="secondary"><PlusCircleIcon className="mr-2 h-4 w-4" /> Ajouter une nouvelle étape</Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-sm">
//                     <DialogHeader>
//                         <DialogTitle>Nouvelle étape</DialogTitle>
//                         <DialogDescription>
//                             Créez une étape visible par le client pour suivre l’évolution du projet.
//                         </DialogDescription>
//                     </DialogHeader>
//                     <FieldGroup>
//                         <Field>
//                             <Label htmlFor="Title">Titre de l'étape</Label>
//                             <Input id="Title" name="Title" defaultValue="Phase de travail" />
//                         </Field>
//                         <Field>
//                             <Label htmlFor="Description">Description</Label>
//                             <Textarea id="Description" className="h-50" name="Description" defaultValue="Ajoutez des détails pour clarifier le travail à réaliser." />
//                         </Field>
//                         <Field>
//                             <Label htmlFor="Status">Statut</Label>
//                             <Select defaultValue="En cours">
//                                 <SelectTrigger id="Status">
//                                     <SelectValue />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="En cours">En cours</SelectItem>
//                                     <SelectItem value="Terminé">Terminé</SelectItem>
//                                     <SelectItem value="En attente">En attente</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </Field>
//                     </FieldGroup>
//                     <DialogFooter>
//                         <DialogClose asChild>
//                             <Button variant="destructive">Cancel</Button>
//                         </DialogClose>
//                         <Button type="submit" variant="validation">Save changes</Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </form>
//         </Dialog>
//     )
// }


"use client"

import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { PlusCircleIcon } from "lucide-react"

import { CREATE_STEP } from "@/graphQL/mutations/steps.mutation"

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

interface CreateStepProps {
    projectId: string
}

export function CreateStep({ projectId }: CreateStepProps) {
    const [open, setOpen] = useState(false)

    const [formData, setFormData] = useState({
        name: "Phase de travail",
        description: "",
        status: "En cours",
    })

    const [createStep, { loading }] = useMutation(CREATE_STEP, {
        onCompleted: () => {
            setFormData({
                name: "Phase de travail",
                description: "",
                status: "En cours",
            })
            setOpen(false)
        },
        onError: (error) => {
            console.error("Erreur lors de la création de l'étape :", error)
        },
    })
    console.log("projectId envoyé :", projectId)
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await createStep({
            variables: {
                createStepInput: {
                    name: formData.name,
                    description: formData.description,
                    status: formData.status,
                },
                projectId: projectId,
            },
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="create">
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    Ajouter une nouvelle étape
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Nouvelle étape</DialogTitle>
                        <DialogDescription>
                            Créez une étape visible par le client pour suivre l’évolution du projet.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup className="mt-4 space-y-4">
                        <Field>
                            <Label htmlFor="title">Titre de l&lsquo;étape</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
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
                                value={formData.description}
                                onChange={handleChange}
                                className="min-h-[140px] resize-none rounded-xl"
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="status">Statut</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({ ...prev, status: value }))
                                }
                            >
                                <SelectTrigger id="status" className="rounded-xl">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="En cours">En cours</SelectItem>
                                    <SelectItem value="Terminé">Terminé</SelectItem>
                                    <SelectItem value="En attente">En attente</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Annuler
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={loading}>
                            {loading ? "Création..." : "Créer l’étape"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}