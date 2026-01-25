"use client"
import { useState } from "react"; // 1. Import de useState
import Image from "next/image";
import LogoutButton from "./Auth/LogoutButton";
import { useRouter } from "next/navigation";
import { AuthContext } from "../hook/context/authContext";
import { useContext } from "react";
import { LayoutDashboard, Menu, X } from "lucide-react"; // 2. Import des icônes pour le burger
import { LogIn } from 'lucide-react';
import { UserRoundPlus } from 'lucide-react';
import { User } from 'lucide-react';
import { Button } from "./ui/button";
import { useCurrentUser } from "@/lib/useCurrentUser";

export default function Header() {
    const router = useRouter();
    const { user, isLoading } = useContext(AuthContext);

    const userCo = useCurrentUser()
    console.log('🎨 Header : user', userCo.user?.id)


    const [isOpen, setIsOpen] = useState(false);

    const isAuthenticated = !!user;

    const pathnameWorkspace = `/workspace/${user?.workspace?.id}`;
    const pathnameMyAccount = `/profil/${userCo.user?.id}`;

    if (isLoading) {
        return (
            <header className="bg-white/10 backdrop-blur-xl w-full fixed top-0 left-0 z-50 border-b-2 px-4 py-4 border-border shadow h-[74px]">
                <div className="container mx-auto flex justify-between items-center opacity-50">
                    <Image src="/aera_project.png" alt="Logo" width={180} height={120} loading="eager" />
                    <div className="h-8 w-24 bg-muted animate-pulse rounded"></div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white/10 backdrop-blur-xl w-full fixed top-0 left-0 z-50 border-b-1 px-4 py-4">

            <div className="container mx-auto flex justify-between items-center">
                {/* Logo cliquable */}
                <Image
                    src="/aera_project.png"
                    alt="Aera Project logo"
                    width={180}
                    height={120}
                    priority
                    className="cursor-pointer"
                    loading="eager"
                    onClick={() => router.push("/")}
                />

                {/* --- BOUTON BURGER (Visible uniquement sur mobile) --- */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* --- MENU DE NAVIGATION --- */}
                <div className={`
                    ${isOpen ? "flex" : "hidden"} 
                    flex-col md:flex md:flex-row items-center gap-4
                    absolute md:static top-[74px] left-0 w-full md:w-auto
                    bg-white/80 backdrop-blur-sm md:bg-white/10 p-6 md:p-0
                    border-b md:border-none shadow-lg md:shadow-none
                    transition-all duration-300 ease-in-out z-40
                `}>

                    {isAuthenticated && (
                        <p className="text-sm font-medium text-muted-foreground md:mr-4">
                            Hello, <span className="text-foreground">{user.firstname || user.email}</span>
                        </p>
                    )}

                    {isAuthenticated ? (
                        <>
                            <Button
                                className="w-full md:w-auto"
                                onClick={() => { router.push(pathnameMyAccount); setIsOpen(false); }}
                            >
                                <User className="mr-2 h-4 w-4" />
                                Mon Profil
                            </Button>
                            <Button
                                className="bg-primary text-primary-foreground w-full md:w-auto"
                                // onClick={() => { router.push({ pathname: pathname }); setIsOpen(false); }}
                                onClick={() => { router.push(pathnameWorkspace); setIsOpen(false); }}
                            >
                                <LayoutDashboard />
                                Mon workspace
                            </Button>
                            <LogoutButton />
                        </>
                    ) : (
                        <>
                            <Button
                                className="w-full md:w-auto"
                                onClick={() => { router.push("/login"); setIsOpen(false); }}
                            >
                                <LogIn className="mr-2 h-4 w-4" />

                                Se connecter
                            </Button>
                            <Button
                                className="bg-primary text-primary-foreground w-full md:w-auto"
                                onClick={() => { router.push("/register"); setIsOpen(false); }}
                            >
                                <UserRoundPlus className="mr-2 h-4 w-4" />
                                Créer un compte
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}