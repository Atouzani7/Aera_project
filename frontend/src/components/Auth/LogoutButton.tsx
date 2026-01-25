"use client"
// import { useAuth } from "@/app/hook/context/authContext";
// import { Button } from "@/app/components/ui/button";
// import { DialogContent, DialogHeader, DialogTitle, DialogTrigger, Dialog } from "@/app/components/ui/dialog"; // Correction import Dialog
import { LOGOUT } from "@/graphQL/mutations/user.mutation";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { LogOut } from 'lucide-react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogFooter,
} from "@/src/components/ui/dialog"

import { Button } from "../ui/button";
import { useAuth } from "@/src/app/hook/context/authContext";

export default function LogoutButton() {
    const [open, setOpen] = useState(false);
    const { contextLogout } = useAuth();

    // On peut ajouter onCompleted pour s'assurer du nettoyage
    const [logoutMutation] = useMutation(LOGOUT);

    const handleConfirmLogout = async () => {
        try {
            // 1. On tente d'avertir le back-end
            await logoutMutation();
        } catch (error) {
            // Si le token est déjà expiré, le back renverra "Unauthorized"
            // On log l'erreur mais on continue la déconnexion locale
            console.warn("Le serveur n'a pas pu valider la déconnexion, nettoyage local...");
        } finally {
            // 2. Quoi qu'il arrive, on nettoie le contexte client (LocalStorage/State)
            contextLogout();
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="text-foreground " >
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Confirmer la déconnexion</DialogTitle>
                </DialogHeader>

                <p className="mt-2 mb-4 text-sm text-muted-foreground">
                    Es-tu sûr de vouloir te déconnecter ? Cette action te fera quitter ton compte.
                </p>

                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variant="validation"
                        onClick={() => setOpen(false)}
                    >
                        Annuler
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleConfirmLogout}
                    >
                        Oui, déconnecter
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}