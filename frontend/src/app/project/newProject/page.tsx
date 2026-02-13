"use client"
import { CREATE_PROJECT } from "@/graphQL/mutations/project.mutation"
import { useCurrentUser } from "@/lib/useCurrentUser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation } from "@apollo/client/react"
import { motion } from "motion/react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircleIcon } from "lucide-react"
import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "../../hook/context/authContext"


export default function CreateProject() {
    // const { user, isLoading, isAuthenticated } = useCurrentUser()
    const { user, isLoading } = useContext(AuthContext);
    const pathnameWorkspace = `/workspace/${user?.workspace?.id}`;

    const [formData, setFormData] = useState({
        contact_name: "",
        contact_number: "",
        contact_email: "",
        description: "",
        project_name: "",
        project_tag: "AUTRE",
        deadline: "",
        status: "NOT_STARTED",
        step: "Découverte projet"
    })




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT, {
        onError: (error) => {
            console.error("Erreur lors de l'inscription :", error);
        },
    })
    console.log("data in Crete project", data)


    const router = useRouter();
    const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
        // Empêche l'URL de se remplir avec ?firstname=...
        e.preventDefault();

        try {
            // ICI QUE LA MUTATION EST DÉCLENCHÉE
            const { data } = await createProject({
                variables: {
                    createProjectInput: {
                        contact_name: formData.contact_name,
                        contact_phone: formData.contact_number,
                        contact_email: formData.contact_email,
                        description: formData.description,
                        name: formData.project_name,
                        tag: formData.project_tag,
                        deadline: formData.deadline,
                        status: formData.status,
                        // step: formData.step,
                    },
                },
            });

            if (data) {
                console.log("Nouveau projet créé !", data);
                router.push(pathnameWorkspace);
            }
        } catch (err) {
            console.error("Erreur GraphQL :", err);
        }
    };

    return (

        <motion.div className="flex flex-col items-center mt-40 w-full">

            <motion.div className="w-full max-w-2xl px-4 mb-6">
                <h2 className="text-center">Création d&apos;un nouveau projet</h2>
            </motion.div>

            <form
                onSubmit={handleFormSubmit}
                className="w-full max-w-2xl px-4 space-y-6"
            >

                {/* -------- CARD CLIENT -------- */}
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="form-name">Nom - Prenom du client</FieldLabel>
                        <Input
                            id="form-name"
                            name="contact_name"
                            placeholder="Harry Potter"
                            required
                            value={formData.contact_name}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="form-email">Email</FieldLabel>
                        <Input id="form-email" name="contact_email" type="email" placeholder="Harry@example.com" value={formData.contact_email} onChange={handleChange} />
                        <FieldDescription>
                            Nous ne partagerons jamais votre email.
                        </FieldDescription>
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
                            <Input id="form-phone" type="tel" name="contact_number" placeholder="06.01.02.03.04.05" value={formData.contact_number} onChange={handleChange} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="form-country">Country</FieldLabel>
                            <Select defaultValue="fr">
                                <SelectTrigger id="form-country">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fr">France</SelectItem>
                                    <SelectItem value="uk">Autre</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                </FieldGroup>

                {/* -------- CARD PROJECT -------- */}
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="form-name">Nom du project</FieldLabel>
                        <Input
                            id="form-name"
                            name="project_name"
                            type="text"
                            placeholder="Match de Football"
                            required
                            value={formData.project_name}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="form-email">Description du project</FieldLabel>
                        <Input id="form-description" type="text" name="description" placeholder="" value={formData.description} onChange={handleChange} />
                        <FieldDescription>
                            {/* Nous ne partagerons jamais votre email. */}
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="form-tag">Tag</FieldLabel>

                        <Select
                            value={formData.project_tag}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    project_tag: value,
                                }))
                            }
                        >


                            <SelectTrigger id="form-tag">
                                <SelectValue placeholder="Choisir un tag" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="CREATION">Création</SelectItem>
                                <SelectItem value="COMMUNICATION">Communication</SelectItem>
                                <SelectItem value="DIGITAL">Digital</SelectItem>
                                <SelectItem value="BUSINESS">Business</SelectItem>
                                <SelectItem value="EVENEMENTIEL">Événementiel</SelectItem>
                                <SelectItem value="ORGANISATION">Organisation</SelectItem>
                                <SelectItem value="ACCOMPAGNEMENT">Accompagnement</SelectItem>
                                <SelectItem value="AUTRE">Autre</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                </FieldGroup>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="form-Deadline">Deadline estimé</FieldLabel>
                        <Input
                            id="form-Deadline"
                            type="date"
                            name="deadline"
                            placeholder=""
                            required
                            value={formData.deadline}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="form-Statut">Statut</FieldLabel>
                        <Select
                            value={formData.status}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    status: value,
                                }))
                            }
                        >

                            <SelectTrigger id="form-Statut">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PLANNED">Planifié</SelectItem>
                                <SelectItem value="TERMINED">Terminé</SelectItem>
                                <SelectItem value="NOT_STARTED">Non commencé</SelectItem>
                                <SelectItem value="IN_PROGRESS">En progression</SelectItem>
                                <SelectItem value="PENDING">En attente</SelectItem>
                                <SelectItem value="CANCELLED">Annulé</SelectItem>
                                <SelectItem value="ARCHIVED">Archivé</SelectItem>
                                <SelectItem value="APPROVED">Approuvé</SelectItem>
                                <SelectItem value="REJECTED">Rejeté</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="form-step">Etape</FieldLabel>
                        <Input
                            id="form-step"
                            type="text"
                            name="step"
                            placeholder=""
                            required
                            value={formData.step}
                            onChange={handleChange}
                        />
                        <div className="flex">

                            <PlusCircleIcon />
                            <p>Ajouter une etape</p>
                            {/* Ajouter modal pour les étapes */}
                        </div>
                    </Field>
                </FieldGroup>

                {/* -------- ACTIONS -------- */}
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="destructive">
                        Cancel
                    </Button>
                    <Button type="submit">
                        Enregistrer
                    </Button>
                </div>

            </form>
        </motion.div >


    )
}