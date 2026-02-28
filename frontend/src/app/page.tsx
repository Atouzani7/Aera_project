// LANDING PAGE
"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const list = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // délai entre chaque item
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  return (
    <div className="flex min-h-screen  bg-background  items-center justify-center  font-avenir ">
      <main className="pt-24">

        {/* // HERO SECTION */}


        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center md:h-[40vh]  md:flex-row items-center justify-center p-4 bg-background text-center md:text-left "
        >
          <Image
            src="/aera_project.logo.png"
            alt="logo"
            width={200}
            height={40}
            className="mt-34 md:mt-0 md:ml-4"
            priority
          />
          <div className="flex flex-col md:items-center justify-center ">

            <p className=" p-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-300 to-violet-100 bg-clip-text text-transparent "><br /> Des projets clairs. Des clients ravis. <br /></p>
            <p className=" w-2/3 md:w-1/2 ms:text-center p-4 mx-auto md:mx-0">
              La gestion de projet client ne devrait pas être compliquée.
              Tu jongles entre Trello, Notion, WhatsApp, et des mails sans fin ?
              Tes clients sont perdus, toi aussi. Tu veux juste un endroit clair, beau et simple pour collaborer.</p>
          </div>
          <Image
            src="/guillemets.png"
            alt="guillemets"
            width={40}
            height={8}
            className="mb-3 md:m-0 md:mr-8 md:w-50 "
            priority
          />
        </motion.div>

        {/* // FEATURES SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className=" md:h-[40vh] flex flex-col md:flex-row items-center justify-around rounded-lg  mt-8 bg-background "
        >
          <motion.div className="border-2 border-border rounded-lg m-4 p-4 bg-background shadow-lg">
            <Image
              src="/fleche.png"
              alt="fleche conccurence"
              width={400}
              height={72.66}
              className="justify-center p-4"
              priority
            />
          </motion.div>

          <div className="flex flex-col items-center justify-center p-4 bg-background text-center">
            <div>
              <p className="text-xl ">Fini les mails perdus et les outils éparpillés</p>
              <p className="text-xl m-4">Aera Project est la solution.</p>
            </div>
            <motion.div>
              <motion.ul
                className="list-disc list-inside text-left"
                variants={list}
                initial="hidden"
                whileInView="visible"      // déclenche l'animation quand on scroll
                viewport={{ once: true, amount: 0.8 }} // joue l'anim une seule fois, quand 50% de l'élément est visible
              >
                <motion.li variants={item}>
                  Organise tes projets en un clin d’œil
                </motion.li>
                <motion.li variants={item}>
                  Collabore facilement avec tes clients
                </motion.li>
                <motion.li variants={item}>
                  Gagne du temps et évite les allers-retours inutiles
                </motion.li>
                <motion.li variants={item}>
                  Partage l’avancement étape par étape
                </motion.li><motion.li variants={item}>
                  Ajoute des commentaires, des fichiers, et garde le fil du projet
                </motion.li>
              </motion.ul>

            </motion.div>
          </div>

        </motion.div>
        {/* // POUR QUI SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:h-[40vh] flex flex-col  items-center items-center justify-center p-4 bg-background text-center md:text-left ">
          <p className="text-3xl text-center m-8 
           p-4 text-3xl md:text-4xl bg-gradient-to-r from-blue-400 via-purple-300 to-violet-100 bg-clip-text text-transparent
          ">Pour qui ?</p>

          <motion.div className=" md:w-2/3 flex flex-col md:flex-row rounded-lg m-4 p-4 bg-background shadow-lg">
            <motion.ul
              className=" list-inside text-center items-center  m-auto flex flex-col gap-8 md:flex-row justify-baseline md:justify-evenly flex-wrap md:gap-12"
              variants={list}
              initial="hidden"
              whileInView="visible"      // déclenche l'animation quand on scroll
              viewport={{ once: true, amount: 0.8 }} // joue l'anim une seule fois, quand 50% de l'élément est visible
            >
              <motion.li variants={item} className="text-detail-pink">
                <Image
                  src="/pen.png"
                  alt="icon designer"
                  width={40}
                  height={40}
                  className="inline-block mr-2 mb-2"
                  priority
                />
                Designer
              </motion.li>
              <motion.li variants={item} className="text-detail-pink">
                <Image
                  src="/web_developer.png"
                  alt="icon web_developer"
                  width={40}
                  height={40}
                  className="inline-block mr-2 mb-2"
                  priority
                />
                Web developer
              </motion.li>
              <motion.li variants={item} className="text-detail-pink">
                <Image
                  src="/photographer.png"
                  alt="icon photographer"
                  width={40}
                  height={40}
                  className="inline-block mr-2 mb-2"
                  priority
                />
                Photographer
              </motion.li>
              <motion.li variants={item} className="text-detail-pink">
                <Image
                  src="/user.png"
                  alt="icon createur indépendant"
                  width={40}
                  height={40}
                  className="inline-block mr-2 mb-2"
                  priority
                />
                Créateur indépendant
              </motion.li>
            </motion.ul>

          </motion.div>



        </motion.div>
        {/* // FEATURES SHOWCASE SECTION  */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="  flex flex-col  items-center justify-center p-4 bg-background text-center md:text-left "
        >
          <p className=" p-4 text-2xl text-center ">Découvrir Aera Project</p>
          <p className=" mb-4 text-lg ">Une interface claire pour toi et tes clients</p>
          <motion.div
            className="md:w-2/3 flex flex-col md:flex-row rounded-lg m-4 p-4 bg-background shadow-lg ">

            <motion.div
              className="  rounded-lg m-4 p-4 bg-background m-auto flex flex- md:flex-row items-center justify-center "
            >
              <motion.div className="flex flex-col items-center justify-center p-4 bg-background text-center md:text-left "
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}
              >
                <Image
                  src="/mockup_macbook.png"
                  alt="mockup_ordir page Dashboard"
                  width={350}
                  height={200}
                  className=" "
                  priority
                />
              </motion.div>
              <motion.div className="flex flex-col items-center justify-center p-4 bg-background text-center md:text-left "
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}
              >
                <Image
                  src="/mockup_phone.png"
                  alt="mockup_portable page project ID"
                  width={350}
                  height={170}
                  className=" "
                  priority
                />
              </motion.div>
            </motion.div>



          </motion.div>

        </motion.div>

        {/* Call TO ACTION  */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="  md:flex-row items-center min-h-80 justify-center p-4 bg-background text-center md:text-left ">
          <p className=" p-4 text-2xl text-center ">Prêt à simplifier ta gestion de projet ?</p>
          <motion.div className="md:w-2/3 flex flex-col md:flex-row rounded-lg m-auto p-4 bg-background shadow-lg justify-center items-center ">
            <motion.div className="flex flex-col items-center justify-center p-4 bg-background text-center md:text-left ">
              <p className=" mb-4 text-lg ">Tout commence ici !</p>
              <p>Rejoins Aera Project et créé un espace unique pour chaque projet</p>
            </motion.div>
            <motion.div>
              <motion.form className="flex flex-col gap-4  items-center justify-center mt-4">
                <Input
                  type="email"
                  placeholder="Ton adresse e-mail"
                  className="border border-border bg-input m-auto rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-detail-pink transition mb-4 md:mb-0"
                />
                <Button>
                  Commencer maintenant
                </Button>
              </motion.form>
              <p className="text-sm text-foregroundtext-sm text-muted-foreground md:mr-4">Aucun engagement. Pas de frais.</p>
            </motion.div>



          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
