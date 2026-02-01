import Image from "next/image";
export default function Footer() {
    return (
        <footer className=" bottom-0 left-0 w-full h-[74px] bg-white/10 backdrop-blur-xl border-t-2 border-border shadow z-50">
            <div className="container mx-auto h-full flex items-center justify-between px-4">
                {/* Logo */}
                <Image src="/logo.png" alt="Logo" width={80} height={20} loading="eager" />

                {/* Texte */}
                <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm font-medium text-muted-foreground">
                    <p>© 2026 Aera Project</p>
                    <p>A calm space for your projects.</p>
                    <p>Mentions légales · Confidentialité · Contact</p>
                </div>
            </div>
        </footer>

    );
}