"use client";
import LoginForm from "@/src/components/Auth/LoginForm";
import { Card } from "@/src/components/ui/card";
import { motion } from "motion/react";
import Image from "next/image";


export default function LoginPage() {
    return <div className="flex md:flex-row flex-col min-h-screen items-center md:justify-start justify-center ">
        <div className="relative md:w-1/2 h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
            {/* Image de fond */}
            <Image
                src="/hero.image.webp"
                alt="hero"
                fill
                priority
                className="absolute inset-0 object-cover opacity-40 z-0"
            />

            {/* Card / Hero Content */}
            <Card className="relative z-20 w-full max-w-lg md:w-1/2 sm:h-auto bg-white/80 dark:bg-white/80 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center p-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-gray-400 to-violet-400 tracking-tighter mb-4"
                >
                    Heureux de vous revoir !
                </motion.h1>

                <p className="text-gray-600 dark:text-gray-700 mb-6">
                    Connectez-vous et continuez à organiser, suivre et réussir vos projets avec Aera Project.
                </p>
            </Card>
        </div>

        <LoginForm />
    </div>

}