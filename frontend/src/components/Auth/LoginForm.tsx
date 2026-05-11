"use client";

import { SIGN_IN } from "@/graphQL/mutations/user.mutation";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { UserType, useAuth } from "@/src/app/hook/context/authContext";
import { buttonStyles } from "../ButtonStyle";

type SignInData = {
    signIn: {
        access_token: string;
        user: UserType;
    };
};

type SignInVars = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const router = useRouter();
    const { login, user } = useAuth(); // on récupère la fonction du context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const [signin, { loading, error }] = useMutation<SignInData, SignInVars>(SIGN_IN, {
    //     onCompleted: (data) => {
    //         // ⚡ On envoie les infos au AuthContext
    //         console.log("Login réussi :", data);
    //         console.log("RAW GRAPHQL RESPONSE:", JSON.stringify(data, null, 2));
    //         login(data.signIn.user, data.signIn.access_token);
    //     },
    // });


    const [signin, { loading, error }] = useMutation<SignInData, SignInVars>(
        SIGN_IN,
        {
            onCompleted: async (data) => {
                console.log("✅ Login GraphQL OK");

                await login(data.signIn.user, data.signIn.access_token);

                // router.push(`/workspace/${data.signIn.user?.workspace?.id}`);
                router.push(`${routes.workspace.pathname}/${data.signIn.user?.workspace?.id}`);
            },
        }
    );


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
        <form
            onSubmit={handleSignin}
            className="w-full max-w-md mx-auto p-8 space-y-5 rounded-3xl border border-white/50 bg-white/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
        >

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                Se connecter
            </h1>

            <p className="text-sm text-gray-500">
                Accédez à votre espace et continuez vos projets.
            </p>

            {/* Email */}
            <div className="space-y-1">
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="h-11 rounded-xl border-gray-200 bg-white/60 backdrop-blur focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                />
            </div>

            {/* Password */}
            <div className="space-y-1">
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    required
                    className="h-11 rounded-xl border-gray-200 bg-white/60 backdrop-blur focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
                />
            </div>

            {/* Error */}
            {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl p-2">
                    {error.message}
                </p>
            )}

            {/* Button */}
            <Button
                type="submit"
                disabled={loading}
                // className="w-full h-11 rounded-xl bg-gradient-to-r from-teal-500 via-gray-400 to-violet-400 text-white font-medium shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                className={buttonStyles.add}
            >
                <LogIn className="mr-2 h-4 w-4" />
                {loading ? "Connexion..." : "Se connecter"}
            </Button>

        </form>
    );
}
