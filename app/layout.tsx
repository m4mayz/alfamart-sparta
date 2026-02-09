import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["300", "400", "500", "600", "700"],
});

const firaCode = Fira_Code({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
    title: "SPARTA",
    description:
        "System for Property Administration, Reporting, Tracking & Approval",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={plusJakartaSans.variable}>
            <body
                className={`${plusJakartaSans.variable} ${firaCode.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
