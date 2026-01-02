import { createFileRoute } from '@tanstack/react-router'
import PageHeader from '@/components/common/PageHeader'
import ErrorState from '@/components/common/ErrorState'
import EmptyState from '@/components/common/EmptyState'
import { Skeleton } from '@/components/ui/skeleton'
import StatusBadge from '@/components/common/StatusBadge'
import { Card, CardContent } from '@/components/ui/card'
import { useDeployHistoryQuery } from '@/queries/it/useDeployQuery'

export const Route = createFileRoute('/ops/it/deploy')({
    component: DeployPage,
})

function DeployPage() {
    const query = useDeployHistoryQuery()

    if (query.isError) return <ErrorState />

    return (
        <div className="space-y-6">
            <PageHeader
                title="배포 이력"
                description="최근 배포 실행 결과를 확인합니다."
            />

            {query.isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-20" />
                ))
                : !query.data || query.data.length === 0 ? (
                    <EmptyState description="배포 이력이 없습니다." />
                ) : (
                    query.data.map((d) => (
                        <Card key={d.id}>
                            <CardContent className="flex justify-between items-center">
                                <div>
                                    <div className="font-medium">{d.service}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {d.time} · {d.version}
                                    </div>
                                </div>
                                <StatusBadge status={d.status} />
                            </CardContent>
                        </Card>
                    ))
                )}
        </div>
    )
}
