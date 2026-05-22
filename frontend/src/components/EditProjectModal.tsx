import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FC } from "react";
import type { Variants } from "framer-motion";
import { buttonStyles } from "./ButtonStyle";

const backdrop: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modal: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 25 },
    },
};

interface EditProjectModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    project: { name: string; description: string };
}

export const EditProjectModal: FC<EditProjectModalProps> = ({ open, setOpen, project }) => {
    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            >
                {/* MODAL CARD */}
                <motion.div
                    variants={modal}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-xl rounded-2xl bg-white/80 border border-white/30 shadow-2xl p-6 space-y-5"
                >

                    {/* HEADER */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                            Modifier le projet
                        </h3>

                        <button
                            onClick={() => setOpen(false)}
                            className="p-2 rounded-full hover:bg-black/5 transition"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* FORM */}
                    <div className="space-y-4">

                        <div>
                            <label className="text-xs text-muted-foreground">
                                Nom du projet
                            </label>
                            <input
                                defaultValue={project.name}
                                className="w-full mt-1 px-3 py-2 rounded-lg border border-white/40 bg-white/60 focus:outline-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-muted-foreground">
                                Description
                            </label>
                            <textarea
                                defaultValue={project.description}
                                rows={4}
                                className="w-full mt-1 px-3 py-2 rounded-lg border border-white/40 bg-white/60 focus:outline-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            onClick={() => setOpen(false)}
                            className={buttonStyles.cancel}
                        >
                            Annuler
                        </button>

                        <button
                            className={buttonStyles.validate}
                        >
                            Sauvegarder
                        </button>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};