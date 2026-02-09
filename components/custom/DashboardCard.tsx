import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

function CardWrapper({
    children,
    href,
    isExternal,
}: {
    children: React.ReactNode;
    href: string;
    isExternal: boolean;
}) {
    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
            >
                {children}
            </a>
        );
    }
    return (
        <Link href={href} className="block h-full">
            {children}
        </Link>
    );
}

export function DashboardCard({
    title,
    description,
    icon,
    href,
    isExternal = false,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    isExternal?: boolean;
}) {
    return (
        <a
            href={href}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : ""}
            className="block h-full"
        >
            <Card className="h-full hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-[1.02] shadow-md border border-border cursor-pointer group">
                <CardHeader>
                    <div className="flex items-center justify-center text-primary group-hover:text-primary-foreground transition-colors m-10">
                        {icon}
                    </div>
                    <CardTitle className="text-center font-semibold text-lg group-hover:text-primary-foreground transition-colors">
                        {title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-center text-muted-foreground group-hover:text-primary-foreground/90 transition-colors">
                        {description}
                    </CardDescription>
                </CardHeader>
            </Card>
        </a>
    );
}
