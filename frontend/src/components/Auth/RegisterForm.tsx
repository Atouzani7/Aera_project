"use client";
import { useState } from "react";
import { REGISTER } from "@/graphQL/mutations/user.mutation";
import { useMutation } from "@apollo/client/react";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { User, MonitorCloud, UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form"
import { zodResolver as hookFormZodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Form } from "../../../components/ui/form";


export default function RegisterForm() {
    // 1. Un seul état pour tout le formulaire
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        workspaceName: "",
        workspaceDescription: "",
    });



    const schema = z.object({
        lastname: z.string().min(1, "Le nom est obligatoire"),
        firstname: z.string().min(1, "Le prénom est obligatoire"),
        email: z.string().email("Email invalide"),
        password: z.string().min(4, "Le mot de passe doit contenir au moins 6 caractères"),
        // workspaceName: z.string().optional(),
        // workspaceDescription: z.string().optional(),
    })

    const form = useForm({
        resolver: hookFormZodResolver(schema),
        defaultValues: {
            lastname: "",
            firstname: "",
            email: "",
            password: "",
            // workspaceName: "",
            // workspaceDescription: "",
        },
    })


    const [register, { loading, error }] = useMutation(REGISTER, {
        onCompleted: (data) => {
            console.log("Utilisateur créé avec succès :", data);
        },
        onError: (error) => {
            console.error("Erreur Apollo :", error);
        },
    });

    // 2. Fonction pour mettre à jour l'état dynamiquement
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const [registerMutation] = useMutation(REGISTER, {
        onError: (error) => {
            console.error("Erreur lors de l'inscription :", error);
        },
    });
    const router = useRouter();
    const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
        // Empêche l'URL de se remplir avec ?firstname=...
        e.preventDefault();

        try {
            // ICI QUE LA MUTATION EST DÉCLENCHÉE
            const { data } = await registerMutation({
                variables: {
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email,
                    password: formData.password,
                    workspaceName: formData.workspaceName
                }
            });

            if (data) {
                console.log("Utilisateur créé !", data);
                router.push("/login"); // Redirection
            }
        } catch (err) {
            console.error("Erreur GraphQL :", err);
        }
    };



    return (
        <motion.div className="p-2 m-4 w-lg mx-auto mt-10 md:mt-20 md:w-1/2 flex flex-col justify-center">
            <motion.div>
            </motion.div>
            <h1 className="text-3xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-gray-400 to-violet-400 tracking-tighter md:text-4xl">
                Créer un compte
            </h1>
            <Form {...{ form }}>


                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">

                    <div className="flex items-center gap-2 mt-4 mb-2 text-lg font-medium">

                        <User className="mr-2 h-4 w-4" />
                        Profil
                    </div>

                    <motion.div className="flex flex-col gap-1 ">
                        <Label htmlFor="firstname">Prénom *</Label>
                        <Input
                            id="firstname"
                            name="firstname"
                            type="text"
                            required
                            className="border p-2 rounded"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                        {form.formState.errors.firstname && <p className="text-red-500">{form.formState.errors.firstname.message}</p>}
                    </motion.div>
                    <motion.div className="flex flex-col gap-1">
                        <Label htmlFor="lastname">Nom *</Label>
                        <Input
                            id="lastname"
                            name="lastname"
                            type="text"
                            required
                            className="border p-2 rounded"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </motion.div>

                    <motion.div className="flex flex-col gap-1">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="border p-2 rounded"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </motion.div>

                    <motion.div className="flex flex-col gap-1">
                        <Label htmlFor="password">Mot de passe *</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="border p-2 rounded"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <Separator />
                    </motion.div>

                    <div className="flex items-center gap-2 mt-4 mb-2 text-lg font-medium">
                        <MonitorCloud className="mr-2 h-4 w-4" />
                        Worskspace
                    </div>
                    <motion.div className="flex flex-col gap-1">
                        <Label htmlFor="workspaceName">Nom de l&apos;espace de travail</Label>
                        <Input
                            id="workspaceName"
                            name="workspaceName"
                            type="text"
                            className="border p-2 rounded"
                            value={formData.workspaceName}
                            onChange={handleChange}
                        />
                    </motion.div>

                    <motion.div className="flex flex-col gap-1">
                        <Label htmlFor="workspaceDescription">Description</Label>
                        <Input
                            id="workspaceDescription"
                            name="workspaceDescription"
                            type="text"
                            className="border p-2 rounded"
                            value={formData.workspaceDescription}
                            onChange={handleChange}
                        />
                    </motion.div>
                    <div className="flex justify-between items-center mt-4">


                        <Button
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full flex items-center gap-2"
                        >
                            <UserRoundPlus className="mr-2 h-4 w-4" />
                            {loading ? "Inscription en cours..." : "S'inscrire"}
                        </Button>

                        {error && (
                            <p className="text-red-500 text-sm mt-2">
                                Erreur : {error.message}
                            </p>

                        )}


                    </div>



                </form>
            </Form>
        </motion.div >


    );
}
