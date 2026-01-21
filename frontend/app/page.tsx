import Image from "next/image";
import AuthForm from "./components/Auth/LoginForm";
import { Separator } from "@radix-ui/react-separator";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full  flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <Image
          src="/aera_project.png"
          alt="aera project logo"
          width={300}
          height={20}
          lazyRoot=""
          className="m-auto"
        />
        <div className="flex flex-col items-center gap-2 m-auto h-screen">
          <h1 className="text-3xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-gray-400 to-violet-400 tracking-tighter md:text-4xl">
            Bienvenue sur Aera Project
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Développeur Fullstack
          </p>
          <Separator className="my-4 h-px w-48 bg-zinc-200 dark:bg-zinc-700" />
        </div>
        <AuthForm />
      </main>
    </div>
  );
}
