"use client";
import RegisterForm from "@/src/components/Auth/RegisterForm";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import Image from "next/image";

export default function RegisterPage() {
    return (

        <div className="flex flex-col md:flex-row min-h-screen">

            {/* LEFT SIDE - VISUAL */}


            <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
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
                        Rejoignez Aera Project
                    </motion.h1>

                    <p className="text-gray-600 dark:text-gray-700 mb-6">
                        Créez votre compte dès aujourd&apos;hui et commencez à gérer vos projets efficacement avec Aera Project.
                    </p>
                </Card>
            </div>


            {/* RIGHT SIDE - FORM */}
            <div className="flex w-1/2 m-auto w-full items-center justify-center">
                <RegisterForm />
            </div>

        </div>

    );
}