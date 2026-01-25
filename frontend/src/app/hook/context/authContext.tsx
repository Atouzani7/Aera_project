"use client";

import { ME } from "@/graphQL/queries/users.queries";
import { useApolloClient, useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

interface AuthContextType {
    user: UserType | undefined;
    login: (userData: UserType, token: string) => void;
    contextLogout: () => void;
    isLoading: boolean;
}

export interface UserType {
    id: string;
    email: string;
    firstname?: string;
    lastname?: string;
    role?: string;
    workspace?: {
        id: string;
        name: string;
        description: string;
        createdAt: string;
        status: string;
        updatedAt: string;
        archivedAt: string;
        projects: {
            id: string;
            name: string;
            description: string;
            createdAt: string;
            status: string;
            updatedAt: string;
            archivedAt: string;
        }[];
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
    const router = useRouter();

    const contextLogout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setUser(undefined);

        router.push("/");

    }, [router]);

    const [isLoading, setIsLoading] = useState(true);

    // On récupère les données via la query ME
    const { data, error, loading } = useQuery<{ me: UserType }>(ME, {
        fetchPolicy: "network-only", // Pour forcer la récupération fraîche
    });
    // console.log(" AuthProvider - ME query data:", data, "loading:", loading, "error:", error);

    useEffect(() => {
        // 1. Tenter de récupérer les données locales tout de suite pour l'UX
        const savedUser = localStorage.getItem("userData");
        if (savedUser && !user) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Parsing error", e);
            }
        }
        // 2. Gérer la réponse de la query ME
        if (!loading) {
            if (data?.me) {
                console.log("✅ ME query (avec projets) reçue :", data.me);
                setUser(data.me);
                // On met à jour le cache local pour la prochaine fois
                localStorage.setItem("userData", JSON.stringify(data.me));
            } else if (error) {
                // console.error("❌ ME query error:", error.message);
                if (error.message.toLowerCase().includes("unauthorized")) {
                    contextLogout(); // On appelle la fonction de nettoyage
                }
            }
            setIsLoading(false);
        }

    }, [data, loading, error]);
    const login = useCallback((userData: UserType, token: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);
        console.log("TOKEN SAVED:", token);
        console.log("LOCAL STORAGE NOW:", localStorage.getItem("token"));

    }, []);

    // const client = useApolloClient();

    // // Après avoir mis le token dans le localStorage :
    // client.resetStore();

    return (
        <AuthContext.Provider value={{ user, login, contextLogout, isLoading, }}>
            {children}
        </AuthContext.Provider>
    );
};


// Hook personnalisé pour l'utiliser partout facilement
export const useAuth = () => useContext(AuthContext);