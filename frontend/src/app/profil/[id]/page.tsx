"use client";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { UserType } from "../../hook/context/authContext";
import { motion } from "framer-motion";
import { Calendar, Mail, Pencil, Phone, Shield, User } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MyProfil() {

    const { user, isLoading } = useCurrentUser()

    const userCo = useCurrentUser()
    console.log('🥳 Profile : user', userCo.user?.id)
    console.log('🥳 Profile : user', user)
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to access this page.</div>;
    }
    console.log("🥳 Profile : avatar", user?.profilePicture,);
    const card = {
        initial: { y: 0, scale: 1 },
        hover: {
            y: -4,
            scale: 1.01,
            transition: { type: "spring" as const, stiffness: 300, damping: 20 },
        },
    };


    return <motion.div className="flex flex-col items-center mt-40 text-center">


        <div className=" ">

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-10 "
            >
                <h1 className="text-2xl font-semibold tracking-wide">
                    Mon Profil
                </h1>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm"
                >
                    <Pencil className="w-4 h-4" />
                    Modifier
                </motion.button>
            </motion.div>

            {/* MAIN CARD */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl shadow-lg p-8"
            >

                {/* TOP PROFILE */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                    {/* AVATAR */}
                    <Avatar>
                        <AvatarImage src={user?.profilePicture || "https://images.pexels.com/photos/30414203/pexels-photo-30414203.jpeg"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>


                    {user?.profilePicture && (
                        <Image
                            src={user.profilePicture}
                            alt="hero"
                            fill
                            priority
                            className="absolute inset-0 object-cover opacity-40 z-0"
                        />
                    )}

                    {/* IDENTITY */}
                    <div className="text-center md:text-left space-y-1">
                        <h2 className="text-xl font-semibold">
                            {user?.firstname} {user?.lastname}
                        </h2>

                        <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center md:justify-start">
                            <Shield className="w-4 h-4" />
                            {user?.role}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            ID: {user?.id}
                        </p>
                    </div>
                </div>

                {/* GRID INFOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

                    {/* EMAIL */}
                    <motion.div variants={card} whileHover="hover" className="p-4 rounded-xl bg-white/50 border border-white/30">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                            <Mail className="w-4 h-4" /> Email
                        </div>
                        <p className="font-medium mt-1">{user?.email}</p>
                    </motion.div>

                    {/* PHONE */}
                    <motion.div variants={card} whileHover="hover" className="p-4 rounded-xl bg-white/50 border border-white/30">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                            <Phone className="w-4 h-4" /> Téléphone
                        </div>
                        <p className="font-medium mt-1">{user?.phoneNumber}</p>
                    </motion.div>

                    {/* FIRSTNAME */}
                    <motion.div variants={card} whileHover="hover" className="p-4 rounded-xl bg-white/50 border border-white/30">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                            <User className="w-4 h-4" /> Prénom
                        </div>
                        <p className="font-medium mt-1">{user?.firstname}</p>
                    </motion.div>

                    {/* LASTNAME */}
                    <motion.div variants={card} whileHover="hover" className="p-4 rounded-xl bg-white/50 border border-white/30">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                            <User className="w-4 h-4" /> Nom
                        </div>
                        <p className="font-medium mt-1">{user?.lastname}</p>
                    </motion.div>

                    {/* BIRTHDATE */}
                    <motion.div variants={card} whileHover="hover" className="p-4 rounded-xl bg-white/50 border border-white/30 md:col-span-2">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                            <Calendar className="w-4 h-4" /> Date de naissance
                        </div>
                        <p className="font-medium mt-1">
                            {user?.dateOfBirth
                                ? new Date(user.dateOfBirth).toLocaleDateString()
                                : "Non renseigné"}
                        </p>
                    </motion.div>

                </div>

                {/* FOOTER META */}
                <div className="mt-8 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
                    {/* <p>Créé le : {new Date(user?.createdAt).toLocaleDateString()}</p>
                    <p>Dernière mise à jour : {new Date(user?.updatedAt).toLocaleDateString()}</p> */}
                    <p>Dernière mise à jour : {user.email}</p>
                </div>

            </motion.div>
        </div>

    </motion.div>;
}