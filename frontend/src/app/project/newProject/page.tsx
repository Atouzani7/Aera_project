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


export default function CreateProject() {
    const { user, isLoading, isAuthenticated } = useCurrentUser()

    const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT)
    console.log("data in Crete project", data)

    return (
        <motion.div className="flex flex-col items-center mt-40 text-center w-full border-2">
            {/* <motion.div  > */}
            <motion.div className="w-full max-w-2xl px-4">
                <h2>Création d&apos;un nouveau projet</h2>
            </motion.div>
            {/* <motion.div> */}
            <motion.div className="w-full max-w-2xl px-4 space-y-6">
                {/* <Card className="w-full"> */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle><motion.h1>Information client</motion.h1></CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                    </CardHeader>
                    <CardContent>


                        <form className=" border-2">
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="form-name">Nom - Prenom du client</FieldLabel>
                                    <Input
                                        id="form-name"
                                        type="text"
                                        placeholder="Harry Potter"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="form-email">Email</FieldLabel>
                                    <Input id="form-email" type="email" placeholder="Harry@example.com" />
                                    <FieldDescription>
                                        Nous ne partagerons jamais votre email.
                                    </FieldDescription>
                                </Field>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
                                        <Input id="form-phone" type="tel" placeholder="06.01.02.03.04.05" />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="form-country">Country</FieldLabel>
                                        <Select defaultValue="us">
                                            <SelectTrigger id="form-country">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="us">France</SelectItem>
                                                <SelectItem value="uk">Autre</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>

                            </FieldGroup>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <p>Identification du client</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle><motion.h1>Information project</motion.h1></CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="form-name">Nom du project</FieldLabel>
                                <Input
                                    id="form-name"
                                    type="text"
                                    placeholder="Match de Football"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="form-email">Description du project</FieldLabel>
                                <Input id="form-description" type="text" placeholder="" />
                                <FieldDescription>
                                    {/* Nous ne partagerons jamais votre email. */}
                                </FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="form-tag">Tag</FieldLabel>
                                <Select defaultValue="Digital">
                                    <SelectTrigger id="form-tag">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="us">Creation</SelectItem>
                                        <SelectItem value="uk">Communication</SelectItem>
                                        <SelectItem value="ca">Business</SelectItem>
                                        <SelectItem value="ca">Evenementiel</SelectItem>
                                        <SelectItem value="ca">Organisation</SelectItem>
                                        <SelectItem value="ca">Accompagnement</SelectItem>
                                        <SelectItem value="ca">Autre</SelectItem>
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
                                    placeholder=""
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="form-Statut">Statut</FieldLabel>
                                <Select defaultValue="Digital">
                                    <SelectTrigger id="form-Statut">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="us">Planifié</SelectItem>
                                        <SelectItem value="uk">Terminé</SelectItem>
                                        <SelectItem value="ca">En progression</SelectItem>
                                        <SelectItem value="ca">An attente</SelectItem>
                                        <SelectItem value="ca">Annulé</SelectItem>
                                        <SelectItem value="ca">Archivé</SelectItem>
                                        <SelectItem value="ca">Approuvé</SelectItem>
                                        <SelectItem value="ca">Rejeté</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="form-step">Etape</FieldLabel>
                                <Input
                                    id="form-step"
                                    type="text"
                                    placeholder=""
                                    required
                                />
                                <div className="flex">

                                    <PlusCircleIcon />
                                    <p>Ajouter une etape</p>
                                    {/* Ajouter modal pour les étapes */}
                                </div>
                            </Field>
                        </FieldGroup>

                    </CardContent>
                    <CardFooter>
                        {/* <p>Card Footer</p> */}
                    </CardFooter>
                </Card>



            </motion.div>
            <Button className="m-4" onClick={() => createProject()}>Create Project</Button>
            <Field orientation="horizontal" className="justify-end mb-4 mr-6">
                <Button type="button" variant="destructive">
                    Cancel
                </Button>
                <Button type="submit">Enregistrer</Button>
            </Field>
        </motion.div>
    )
}