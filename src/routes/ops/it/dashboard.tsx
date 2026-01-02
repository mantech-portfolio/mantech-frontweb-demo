import { createFileRoute } from '@tanstack/react-router'
import PageHeader from '@/components/common/PageHeader'
import ErrorState from '@/components/common/ErrorState'
import EmptyState from '@/components/common/EmptyState'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    ComposedChart,
    Area,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'
import {
    useSystemStatusQuery,
    useDeployMetricsQuery,
} from '@/queries/it/useDashboardQuery'

export const Route = createFileRoute('/ops/it/dashboard')({
    component: DashboardPage,
})

function DashboardPage() {
    const statusQuery = useSystemStatusQuery()
    const deployQuery = useDeployMetricsQuery()

    if (statusQuery.isError || deployQuery.isError) {
        return <ErrorState />
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="IT 운영 대시보드"
                description="현재 시스템 상태와 최근 운영 지표를 요약합니다."
            />

            {/* 시스템 상태 */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {statusQuery.isLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-24" />
                    ))
                    : statusQuery.data?.map((s) => (
                        <StatusCard
                            key={s.name}
                            title={s.name}
                            status={s.status}
                        />
                    ))}
            </section>

            {/* 배포 차트 */}
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            최근 배포 추이 (성공 / 실패)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                        {deployQuery.isLoading ? (
                            <Skeleton className="h-full w-full" />
                        ) : !deployQuery.data || deployQuery.data.length === 0 ? (
                            <EmptyState description="배포 데이터가 없습니다." />
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={deployQuery.data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Area
                                        dataKey="success"
                                        stackId="1"
                                        fill="#16a34a"
                                        stroke="#16a34a"
                                        fillOpacity={0.4}
                                    />
                                    <Area
                                        dataKey="fail"
                                        stackId="1"
                                        fill="#dc2626"
                                        stroke="#dc2626"
                                        fillOpacity={0.4}
                                    />
                                    <Line
                                        dataKey="total"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}

function StatusCard({
    title,
    status,
}: {
    title: string
    status: 'UP' | 'DOWN' | 'DEGRADED'
}) {
    const color =
        status === 'UP'
            ? 'bg-green-500'
            : status === 'DOWN'
                ? 'bg-red-500'
                : 'bg-yellow-500'

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center text-base">
                    {title}
                    <span className={`h-3 w-3 rounded-full ${color}`} />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Badge variant="outline">{status}</Badge>
            </CardContent>
        </Card>
    )
}
