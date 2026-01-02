export default function NavSection({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div className="mt-6">
            <div className="px-2 mb-1 text-xs font-semibold text-muted-foreground">
                {title}
            </div>
            {children}
        </div>
    )
}
