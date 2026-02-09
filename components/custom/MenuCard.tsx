import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function MenuCard({
    title,
    description,
    icon, //lucide icons
    href,
    onClick,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    onClick?: () => void;
}) {
    const cardContent = (
        <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
                <div className="flex items-center justify-center mb-4 text-primary group-hover:text-primary-foreground transition-colors">
                    {icon}
                </div>
                <CardTitle className="text-center font-bold group-hover:text-primary-foreground transition-colors">
                    {title}
                </CardTitle>
                <CardDescription className="text-center text-sm text-muted-foreground group-hover:text-primary-foreground/90 transition-colors">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    );

    const className =
        "w-full max-w-sm hover:bg-primary hover:border-primary transition-all duration-300 bg-card hover:scale-[1.03] shadow-md border border-border rounded-lg overflow-hidden group";

    // If href is "#" or onClick is provided, render as clickable div
    if (href === "#" || onClick) {
        return (
            <div onClick={onClick} className={`${className} cursor-pointer`}>
                {cardContent}
            </div>
        );
    }

    // Otherwise render as link
    return (
        <a href={href} className={className}>
            {cardContent}
        </a>
    );
}
