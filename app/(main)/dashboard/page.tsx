"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { DashboardCard } from "@/components/custom/DashboardCard";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    FileText,
    Stamp,
    FileCheck,
    UserCheck,
    ClipboardCheck,
    Camera,
    FilePlus,
    FolderOpen,
    GanttChartSquare,
    AlertTriangle,
    Users,
    LogOut,
} from "lucide-react";

interface MenuItem {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    isExternal?: boolean;
    disabled?: boolean;
}

const allMenuItems: MenuItem[] = [
    {
        id: "menu-rab",
        title: "Penawaran Final Kontraktor",
        description: "Buat penawaran final",
        icon: <FileText className="h-10 w-10" />,
        href: "/dashboard/rab",
    },
    {
        id: "menu-materai",
        title: "Dokumen Final RAB Termaterai",
        description: "Buat dan lihat RAB Final Termaterai",
        icon: <Stamp className="h-10 w-10" />,
        href: "/dashboard/materai",
    },
    {
        id: "menu-spk",
        title: "Surat Perintah Kerja",
        description: "Form surat perintah kerja untuk kontraktor",
        icon: <FileCheck className="h-10 w-10" />,
        href: "/dashboard/spk",
    },
    {
        id: "menu-pengawasan",
        title: "PIC Pengawasan",
        description: "Form input pic pengawasan pekerjaan proyek",
        icon: <UserCheck className="h-10 w-10" />,
        href: "/dashboard/inputpic",
    },
    {
        id: "menu-opname",
        title: "Opname",
        description: "Form opname proyek toko",
        icon: <ClipboardCheck className="h-10 w-10" />,
        href: "/dashboard/opname",
    },
    {
        id: "menu-dokumentasi",
        title: "Dokumentasi Bangunan Toko Baru",
        description: "Form dokumentasi foto bangunan",
        icon: <Camera className="h-10 w-10" />,
        href: "https://dokumentasi-bangunan.vercel.app/",
        isExternal: true,
    },
    {
        id: "menu-tambahspk",
        title: "Tambahan Surat Perintah Kerja",
        description: "Form pertambahan hari surat perintah kerja",
        icon: <FilePlus className="h-10 w-10" />,
        href: "/dashboard/tambahspk",
    },
    {
        id: "menu-svdokumen",
        title: "Penyimpanan Dokumen Toko",
        description: "Form penyimpanan dokumen",
        icon: <FolderOpen className="h-10 w-10" />,
        href: "/dashboard/svdokumen",
    },
    {
        id: "menu-gantt",
        title: "Gantt Chart",
        description: "Progress pekerjaan toko",
        icon: <GanttChartSquare className="h-10 w-10" />,
        href: "/dashboard/gantt",
    },
    {
        id: "menu-sp",
        title: "Surat Peringatan",
        description: "Form surat peringatan",
        icon: <AlertTriangle className="h-10 w-10" />,
        href: "#",
        disabled: true,
    },
    {
        id: "menu-userlog",
        title: "User Log",
        description: "Log aktivitas pengguna",
        icon: <Users className="h-10 w-10" />,
        href: "/dashboard/userlog",
    },
];

const roleConfig: Record<string, string[]> = {
    "BRANCH BUILDING & MAINTENANCE MANAGER": [
        "menu-spk",
        "menu-pengawasan",
        "menu-opname",
        "menu-tambahspk",
        "menu-gantt",
        "menu-dokumentasi",
        "menu-svdokumen",
        "menu-sp",
    ],
    "BRANCH BUILDING COORDINATOR": [
        "menu-dokumentasi",
        "menu-svdokumen",
        "menu-gantt",
        "menu-opname",
        "menu-sp",
    ],
    "BRANCH BUILDING SUPPORT": [
        "menu-dokumentasi",
        "menu-opname",
        "menu-gantt",
        "menu-svdokumen",
        "menu-sp",
    ],
    KONTRAKTOR: ["menu-rab", "menu-materai", "menu-opname", "menu-gantt"],
};

export default function DashboardPage() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string>("");
    const [userRole, setUserRole] = useState<string>("");
    const [visibleMenus, setVisibleMenus] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [showSessionExpiredDialog, setShowSessionExpiredDialog] =
        useState(false);
    const [showFeatureDisabledDialog, setShowFeatureDisabledDialog] =
        useState(false);

    useEffect(() => {
        // Security check
        const authenticated = sessionStorage.getItem("authenticated");
        const email = sessionStorage.getItem("loggedInUserEmail");
        const role = sessionStorage.getItem("userRole");
        const cabang = sessionStorage.getItem("loggedInUserCabang");

        if (!authenticated || authenticated !== "true" || !role) {
            setShowSessionExpiredDialog(true);
            return;
        }

        // Determine visible menus based on role
        const currentRole = role.toUpperCase();
        const allowedMenuIds = roleConfig[currentRole]
            ? [...roleConfig[currentRole]]
            : [];

        // Head Office staff (except contractor) get additional menus
        const isHeadOffice = cabang && cabang.toUpperCase() === "HEAD OFFICE";
        const isContractor = currentRole === "KONTRAKTOR";

        if (isHeadOffice && !isContractor) {
            allowedMenuIds.push("menu-userlog");
        }

        console.log(`Role: ${currentRole}, Cabang: ${cabang}`);
        console.log(`Allowed menu IDs:`, allowedMenuIds);

        // Filter menus
        const filteredMenus = allMenuItems.filter((item) =>
            allowedMenuIds.includes(item.id),
        );

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserEmail(email || "");
        setUserRole(role || "");
        setVisibleMenus(filteredMenus);
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        sessionStorage.clear();
        router.push("/auth");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-background to-muted/20">
            <Header
                variant="dashboard"
                title="Dashboard SPARTA"
                description="System for Property Administration, Reporting, Tracking & Approval"
                showBackButton={false}
            />

            <main className="container max-w-7xl mx-auto px-4 py-8">
                {/* User Info with Logout */}
                <div className="mb-8">
                    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-muted-foreground">
                                    Masuk sebagai:
                                </span>
                                <span className="font-medium">{userEmail}</span>
                                <span className="text-muted-foreground">•</span>
                                <span className="font-medium text-primary">
                                    {userRole}
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowLogoutDialog(true)}
                                className="gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Menu Grid */}
                {visibleMenus.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {visibleMenus.map((menu) =>
                            menu.disabled ? (
                                <div
                                    key={menu.id}
                                    onClick={() =>
                                        setShowFeatureDisabledDialog(true)
                                    }
                                    className="cursor-pointer"
                                >
                                    <DashboardCard
                                        title={menu.title}
                                        description={menu.description}
                                        icon={menu.icon}
                                        href="#"
                                    />
                                </div>
                            ) : (
                                <DashboardCard
                                    key={menu.id}
                                    title={menu.title}
                                    description={menu.description}
                                    icon={menu.icon}
                                    href={menu.href}
                                    isExternal={menu.isExternal}
                                />
                            ),
                        )}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            Tidak Ada Menu Tersedia
                        </h3>
                        <p className="text-muted-foreground">
                            Role Anda tidak memiliki akses ke menu apapun.
                        </p>
                    </div>
                )}
            </main>

            {/* Logout Confirmation Dialog */}
            <AlertDialog
                open={showLogoutDialog}
                onOpenChange={setShowLogoutDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin keluar dari dashboard? Anda
                            perlu login kembali untuk mengakses sistem.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>
                            Ya, Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Session Expired Dialog */}
            <AlertDialog
                open={showSessionExpiredDialog}
                onOpenChange={(open) => {
                    if (!open) {
                        router.push("/auth");
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Sesi Habis</AlertDialogTitle>
                        <AlertDialogDescription>
                            Sesi Anda telah habis. Silakan login kembali untuk
                            melanjutkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => router.push("/auth")}>
                            OK, Login Kembali
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Feature Disabled Dialog */}
            <AlertDialog
                open={showFeatureDisabledDialog}
                onOpenChange={setShowFeatureDisabledDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Fitur Belum Tersedia
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Fitur Surat Peringatan belum tersedia. Silakan coba
                            lagi nanti.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
