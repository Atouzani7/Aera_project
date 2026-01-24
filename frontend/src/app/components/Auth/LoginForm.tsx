"use client";

import { SIGN_IN } from "@/graphQL/mutations/user.mutation";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { useAuth, UserType } from "../../hook/context/authContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LogIn } from "lucide-react";

type SignInData = {
    signIn: {
        accessToken: string;
        user: UserType;
    };
};

type SignInVars = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const { login, user } = useAuth(); // on récupère la fonction du context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signin, { loading, error }] = useMutation<SignInData, SignInVars>(SIGN_IN, {
        onCompleted: (data) => {
            // ⚡ On envoie les infos au AuthContext
            login(data.signIn.user, data.signIn.accessToken);
        },
    });

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        await signin({
            variables: { email, password },
        });
    };
    if (user) {
        return (
            <div className="p-4 border rounded bg-green-100 dark:bg-purple-100 dark:text-black m-auto">
                <p>
                    ✅ Connecté en tant que <strong>{user.role?.toUpperCase()}</strong> | {" "}
                    <strong>{user.firstname}</strong>
                </p>
            </div>
        );
    }
    return (
        <form onSubmit={handleSignin} className="space-y-4 m-2 m-auto w-full max-w-md ">
            <h1 className="text-3xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-gray-400 to-violet-400 tracking-tighter md:text-4xl">
                Se connecter
            </h1>
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />

            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
            />

            {error && <p className="text-red-500">{error.message}</p>}

            <Button type="submit" disabled={loading}><LogIn className="mr-2 h-4 w-4" /> {loading ? "Connexion..." : "Se connecter"} </Button>


        </form>
    );
}
