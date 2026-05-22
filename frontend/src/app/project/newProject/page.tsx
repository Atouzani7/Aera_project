/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useContext, useState } from "react"
import { useMutation } from "@apollo/client/react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"

import { CREATE_PROJECT } from "@/graphQL/mutations/project.mutation"
import { AuthContext } from "../../hook/context/authContext"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { buttonStyles } from "@/src/components/ButtonStyle"
import { PlusCircle } from "lucide-react"

type FormData = {
    contact_name: string
    contact_lastname: string
    contact_phone: string
    contact_email: string
    address: string
    city: string
    country: string
    zipcode: string
    description: string
    project_name: string
    project_tag: string
    deadline: string
    status: string
}

export default function CreateProject() {
    const { user } = useContext(AuthContext)
    const router = useRouter()

    const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
        refetchQueries: ["FIND_WORKSPACE_BY_USERID"],
    })

    const [tab, setTab] = useState<"existing" | "new">("existing")

    const [formData, setFormData] = useState<FormData>({
        contact_name: "",
        contact_lastname: "",
        contact_phone: "",
        contact_email: "",
        address: "",
        city: "",
        country: "",
        zipcode: "",
        description: "",
        project_name: "",
        project_tag: "AUTRE",
        deadline: "",
        status: "NOT_STARTED",
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const input: any = {
            name: formData.project_name,
            description: formData.description,
            deadline: formData.deadline,
            status: formData.status,
        }

        // 👉 CLIENT EXISTANT
        if (tab === "existing") {
            input.contact_email = formData.contact_email
        }

        // 👉 NOUVEAU CLIENT
        if (tab === "new") {
            input.contact_name = formData.contact_name
            input.contact_lastname = formData.contact_lastname
            input.contact_email = formData.contact_email
            input.contact_phone = formData.contact_phone
            input.contact_address = formData.address
            input.contact_city = formData.city
            input.contact_postalCode = formData.zipcode
        }

        try {
            const { data } = await createProject({
                variables: {
                    createProjectInput: input,
                },
            })

            if (data) {
                router.push(`/workspace/${user?.workspace?.id}`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <motion.div
            className="flex justify-center mt-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">

                <h2 className="text-center text-2xl font-bold">
                    Créer un projet
                </h2>

                {/* TABS */}
                <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
                    <TabsList className="grid grid-cols-2 w-full">
                        <TabsTrigger value="existing">
                            Client existant
                        </TabsTrigger>
                        <TabsTrigger value="new">
                            Nouveau client
                        </TabsTrigger>
                    </TabsList>

                    {/* EXISTING */}
                    <TabsContent value="existing">
                        <Card>
                            <CardHeader>
                                <CardTitle>Email client</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    name="contact_email"
                                    value={formData.contact_email}
                                    onChange={handleChange}
                                    placeholder="Email du client"
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* NEW CLIENT */}
                    <TabsContent value="new">
                        <Card>
                            <CardHeader>
                                <CardTitle>Nouveau client</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <Input name="contact_name" value={formData.contact_name} onChange={handleChange} placeholder="Prénom" />
                                <Input name="contact_lastname" value={formData.contact_lastname} onChange={handleChange} placeholder="Nom" />
                                <Input name="contact_email" value={formData.contact_email} onChange={handleChange} placeholder="Email" />
                                <Input name="contact_phone" value={formData.contact_phone} onChange={handleChange} placeholder="Téléphone" />

                                <Input name="address" value={formData.address} onChange={handleChange} placeholder="Adresse" />
                                <Input name="city" value={formData.city} onChange={handleChange} placeholder="Ville" />
                                <Input name="zipcode" value={formData.zipcode} onChange={handleChange} placeholder="Code postal" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* PROJECT */}
                <Card>
                    <CardHeader>
                        <CardTitle>Projet</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <Input
                            name="project_name"
                            value={formData.project_name}
                            onChange={handleChange}
                            placeholder="Nom du projet"
                        />

                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />

                        <Input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                        />

                        <Select
                            value={formData.status}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    status: value,
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NOT_STARTED">Non commencé</SelectItem>
                                <SelectItem value="PLANNED">Planifié</SelectItem>
                                <SelectItem value="IN_PROGRESS">En cours</SelectItem>
                                <SelectItem value="TERMINED">Terminé</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {/* ERROR */}
                {error && (
                    <p className="text-red-500 text-sm">
                        {error.message}
                    </p>
                )}

                {/* ACTIONS */}
                <div className="flex justify-end gap-4">
                    <Button type="button" className={buttonStyles.danger}>
                        Annuler
                    </Button>

                    <Button type="submit" disabled={loading}
                        className="
            bg-gradient-to-r from-cyan-500/40 to-violet-500/40
            text-white
            hover:brightness-110
            transition duration-300 ease-in-out">
                        <PlusCircle className="mr-2" />    {loading ? "Création..." : "Créer projet"}
                    </Button>
                </div>
            </form>
        </motion.div >
    )
}