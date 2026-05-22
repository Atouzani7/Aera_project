"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Footer() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <footer className="relative mt-32 border-t border-white/60 bg-white/40 backdrop-blur-2xl">

            {/* glow */}

            <div className="absolute inset-0 bg-gradient-to-r from-violet-200/20 via-transparent to-cyan-200/20 pointer-events-none" />

            <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row">

                {/* LEFT */}

                <div className="flex items-center gap-4">

                    <div className="rounded-2xl border border-white/60 bg-white/70 p-3 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">

                        <Image
                            src="/logo.png"
                            alt="Aera Project"
                            width={36}
                            height={36}
                            priority
                        />

                    </div>

                    <div>

                        <p className="text-sm font-semibold text-slate-900">
                            Aera Project
                        </p>

                        <p className="text-sm text-slate-500">
                            A calm space for your projects.
                        </p>

                    </div>

                </div>

                {/* CENTER */}

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">

                    <a
                        href="#"
                        className="transition hover:text-slate-900"
                        onClick={() => { router.push("/legal"); setIsOpen(false); }}
                    >
                        Mentions légales
                    </a>

                    <a
                        href="#"
                        className="transition hover:text-slate-900"
                        onClick={() => { router.push("/privacy"); setIsOpen(false); }}
                    >
                        Confidentialité
                    </a>

                    <a
                        href="#"
                        className="transition hover:text-slate-900"
                        onClick={() => { router.push("/contact"); setIsOpen(false); }}
                    >
                        Contact
                    </a>

                </div>

                {/* RIGHT */}

                <div className="text-sm text-slate-400">
                    © 2026 Aera Project
                </div>

            </div>

        </footer>

    );
}