import { createFileRoute } from '@tanstack/react-router'
import PageHeader from '@/components/common/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import StatusBadge from '@/components/common/StatusBadge'

export const Route = createFileRoute('/ops/it/workflows')({
    component: WorkflowsPage,
})

function WorkflowsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="운영 Workflow"
                description="운영 자동화를 위한 주요 Workflow 상태를 관리합니다."
            />

            <Card>
                <CardHeader>
                    <CardTitle>등록된 Workflow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <WorkflowRow name="야간 배치 자동 실행" status="SUCCESS" />
                    <WorkflowRow name="배포 후 헬스체크" status="SUCCESS" />
                    <WorkflowRow name="장애 알림 전파" status="FAILED" />
                </CardContent>
            </Card>
        </div>
    )
}

function WorkflowRow({
    name,
    status,
}: {
    name: string
    status: 'SUCCESS' | 'FAILED'
}) {
    return (
        <div className="flex justify-between items-center">
            <span>{name}</span>
            <StatusBadge status={status} />
        </div>
    )
}
