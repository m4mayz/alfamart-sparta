import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
    variant?: "default" | "dashboard";
    title?: string;
    description?: string;
    showBackButton?: boolean;
    backHref?: string;
}

export function Header({
    variant = "default",
    title,
    description,
    showBackButton = false,
    backHref = "/",
}: HeaderProps) {
    if (variant === "dashboard") {
        return (
            <header className="relative w-full bg-gradient-to-r from-primary via-primary to-primary/90 shadow-xl border-b-2 border-primary/20">
                <div className="container mx-auto px-6 md:px-12 lg:px-16 py-5">
                    <div className="flex items-center justify-between gap-6">
                        {/* Left Column: Back Button + Title + Description */}
                        <div className="flex items-center gap-3 md:gap-4 flex-1">
                            {showBackButton && (
                                <Link
                                    href={backHref}
                                    className="flex-shrink-0 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-105"
                                    title="Kembali"
                                >
                                    <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
                                </Link>
                            )}
                            <div className="px-4 md:px-6 py-2.5 md:py-3">
                                <h1 className="text-base md:text-xl font-bold text-white">
                                    {title || "Dashboard SPARTA"}
                                </h1>
                                {description && (
                                    <p className="text-white/90 text-xs md:text-sm mt-0.5 hidden sm:block">
                                        {description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Logos */}
                        <div className="flex items-center gap-2.5 md:gap-4 flex-shrink-0">
                            <Image
                                src="/assets/Alfamart-Emblem.png"
                                alt="Alfamart Logo"
                                width={200}
                                height={200}
                                quality={100}
                                className="h-10 w-auto md:h-14 drop-shadow-lg"
                                priority
                            />
                            <div className="h-10 md:h-12 w-px bg-white/30"></div>
                            <h2 className="text-lg md:text-2xl font-bold text-white tracking-wider drop-shadow-md hidden sm:block">
                                SPARTA
                            </h2>
                            <Image
                                src="/assets/Building-Logo.png"
                                alt="Building & Maintenance Logo"
                                width={200}
                                height={200}
                                quality={100}
                                className="h-10 w-auto md:h-14 drop-shadow-lg"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    // Default variant (centered)
    return (
        <header className="relative w-full bg-gradient-to-br from-primary to-primary/90 shadow-xl border-b-2 border-primary/20">
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-center items-center gap-2.5 md:gap-4 flex-shrink-0">
                    {/* Alfamart Logo */}
                    <div className="animate-slide-in-left">
                        <Image
                            src="/assets/Alfamart-Emblem.png"
                            alt="Alfamart Logo"
                            width={200}
                            height={200}
                            quality={100}
                            className="h-16 w-auto md:h-20 drop-shadow-2xl"
                            priority
                        />
                    </div>

                    <div className="h-10 md:h-12 w-px bg-white/30"></div>
                    <h2 className="text-lg md:text-2xl font-bold text-white tracking-wider drop-shadow-md hidden sm:block">
                        SPARTA
                    </h2>
                    <Image
                        src="/assets/Building-Logo.png"
                        alt="Building & Maintenance Logo"
                        width={200}
                        height={200}
                        quality={100}
                        className="h-10 w-auto md:h-14 drop-shadow-lg"
                        priority
                    />
                </div>
            </div>
        </header>
    );
}
