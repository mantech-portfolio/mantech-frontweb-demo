import { createFileRoute } from '@tanstack/react-router'
import PageHeader from '@/components/common/PageHeader'
import LabelValueRow from '@/components/common/LabelValueRow'
import QueryBoundary from '@/components/common/QueryBoundary'
import { Skeleton } from '@/components/ui/skeleton'
import StatusBadge from '@/components/common/StatusBadge'
import EmptyState from '@/components/common/EmptyState'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBatchJobsQuery } from '@/queries/it/useBatchQuery'

export const Route = createFileRoute('/ops/it/batch')({
  component: BatchPage,
})

function BatchPage() {
  const query = useBatchJobsQuery()

  return (
    <div className="space-y-6">
      <PageHeader
        title="배치 작업 관리"
        description="배치 작업 상태 및 실행 정보를 확인합니다."
      />

      <QueryBoundary
        query={query}
        isEmpty={(jobs) => jobs.length === 0}
        empty={<EmptyState description="등록된 배치가 없습니다." />}
        loading={
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        }
      >
        {(jobs) => (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.name}>
                <CardHeader>
                  <CardTitle className="text-base">{job.name}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <LabelValueRow label="실행 주기" value={job.cron} />
                  <LabelValueRow label="최근 실행" value={job.lastRun} />
                  <LabelValueRow label="평균 소요" value={job.avgDuration} />
                  <div className="pt-1">
                    <StatusBadge status={job.status} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </QueryBoundary>
    </div>
  )
}
