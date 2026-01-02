import { AlertTriangle } from "lucide-react"

export default function ErrorState({
    title = "데이터를 불러오지 못했습니다",
    description = "잠시 후 다시 시도해주세요.",
}: {
    title?: string
    description?: string
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <div className="font-medium">{title}</div>
            <div className="text-sm text-muted-foreground">
                {description}
            </div>
        </div>
    )
}
