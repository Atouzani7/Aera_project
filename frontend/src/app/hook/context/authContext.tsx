"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

interface AuthContextType {
    user: UserType | undefined;
    login: (userData: UserType, token: string) => void;
    contextLogout: () => void;
    isLoading: boolean;
}

export interface UserType {
    email: string;
    firstname?: string;
    lastname?: string;
    role?: string;
    workspace?: {
        id: string;
        name?: string;
    };
}

export const AuthContext = createContext<AuthContextType>({
    user: undefined,
    login: () => { },
    contextLogout: () => { },
    isLoading: true, // On commence en mode chargement
});


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // const [user, setUser] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<UserType | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter(); // Initialise le router

    // Cette fonction s'exécute UNE SEULE FOIS au chargement de l'app (Client Side)
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("userData"); // On change le nom pour être plus clair

        if (savedToken && savedUser) {
            try {
                setUser(JSON.parse(savedUser)); // On transforme le texte en objet JS
            } catch (error) {
                console.error("Erreur de parsing du user", error);
            }
        }
        setIsLoading(false);
    }, []);

    const login = useCallback((userData: UserType, token: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData)); // On stocke l'objet entier
        setUser(userData);
        console.log("TOKEN SAVED:", token);
        console.log("LOCAL STORAGE NOW:", localStorage.getItem("token"));

    }, []);


    const contextLogout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setUser(undefined);

        router.push("/");

    }, [router]);

    return (
        <AuthContext.Provider value={{ user, login, contextLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour l'utiliser partout facilement
export const useAuth = () => useContext(AuthContext);
// export const useAuthContext = () => useContext(AuthContext);