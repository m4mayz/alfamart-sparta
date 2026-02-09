"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { MenuCard } from "@/components/custom/MenuCard";
import { Label } from "@/components/ui/label";
import { BookOpen, Info, Users } from "lucide-react";

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        // Check if user is already authenticated
        const authenticated = sessionStorage.getItem("authenticated");
        const userRole = sessionStorage.getItem("userRole");

        if (authenticated === "true" && userRole) {
            // Redirect to dashboard if already logged in
            router.push("/dashboard");
        }
    }, [router]);

    return (
        <>
            <Header />
            <div className="container max-w-6xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mt-15 mb-2 text-center">
                    System for Property Administration, Reporting, Tracking &
                    Approval
                </h2>
                <div className="flex justify-center mb-10">
                    <Label className="text-lg text-muted-foreground text-center">
                        Silakan pilih menu di bawah ini untuk mengakses SPARTA
                    </Label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center max-w-5xl mx-auto">
                    <MenuCard
                        title="Dashboard"
                        description="Login dashboard SPARTA Alfamart"
                        icon={<Users className="h-24 w-24" />}
                        href="/auth"
                    />
                    <MenuCard
                        title="User Manual"
                        description="Panduan Penggunaan Sistem & Alur Kerja"
                        icon={<BookOpen className="h-24 w-24" />}
                        href="/auth"
                    />
                    <MenuCard
                        title="Tentang SPARTA"
                        description="Informasi Versi & Pengembang Aplikasi"
                        icon={<Info className="h-24 w-24" />}
                        href="/auth"
                    />
                    {/* Add more MenuCard components as needed */}
                </div>
            </div>
        </>
    );
}
