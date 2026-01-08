import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Image
          className="dark:invert"
          src="/aera_project.logo.png"
          alt="Aera project logo"
          width={200}
          height={40}
          priority
        />
        <div>
          Hello World
        </div>
      </main>
    </div>
  );
}
