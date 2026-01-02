"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { SIGN_IN } from "../graphql/mutations/user.mutations";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


interface SignInResponse {
    signIn: {
        user: {
            email: string;
        };
    };
}


export default function ModalAuth() {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [signIn, { loading, error, data }] = useMutation<SignInResponse>(SIGN_IN);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SUBMIT OK");

        try {
            await signIn({
                variables: {
                    email,
                    pass,
                },
            });
        } catch (err) {
            console.error("MUTATION ERROR", err);
        }
    };


    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className="border-pink-200 text-pink-600 hover:bg-pink-50"
                    >
                        Se connecter
                    </Button>

                </DialogTrigger>

                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold">
                            Bienvenue
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="login">Connexion</TabsTrigger>
                                <TabsTrigger value="register">Inscription</TabsTrigger>
                            </TabsList>

                            {/* LOGIN */}
                            <TabsContent value="login" className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Mot de passe</Label>
                                    <Input
                                        type="password"
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                </div>

                                {/* ✅ SUBMIT */}
                                <Button
                                    type="submit"
                                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                                >
                                    Se connecter
                                </Button>


                                {loading && <p>Connexion...</p>}
                                {error && <p>Erreur : {error.message}</p>}

                                {data && (
                                    <p>
                                        Connecté en tant que <i>{data.signIn.user.email}</i>
                                    </p>
                                )}
                            </TabsContent>

                            {/* REGISTER */}
                            {/* FORMULAIRE INSCRIPTION */}
                            <TabsContent value="register" className="space-y-4">
                                <div className="space-y-2">

                                    <Label htmlFor="reg-name">Nom complet</Label>
                                    <Input id="reg-name" placeholder="Jean Dupont" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reg-email">Email</Label>
                                    <Input id="reg-email" type="email" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reg-password">Mot de passe</Label>
                                    <Input id="reg-password" type="password" />
                                </div>
                                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                                    Créer un compte
                                </Button>
                                {loading && <p>Connexion...</p>}
                                {error && <p>Erreur : {error.message}</p>}

                                {data && (
                                    <p>
                                        Compte crée en tant que <i>{data.signIn.user.email}</i>
                                    </p>
                                )}
                            </TabsContent>
                        </Tabs>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}