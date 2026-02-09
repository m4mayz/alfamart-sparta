"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const APPS_SCRIPT_POST_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";
const PYTHON_API_LOGIN_URL = process.env.NEXT_PUBLIC_API_LOGIN_URL || "";

async function logLoginAttempt(
    username: string,
    cabang: string,
    status: string,
) {
    const logData = {
        requestType: "loginAttempt",
        username: username,
        cabang: cabang,
        status: status,
    };

    try {
        await fetch(APPS_SCRIPT_POST_URL, {
            method: "POST",
            redirect: "follow",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(logData),
        });
    } catch (error) {
        console.error("Failed to log login attempt:", error);
    }
}

export default function AuthPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "">(
        "",
    );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // Check if user is already authenticated
        const authenticated = sessionStorage.getItem("authenticated");
        const userRole = sessionStorage.getItem("userRole");

        if (authenticated === "true" && userRole) {
            // Redirect to dashboard if already logged in
            router.push("/dashboard");
        }
    }, [router]);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setPassword(value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation
        if (!email || !password) {
            setMessage("Email dan password harus diisi");
            setMessageType("error");
            return;
        }

        setIsLoading(true);
        setMessage("Logging in...");
        setMessageType("");

        const cabang = password.toUpperCase();

        try {
            const response = await fetch(PYTHON_API_LOGIN_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, cabang: cabang }),
            });

            const result = await response.json();

            // Handle berdasarkan status code
            if (response.status === 200 && result.status === "success") {
                // Login berhasil
                logLoginAttempt(email, cabang, "Success");

                const userRole = (result.role || "").toUpperCase();

                setMessage("Login berhasil! Mengalihkan...");
                setMessageType("success");

                sessionStorage.setItem("authenticated", "true");
                sessionStorage.setItem("loggedInUserEmail", email);
                sessionStorage.setItem("userRole", userRole);
                sessionStorage.setItem("loggedInUserCabang", cabang);

                setTimeout(() => {
                    router.push("/dashboard");
                }, 900);
            } else if (response.status === 400) {
                // Missing parameters
                setMessage(
                    "Email dan cabang/password harus diisi dengan benar",
                );
                setMessageType("error");
                logLoginAttempt(email, cabang, "Failed");
                setIsLoading(false);
            } else if (response.status === 401) {
                // Invalid credentials
                setMessage(
                    "Email atau cabang tidak valid. Silakan periksa kembali.",
                );
                setMessageType("error");
                logLoginAttempt(email, cabang, "Failed");
                setIsLoading(false);
            } else if (response.status === 500) {
                // Server error
                setMessage(
                    "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
                );
                setMessageType("error");
                logLoginAttempt(email, cabang, "Failed");
                setIsLoading(false);
            } else {
                // Unknown error
                setMessage(result.message || "Login gagal. Silakan coba lagi.");
                setMessageType("error");
                logLoginAttempt(email, cabang, "Failed");
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            logLoginAttempt(email, cabang, "Failed");
            setMessage(
                "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
            );
            setMessageType("error");
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md shadow-xl">
            <div className="px-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali
                </Link>
            </div>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                    Building & Maintenance
                </CardTitle>
                <CardDescription className="text-center">
                    Login untuk mengakses dashboard
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    {message && (
                        <div
                            className={`mb-4 p-3 rounded-md text-sm ${
                                messageType === "success"
                                    ? "bg-green-100 text-green-800 border border-green-200"
                                    : messageType === "error"
                                      ? "bg-red-100 text-red-800 border border-red-200"
                                      : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}
                        >
                            {message}
                        </div>
                    )}
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Masukkan email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Masukkan password"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                    disabled={isLoading}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    disabled={isLoading}
                                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                                >
                                    {showPassword ? (
                                        <Eye className="h-4 w-4" />
                                    ) : (
                                        <EyeOff className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
