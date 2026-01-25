"use client";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { UserType } from "../../hook/context/authContext";

export default function MyProfil() {

    const { user, isLoading, error } = useCurrentUser()

    const userCo = useCurrentUser()
    console.log('🥳 Profile : user', userCo.user?.id)
    console.log('🥳 Profile : user', user)
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to access this page.</div>;
    }

    if (error) {
        return console.error('Erreur Profile page', error);
    }


    return <div className="flex flex-col items-center mt-40 text-center">
        <h1>Mon Profil</h1>
        <p>Prénom : {user?.firstname}</p>
        <p>Nom : {user?.lastname}</p>
        <p>Email : {user?.email}</p>

    </div>;
}