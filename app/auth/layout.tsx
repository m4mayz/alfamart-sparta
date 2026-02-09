import { Header } from "@/components/layout/header";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <div className="bg-gradient-to-br from-background to-muted/20 px-4 min-h-[calc(100vh-150px)] flex justify-center items-center">
                {children}
            </div>
        </>
    );
}
