import { Inbox } from "lucide-react"

export default function EmptyState({
    title = "표시할 데이터가 없습니다",
    description,
}: {
    title?: string
    description?: string
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <Inbox className="h-6 w-6 text-muted-foreground" />
            <div className="font-medium">{title}</div>
            {description && (
                <div className="text-sm text-muted-foreground">
                    {description}
                </div>
            )}
        </div>
    )
}
