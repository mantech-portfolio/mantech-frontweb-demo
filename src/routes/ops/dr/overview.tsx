import { createFileRoute } from '@tanstack/react-router'
import PageHeader from '@/components/common/PageHeader'
import ErrorState from '@/components/common/ErrorState'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDrOverviewQuery } from '@/queries/dr/useDrOverviewQuery'

export const Route = createFileRoute('/ops/dr/overview')({
    component: DrOverviewPage,
})

function DrOverviewPage() {
    const query = useDrOverviewQuery()

    if (query.isError) return <ErrorState />

    return (
        <div className="space-y-6">
            <PageHeader
                title="DR 운영 현황"
                description="재해 복구 시나리오 및 목표 지표를 확인합니다."
            />

            {query.isLoading || !query.data ? (
                <Skeleton className="h-40" />
            ) : (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard title="Primary DC" value={query.data.primaryDc} />
                    <InfoCard title="Secondary DC" value={query.data.secondaryDc} />
                    <InfoCard title="최근 DR Drill" value={query.data.lastDrill} />
                    <InfoCard
                        title="RPO / RTO"
                        value={`${query.data.rpo}m / ${query.data.rto}m`}
                    />
                </section>
            )}
        </div>
    )
}

function InfoCard({ title, value }: { title: string; value: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-lg">{value}</CardContent>
        </Card>
    )
}
