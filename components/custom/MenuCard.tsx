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
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
}) {
    return (
        <a
            href={href}
            className="w-full max-w-sm hover:bg-primary hover:border-primary transition-all duration-300 bg-card hover:scale-[1.03] shadow-md border border-border rounded-lg overflow-hidden group"
        >
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
        </a>
    );
}
