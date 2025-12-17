// "use client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// // import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// export default function ProfilPage() {
//     const [isEditPictureModalOpen, setIsEditPictureModalOpen] = useState(false);
//     // const form = useForm()



//     const form = useForm({
//         defaultValues: {
//             username: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//             profilePicture: "",
//             phoneNumber: "",
//             dateOfBirth: "",


//         },
//     })

//     function onSubmit(values: { username: string }) {
//         console.log(values)
//     }
//     return (
//         <motion.div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
//             <main>
//                 {/* <div>
//                     <h1 className="text-3xl font-semibold underline">Profil Page</h1>
//                 </div> */}

//                 <div className="profile_infos flex flex-col items-center gap-8 py-10  w-1/2 min-w-[285px] max-w-[425px]">
//                     <div className="profile_picture flex flex-col justify-center items-center">
//                         {/* <Avatar
//                             alt="profile picture"
//                             sx={{ width: 100, height: 100 }}
//                             src={profilePicture ?? undefined}
//                         /> */}
//                     </div>
//                     <motion.div className="edit_picture_cursor relative">
//                         <Avatar>
//                             <AvatarImage src='https://www.santelog.com/sites/santelog.com/www.santelog.com/files/styles/large/public/images/accroche/adobestock_276208008_lama.jpeg?itok=d2steNiv'
//                                 alt="profile picture" />
//                             <AvatarFallback>CN</AvatarFallback>
//                         </Avatar>
//                         <button
//                             className="text-detail-pink hover:text-detail-pink-hover transition"
//                             onClick={() => setIsEditPictureModalOpen(true)}
//                         >
//                             Modifier la photo de profil
//                         </button>

//                     </motion.div>
//                     <div className="body-profile w-full flex flex-col justify-center items-center gap-6">
//                         <h3 className="mb-3">Informations générales</h3>
//                         <div className="flex w-full gap-2 border-b border-dark40 pb-4">
//                             <p className="text-dark60">Prénom : </p>
//                             <p>Harry</p>
//                         </div>
//                         <div className="flex w-full gap-2 border-b border-dark40 pb-4">
//                             <p className="text-dark60">Nom : </p>
//                             <p>Potter</p>
//                         </div>
//                         <div className="flex w-full gap-2 border-b border-dark40 pb-4">
//                             <p className="text-dark60">Email : </p>
//                             <p>email</p>
//                             <div>
//                                 <p className="text-dark60">Notification </p>
//                                 <p>Etre notifier par email</p>
//                                 <input type="radio" />
//                             </div>
//                         </div>
//                         <div className="flex w-full gap-2 border-b border-dark40 pb-4">
//                             <p className="text-dark60">Date naissance : </p>
//                             <p>{'1996-07-08' ?? "non renseigné"}</p>
//                         </div>
//                         <div className="flex w-full gap-2 border-b border-dark40 pb-4">
//                             <p className="text-dark60">Numéro de téléphone : </p>
//                             <p>06 00 00 00 00</p>
//                         </div>
//                         <div className="flex w-full gap-2 border-b border-dark40 pb-4">
//                             <p className="text-dark60">Lien pro / reseaux sociaux : </p>
//                             {/* <p>link</p> */}
//                             <a href="google.fr">link</a>
//                         </div>
//                         <div>
//                             <button
//                                 // className="bg-detail-pink text-black px-4 py-2 rounded hover:bg-detail-pink-hover transition">
//                                 className="text-detail-pink hover:text-detail-pink-hover transition"
//                                 onClick={() => setIsEditPictureModalOpen(true)}>
//                                 Editer le profil
//                             </button>
//                         </div>
//                     </div>
//                     {isEditPictureModalOpen && (
//                         <div className="modal fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
//                             <div className="modal-content bg-white p-6 rounded shadow-lg">
//                                 <h2 className="text-xl mb-4">Modifier la photo de profil</h2>
//                                 {/* Contenu du modal pour modifier le profil */}




//                                 <div className="body-profile w-full flex flex-col justify-center items-center gap-6">

//                                     {/* <Form {...form}>
//                                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                                             <FormField
//                                                 control={form.control}
//                                                 name="username"
//                                                 render={({ field }) => (
//                                                     <FormItem>
//                                                         <FormLabel>Username</FormLabel>
//                                                         <FormControl>
//                                                             <Input placeholder="shadcn" {...field} />
//                                                         </FormControl>
//                                                         <FormDescription>
//                                                             This is your public display name.
//                                                         </FormDescription>
//                                                         <FormMessage />
//                                                     </FormItem>
//                                                 )}
//                                             />

//                                             <Button type="submit">Save</Button>
//                                         </form>
//                                     </Form> */}






//                                     <h3 className="mb-3">Informations générales</h3>
//                                     <div className="flex w-full gap-2 border-b border-dark40 pb-4">
//                                         <p className="text-dark60">Prénom : </p>
//                                         <p>Harry</p>
//                                     </div>
//                                     <div className="flex w-full gap-2 border-b border-dark40 pb-4">
//                                         <p className="text-dark60">Nom : </p>
//                                         <p>Potter</p>
//                                     </div>
//                                     <div className="flex w-full gap-2 border-b border-dark40 pb-4">
//                                         <p className="text-dark60">Email : </p>
//                                         <p>email</p>
//                                         <div>
//                                             <p className="text-dark60">Notification </p>
//                                             <p>Etre notifier par email</p>
//                                             <input type="radio" />
//                                         </div>
//                                     </div>
//                                     <div className="flex w-full gap-2 border-b border-dark40 pb-4">
//                                         <p className="text-dark60">Date naissance : </p>
//                                         <p>{'1996-07-08' ?? "non renseigné"}</p>
//                                     </div>
//                                     <div className="flex w-full gap-2 border-b border-dark40 pb-4">
//                                         <p className="text-dark60">Numéro de téléphone : </p>
//                                         <p>06 00 00 00 00</p>
//                                     </div>
//                                     <div className="flex w-full gap-2 border-b border-dark40 pb-4">
//                                         <p className="text-dark60">Lien pro / reseaux sociaux : </p>
//                                         {/* <p>link</p> */}
//                                         <a href="google.fr">link</a>
//                                     </div>
//                                     <div>
//                                         <button
//                                             // className="bg-detail-pink text-black px-4 py-2 rounded hover:bg-detail-pink-hover transition">
//                                             className="text-detail-pink hover:text-detail-pink-hover transition"
//                                             onClick={() => setIsEditPictureModalOpen(true)}>
//                                             Editer le profil
//                                         </button>
//                                     </div>
//                                 </div>




//                                 <button
//                                     className="mt-4 bg-detail-pink text-black px-4 py-2 rounded hover:bg-detail-pink-hover transition"
//                                     onClick={() => setIsEditPictureModalOpen(false)}
//                                 >
//                                     Fermer
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </motion.div>
//     );
// }
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Définition du schéma de validation pour le formulaire texte
const profileSchema = z.object({
    firstName: z.string().min(2, "Le prénom est trop court"),
    lastName: z.string().min(2, "Le nom est trop court"),
    email: z.string().email("Email invalide"),
    phoneNumber: z.string().min(10, "Numéro invalide"),
    dateOfBirth: z.string(),
    bioLink: z.string().url("Lien invalide").or(z.literal("")),
});

// Type pour les données du formulaire texte
type ProfileFormValues = z.infer<typeof profileSchema>;

// Type étendu pour inclure l'URL de l'image dans l'état global du composant
type UserDataState = ProfileFormValues & { profilePictureUrl: string };


export default function ProfilPage() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // Référence pour l'input file caché
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Données initiales complètes
    const [userData, setUserData] = useState<UserDataState>({
        firstName: "Harry",
        lastName: "Potter",
        email: "harry.potter@hogwarts.com",
        phoneNumber: "06 00 00 00 00",
        dateOfBirth: "1996-07-31",
        bioLink: "https://google.fr",
        // URL initiale de l'image
        profilePictureUrl: "https://www.santelog.com/sites/santelog.com/www.santelog.com/files/styles/large/public/images/accroche/adobestock_276208008_lama.jpeg?itok=d2steNiv"
    });

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        // On passe seulement les champs texte au formulaire
        defaultValues: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            dateOfBirth: userData.dateOfBirth,
            bioLink: userData.bioLink,
        },
    });

    // Fonction de soumission du formulaire TEXTE
    function onSubmitForm(values: ProfileFormValues) {
        // Mise à jour de l'état global avec les nouvelles valeurs texte
        setUserData(prev => ({ ...prev, ...values }));
        setIsEditModalOpen(false);
        console.log("Données texte mises à jour :", values);
        // Note: C'est ici qu'on enverrait les données texte au backend
    }

    // Nouvelle fonction pour gérer le changement d'image
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validation basique du type (optionnel)
            if (!file.type.startsWith("image/")) {
                alert("Veuillez sélectionner un fichier image valide.");
                return;
            }

            // Création d'une URL locale pour prévisualiser l'image immédiatement
            const imageUrl = URL.createObjectURL(file);

            // Mise à jour de l'état pour afficher la nouvelle image
            setUserData(prev => ({ ...prev, profilePictureUrl: imageUrl }));

            // IMPORTANT POUR LE BACKEND :
            // C'est à cet endroit qu'il faudrait créer un FormData et envoyer le fichier au serveur.
            // Exemple:
            // const formData = new FormData(); formData.append('avatar', file);
            // fetch('/api/upload-avatar', { method: 'POST', body: formData });
            console.log("Fichier image sélectionné pour upload :", file.name);
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-screen mt-12 items-center justify-center bg-zinc-50 font-sans p-4"
        >
            <main className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 w-full max-w-[425px]">
                <div className="flex flex-col items-center gap-8">

                    {/* --- Section Photo de Profil Modifiée --- */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group">
                            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                                {/* Utilisation de l'URL dynamique du state */}
                                <AvatarImage src={userData.profilePictureUrl} className="object-cover" />
                                <AvatarFallback className="text-2xl">{userData.firstName[0]}{userData.lastName[0]}</AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Bouton qui déclenche le clic sur l'input caché */}
                        <button
                            className="text-sm text-pink hover:text-pink-hover font-medium transition bg-pink-50 px-3 py-1 rounded-full hover:bg-pink-100"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Modifier la photo
                        </button>

                        {/* Input file caché qui gère l'ouverture de l'explorateur */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/png, image/jpeg, image/jpg, image/gif"
                            className="hidden"
                        />
                    </div>
                    {/* --------------------------------------- */}

                    {/* Affichage des Infos Textuelles */}
                    <div className="w-full flex flex-col gap-5">
                        <h3 className="font-semibold text-zinc-900 border-b pb-2">Informations générales</h3>

                        <InfoRow label="Prénom" value={userData.firstName} />
                        <InfoRow label="Nom" value={userData.lastName} />
                        <InfoRow label="Email" value={userData.email} />
                        <InfoRow label="Date de naissance" value={userData.dateOfBirth} />
                        <InfoRow label="Téléphone" value={userData.phoneNumber} />

                        <div className="flex justify-between items-center py-2 border-b border-zinc-100">
                            <p className="text-zinc-500 text-sm">Lien pro</p>
                            <a href={userData.bioLink} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline text-sm truncate max-w-[150px]">
                                {userData.bioLink || "Non renseigné"}
                            </a>
                        </div>

                        <Button
                            variant="outline"
                            className="mt-4 border-pink-200 text-pink-600 hover:bg-pink-50"
                            onClick={() => {
                                // On réinitialise le formulaire avec les données actuelles avant d'ouvrir
                                form.reset({
                                    firstName: userData.firstName,
                                    lastName: userData.lastName,
                                    email: userData.email,
                                    phoneNumber: userData.phoneNumber,
                                    dateOfBirth: userData.dateOfBirth,
                                    bioLink: userData.bioLink,
                                });
                                setIsEditModalOpen(true);
                            }}
                        >
                            Éditer les informations
                        </Button>
                    </div>
                </div>
            </main>

            {/* Modal d'édition (Uniquement pour le texte maintenant) */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-md overflow-y-auto max-h-[90vh]"
                        >
                            <h2 className="text-xl font-bold mb-6">Modifier les informations</h2>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Prénom</FormLabel>
                                                    <FormControl><Input {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nom</FormLabel>
                                                    <FormControl><Input {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Téléphone</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* J'ai simplifié la date pour l'exemple, idéalement utiliser un DatePicker shadcn */}
                                    <FormField
                                        control={form.control}
                                        name="dateOfBirth"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date de naissance (AAAA-MM-JJ)</FormLabel>
                                                <FormControl><Input placeholder="1990-01-01" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="bioLink"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Lien portfolio / Réseaux</FormLabel>
                                                <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex gap-3 pt-4">
                                        <Button type="submit" className="flex-1 bg-pink-600 hover:bg-pink-700">
                                            Enregistrer
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setIsEditModalOpen(false)}
                                        >
                                            Annuler
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Petit composant utilitaire pour les lignes d'info
function InfoRow({ label, value }: { label: string; value: string | null }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-zinc-100">
            <p className="text-zinc-500 text-sm">{label}</p>
            <p className="text-zinc-900 text-sm font-medium">{value || "Non renseigné"}</p>
        </div>
    );
}