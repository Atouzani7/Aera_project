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
import { buttonStyles } from "../ButtonStyle";


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


    // const [register, { loading, error }] = useMutation(REGISTER, {
    //     onCompleted: (data) => {
    //         console.log("Utilisateur créé avec succès :", data);
    //     },
    //     onError: (error) => {
    //         console.error("Erreur Apollo :", error);
    //     },
    // });

    // 2. Fonction pour mettre à jour l'état dynamiquement
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const btnStyle = `
h-10 px-4 rounded-xl
bg-gradient-to-r from-cyan-500/10 to-violet-500/10
border border-white/10
text-black/85
hover:bg-white/15
hover:text-white
transition-all duration-200
flex items-center gap-2
focus-visible:ring-2 focus-visible:ring-white
focus-visible:ring-offset-2 focus-visible:ring-black
`

    const [registerMutation, { loading, error }] = useMutation(REGISTER, {
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="rounded-3xl border border-white/50 bg-white/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-10">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                        Créer un compte
                    </h1>

                    <p className="mt-3 text-sm md:text-base text-gray-500">
                        Lancez votre espace de travail et commencez à collaborer efficacement.
                    </p>

                    <div className="mt-5 h-[2px] w-28 rounded-full bg-gradient-to-r from-teal-400 via-gray-300 to-violet-400" />
                </div>

                <Form {...{ form }}>
                    <form onSubmit={handleFormSubmit} className="space-y-8">

                        {/* PROFILE SECTION */}
                        <div className="space-y-5">

                            <div className="flex items-center gap-2 text-lg font-medium text-gray-800">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 border border-teal-100">
                                    <User className="h-4 w-4 text-teal-600" />
                                </div>

                                <span>Profil</span>
                            </div>

                            {/* Firstname */}
                            <motion.div className="space-y-2">
                                <Label htmlFor="firstname" className="text-gray-700">
                                    Prénom *
                                </Label>

                                <Input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    required
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className="h-11 rounded-xl border-gray-200 bg-white/60 backdrop-blur focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                                />

                                {form.formState.errors.firstname && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.firstname.message}
                                    </p>
                                )}
                            </motion.div>

                            {/* Lastname */}
                            <motion.div className="space-y-2">
                                <Label htmlFor="lastname" className="text-gray-700">
                                    Nom *
                                </Label>

                                <Input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    required
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    className="h-11 rounded-xl border-gray-200 bg-white/60 backdrop-blur focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                                />
                            </motion.div>

                            {/* Email */}
                            <motion.div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700">
                                    Email *
                                </Label>

                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="h-11 rounded-xl border-gray-200 bg-white/60 backdrop-blur focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
                                />
                            </motion.div>

                            {/* Password */}
                            <motion.div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700">
                                    Mot de passe *
                                </Label>

                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="h-11 rounded-xl border-gray-200 bg-white/60 backdrop-blur focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
                                />
                            </motion.div>
                        </div>

                        {/* separator */}
                        <div className="relative">
                            <Separator className="bg-gray-200" />
                        </div>

                        {/* WORKSPACE SECTION */}
                        <div className="space-y-5">

                            <div className="flex items-center gap-2 text-lg font-medium text-gray-800">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 border border-violet-100">
                                    <MonitorCloud className="h-4 w-4 text-violet-600" />
                                </div>

                                <span>Workspace</span>
                            </div>

                            {/* Workspace Name */}
                            <motion.div className="space-y-2">
                                <Label htmlFor="workspaceName" className="text-gray-700">
                                    Nom de l’espace de travail
                                </Label>

                                <Input
                                    id="workspaceName"
                                    name="workspaceName"
                                    type="text"
                                    value={formData.workspaceName}
                                    onChange={handleChange}
                                    className="h-11 rounded-xl border-gray-200 bg-white/60 backdrop-blur focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                                />
                            </motion.div>

                            {/* Workspace Description */}
                            <motion.div className="space-y-2">
                                <Label htmlFor="workspaceDescription" className="text-gray-700">
                                    Description
                                </Label>

                                <Input
                                    id="workspaceDescription"
                                    name="workspaceDescription"
                                    type="text"
                                    value={formData.workspaceDescription}
                                    onChange={handleChange}
                                    className="h-11 rounded-xl border-gray-200 bg-white/60 backdrop-blur focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
                                />
                            </motion.div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-xl border border-red-100 bg-red-50 p-3">
                                <p className="text-sm text-red-500">
                                    {error.message}
                                </p>
                            </div>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={loading}
                            // className="w-full h-11 rounded-xl bg-gradient-to-r from-teal-500 via-gray-400 to-violet-400 text-white font-medium shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                            className={btnStyle}
                        >
                            <UserRoundPlus className="mr-2 h-4 w-4" />

                            {loading
                                ? "Inscription en cours..."
                                : "Créer mon compte"}
                        </Button>
                    </form>
                </Form>
            </div>
        </motion.div>


    );
}
