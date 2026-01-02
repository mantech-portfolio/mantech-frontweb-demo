import { createFileRoute } from '@tanstack/react-router'
import PageHeader from '@/components/common/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/ops/dr/drills')({
    component: DrillsPage,
})

type DrillItem = {
    date: string
    title: string
    result: 'PASS' | 'FAIL' | 'WARN'
    note: string
}

function DrillsPage() {
    // (Mock) 실제 API가 붙으면 api/queries 계층으로 이동
    const drills: DrillItem[] = [
        {
            date: '2025-01-10',
            title: '전체 전환 훈련 (Primary → Secondary)',
            result: 'PASS',
            note: 'RTO 28m 달성 / 주요 서비스 정상화 확인',
        },
        {
            date: '2024-12-01',
            title: '부분 복구 훈련 (DB Read Replica)',
            result: 'PASS',
            note: '읽기 트래픽 전환 안정 / 알림 룰 보강 필요',
        },
        {
            date: '2024-11-12',
            title: '네트워크 장애 시나리오 점검',
            result: 'WARN',
            note: '헬스체크 간격 조정 필요 / Runbook 보완',
        },
    ]

    return (
        <div className="space-y-6">
            <PageHeader
                title="DR 훈련 이력"
                description="재해복구(DR) 훈련 결과를 운영 관점에서 기록·리뷰합니다."
            />

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SummaryCard title="최근 30일 Drill" value="2회" />
                <SummaryCard title="PASS" value="2" badge="PASS" />
                <SummaryCard title="개선 필요" value="1" badge="WARN" />
            </section>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">최근 Drill 목록</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                    {drills.map((d) => (
                        <div
                            key={`${d.date}-${d.title}`}
                            className="flex flex-col gap-1 rounded-lg border p-3 md:flex-row md:items-center md:justify-between"
                        >
                            <div className="min-w-0">
                                <div className="text-sm text-muted-foreground">{d.date}</div>
                                <div className="font-medium truncate">{d.title}</div>
                                <div className="text-sm text-muted-foreground">{d.note}</div>
                            </div>

                            <div className="mt-2 md:mt-0">
                                <ResultBadge result={d.result} />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

function SummaryCard({
    title,
    value,
    badge,
}: {
    title: string
    value: string
    badge?: 'PASS' | 'FAIL' | 'WARN'
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                    {title}
                    {badge ? <ResultBadge result={badge} /> : null}
                </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">{value}</CardContent>
        </Card>
    )
}

function ResultBadge({ result }: { result: 'PASS' | 'FAIL' | 'WARN' }) {
    const klass =
        result === 'PASS'
            ? 'bg-green-600'
            : result === 'FAIL'
                ? 'bg-red-600'
                : 'bg-yellow-500'

    return <Badge className={klass}>{result}</Badge>
}
