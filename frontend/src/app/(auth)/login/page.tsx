"use client";
import LoginForm from "@/src/components/Auth/LoginForm";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import Image from "next/image";


export default function LoginPage() {

    return <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-white via-slate-50 to-gray-100 mt-20">

        {/* LEFT HERO */}
        <div className="relative md:w-1/2 w-full h-[40vh] md:h-screen flex items-center justify-center overflow-hidden">

            {/* Background image */}
            <Image
                src="/hero.image.webp"
                alt="hero"
                fill
                priority
                className="absolute inset-0 object-cover opacity-50 scale-105"
            />

            {/* overlays soft */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-white/20 to-teal-50/30" />
            <div className="absolute inset-0 backdrop-blur-[1px]" />

            {/* Glass Card */}
            <div className="relative z-10 w-[90%] max-w-lg">
                <div className="rounded-3xl border border-white/60 bg-white/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-10 text-center">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900"
                    >
                        Heureux de vous revoir
                    </motion.h1>

                    <p className="mt-5 text-sm md:text-base text-gray-600 leading-relaxed">
                        Connectez-vous et continuez à organiser, suivre et réussir vos projets avec Aera Project.
                    </p>

                    {/* accent line */}
                    <div className="mt-6 mx-auto h-[2px] w-28 rounded-full bg-gradient-to-r from-teal-400 via-gray-300 to-violet-400 opacity-80" />

                </div>
            </div>
        </div>

        {/* RIGHT FORM */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-6 md:p-16">
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </div>

    </div>

}