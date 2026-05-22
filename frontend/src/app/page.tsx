// LANDING PAGE
"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6f7fb] text-[#0f172a] font-avenir pt-42">

      {/* BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden">

        {/* gradient blobs */}

        <div className="absolute top-[-120px] left-[-120px] h-[420px] w-[420px] rounded-full bg-violet-200/40 blur-[120px]" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-200/40 blur-[120px]" />

        {/* grid */}

        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />

      </div>

      <main className="relative z-10">

        {/* HERO */}

        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl"
          >

            {/* BADGE */}

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">

              <div className="h-2 w-2 rounded-full bg-violet-500" />

              <span className="text-sm text-slate-600">
                Nouvelle expérience client freelance
              </span>

            </div>

            {/* TITLE */}

            <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-7xl">

              Des projets plus clairs.
              <br />

              <span className="bg-gradient-to-r from-violet-600/40 via-blue-500/40 to-cyan-500/40 bg-clip-text text-transparent">

                Une collaboration plus élégante.

              </span>

            </h1>

            {/* SUBTITLE */}

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl">

              Centralise tes échanges clients, fichiers,
              validations et étapes projet dans un espace moderne,
              simple et premium.

            </p>

            {/* CTA */}

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <button className="rounded-2xl bg-[#0f172a] px-8 py-4 font-medium text-white shadow-[0_20px_50px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.22)]"
                onClick={() => { router.push("/register"); setIsOpen(false); }}>

                Commencer gratuitement

              </button>


              <button className="rounded-2xl border border-slate-200 bg-white/80 px-8 py-4 text-slate-700 backdrop-blur-xl transition hover:bg-white">

                Voir la démo

              </button>

            </div>

          </motion.div>

          {/* MOCKUP */}

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mt-24 w-full max-w-6xl"
          >

            {/* glow */}

            <div className="absolute inset-0 bg-gradient-to-r from-violet-200/40 to-cyan-200/40 blur-[80px]" />

            {/* card */}

            <div className="relative rounded-[32px] border border-white/70 bg-white/70 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">

              <Image
                src="/mockup_macbook.png"
                alt="dashboard"
                width={1400}
                height={900}
                className="rounded-2xl"
                priority
              />

            </div>

          </motion.div>

        </section>

        {/* FEATURES */}

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-32 md:grid-cols-3">

          {[
            {
              title: "Tout au même endroit",
              text: "Fichiers, feedbacks, tâches et validations centralisés."
            },
            {
              title: "Une image plus pro",
              text: "Offre une vraie expérience premium à tes clients."
            },
            {
              title: "Moins d’allers-retours",
              text: "Chaque projet reste clair du début à la livraison."
            }
          ].map((feature, i) => (

            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="rounded-[28px] border border-white/80 bg-white/60 p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl"
            >

              <div className="mb-6 h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg" />

              <h3 className="text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-relaxed text-slate-500">
                {feature.text}
              </p>

            </motion.div>

          ))}

        </section>

      </main>
    </div>
  );
}
