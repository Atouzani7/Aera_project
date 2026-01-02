"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Définir la forme des données de l'utilisateur
interface User {
    id: string;
    email: string;
    // Ajoute d'autres champs selon le backend NestJS
}

// 2. Définir ce que le contexte va partager
interface AuthContextType {
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User, token: string) => {
        setUser(userData);
        localStorage.setItem("token", token); // Stockage du JWT
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. Hook personnalisé pour utiliser le contexte facilement
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
};