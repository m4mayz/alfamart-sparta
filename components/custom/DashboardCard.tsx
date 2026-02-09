import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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
            className="block"
        >
            <Card className="h-[240px] hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-[1.02] shadow-md border border-border cursor-pointer group flex flex-col">
                <CardHeader className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center justify-center text-primary group-hover:text-primary-foreground transition-colors mb-3">
                        {icon}
                    </div>
                    <CardTitle className="font-semibold text-xl group-hover:text-primary-foreground transition-colors">
                        {title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-muted-foreground group-hover:text-primary-foreground/90 transition-colors line-clamp-3">
                        {description}
                    </CardDescription>
                </CardHeader>
            </Card>
        </a>
    );
}
