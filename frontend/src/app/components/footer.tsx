import Image from "next/image";
export default function Footer() {
    return (
        <footer className="bg-background w-full  bottom-0 left-0 z-50 border-t-2 border-border shadow">
            <div className="container mx-auto flex justify-center items-center px-4 py-4">
                <Image
                    src="/aera_project.logo.svg"
                    alt="logo"
                    width={100}
                    height={20}
                    className=""
                    priority
                />
                <p className="text-sm text-foreground">
                    &copy; {new Date().getFullYear()} Aera Project. All rights reserved.
                </p>
            </div>
        </footer>
    );
}