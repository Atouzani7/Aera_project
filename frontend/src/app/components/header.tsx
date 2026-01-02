import Image from "next/image";

export default function Header() {
    return (
        <header className="bg-background/40 w-full fixed top-0 left-0 z-50 border-b-2 border-border shadow">

            <div className="container mx-auto flex  justify-between items-center px-4">
                <div className=" h-full bg-background/10   items-left justify-center py-4">

                    <Image
                        src="/aera_project.logo.svg"
                        alt="logo"
                        width={200}
                        height={40}
                        className=""
                        priority
                    />
                </div>
                <div className=" h-full bg-background/40 flex flex-col  items-right justify-center py-4">
                    {/* <button className="mb-2 border border-border bg-button px-4 py-2 rounded-md hover:bg-button-hover hover:text-foreground transition ounded-md hover:bg-button-hover hover:text-foreground transition"> */}
                    <button className="mb-2 px-4 py-2 rounded-md border-pink-200 text-pink-600 hover:bg-pink-50 backdrop-blur-md text-black hover:bg-button-hover hover:backdrop-blur-lg transition">
                        Se connecter
                    </button>

                    <button className="mb-2 px-4 py-2 rounded-md border-pink-200 text-pink-600 hover:bg-pink-50 backdrop-blur-md text-black hover:bg-button-hover hover:backdrop-blur-lg transition">
                        S&apos;inscrire
                    </button>
                </div>


            </div>
        </header>);
}
