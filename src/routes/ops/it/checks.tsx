import { createFileRoute } from '@tanstack/react-router'
import PageHeader from '@/components/common/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import StatusBadge from '@/components/common/StatusBadge'

export const Route = createFileRoute('/ops/it/checks')({
    component: DailyChecksPage,
})

function DailyChecksPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Daily 운영 점검"
                description="일일 점검 항목과 현재 상태를 확인합니다."
            />

            <Card>
                <CardHeader>
                    <CardTitle>점검 항목</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <CheckRow label="DB 연결 상태" status="SUCCESS" />
                    <CheckRow label="스토리지 사용량" status="SUCCESS" />
                    <CheckRow label="주요 API 응답" status="FAILED" />
                </CardContent>
            </Card>
        </div>
    )
}

function CheckRow({
    label,
    status,
}: {
    label: string
    status: 'SUCCESS' | 'FAILED'
}) {
    return (
        <div className="flex justify-between items-center">
            <span>{label}</span>
            <StatusBadge status={status} />
        </div>
    )
}
