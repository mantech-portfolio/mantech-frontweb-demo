import { createFileRoute, Link } from '@tanstack/react-router'
import PageHeader from '@/components/common/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Activity,
  Database,
  ShieldAlert,
  ServerCog,
  Workflow,
  ClipboardCheck,
  Rocket,
  Layers,
  TestTube2,
  Wrench,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Mantech Ops Console (Portfolio)"
        description="운영자 관점 UX + 서버 상태 관리(TanStack Query) + 모듈화된 프론트 아키텍처를 한 프로젝트에서 보여주는 운영 콘솔 샘플입니다."
      />

      {/* 핵심 어필 포인트 */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <HighlightCard
          icon={<Layers className="h-5 w-5" />}
          title="아키텍처 분리 (api / queries / routes)"
          description="API 소스(mock/real)와 서버 상태(Query), 화면(routes)을 분리해 변경 비용을 최소화했습니다."
          badges={['api', 'queries', 'routes']}
        />
        <HighlightCard
          icon={<Activity className="h-5 w-5" />}
          title="서버 상태 관리: TanStack Query"
          description="staleTime / retry / select / 캐싱 전략을 적용하고, Loading·Error·Empty UI를 표준화했습니다."
          badges={['React Query', 'Cache', 'UX']}
        />
        <HighlightCard
          icon={<Rocket className="h-5 w-5" />}
          title="운영자 관점 UX 패턴"
          description="상태 배지, 차트 지표, 테이블 기반 이력 조회, 스켈레톤 로딩으로 ‘운영 콘솔’스러운 상호작용을 구성했습니다."
          badges={['Badge', 'Chart', 'Table']}
        />
        <HighlightCard
          icon={<ShieldAlert className="h-5 w-5" />}
          title="DR 시나리오 맥락 반영"
          description="RPO/RTO 같은 핵심 지표를 시각화하고, Overview/Runbook/Drill 흐름으로 운영 스토리를 잡았습니다."
          badges={['RPO', 'RTO', 'DR']}
        />
        <HighlightCard
          icon={<Wrench className="h-5 w-5" />}
          title="컴포넌트 표준화"
          description="PageHeader, StatusBadge, Error/Empty 상태 컴포넌트를 공통화해 페이지별 구현 편차를 줄였습니다."
          badges={['PageHeader', 'Common UI']}
        />
        <HighlightCard
          icon={<TestTube2 className="h-5 w-5" />}
          title="테스트/확장 고려"
          description="Vitest 기반 테스트 스크립트를 포함하고, 이후 실제 API 연결 시 queryFn만 교체하도록 설계했습니다."
          badges={['Vitest', 'Scalable']}
        />
      </section>

      <Separator />

      {/* 바로가기 */}
      <section className="space-y-3">
        <h2 className="text-base md:text-lg font-semibold">주요 페이지 바로가기</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <NavCard
            to="/ops/it/dashboard"
            icon={<ServerCog className="h-5 w-5" />}
            title="IT Dashboard"
            description="시스템 상태 + 배포 지표 차트(스켈레톤/에러/빈상태 포함)"
          />
          <NavCard
            to="/ops/it/deploy"
            icon={<Rocket className="h-5 w-5" />}
            title="Deploy"
            description="배포 이력 조회 + 상태 배지 + 운영자 관점 이력 UX"
          />
          <NavCard
            to="/ops/it/batch"
            icon={<Database className="h-5 w-5" />}
            title="Batch"
            description="배치 작업 목록 + 마지막 실행/평균 소요 + 실패/성공 상태"
          />
          <NavCard
            to="/ops/it/workflows"
            icon={<Workflow className="h-5 w-5" />}
            title="Workflows"
            description="운영 Workflow 가시화(자동화 관점의 흐름/상태 구성)"
          />
          <NavCard
            to="/ops/it/checks"
            icon={<ClipboardCheck className="h-5 w-5" />}
            title="Daily Checks"
            description="일일 점검 체크리스트(운영 관점의 점검/승인 흐름)"
          />
          <NavCard
            to="/ops/dr/overview"
            icon={<ShieldAlert className="h-5 w-5" />}
            title="DR Overview"
            description="DR 시나리오 상태 + RPO/RTO 지표 요약"
          />
          <NavCard
            to="/ops/dr/runbooks"
            icon={<ShieldAlert className="h-5 w-5" />}
            title="Runbooks"
            description="DR Runbook(절차/체크포인트 기반 운영 문서 UI)"
          />
          <NavCard
            to="/ops/dr/drills"
            icon={<ShieldAlert className="h-5 w-5" />}
            title="DR Drills"
            description="DR 훈련 이력(훈련 결과/리스크/개선 포인트)"
          />
        </div>
      </section>

      <Separator />
    </div>
  )
}

function HighlightCard({
  icon,
  title,
  description,
  badges,
}: {
  icon: React.ReactNode
  title: string
  description: string
  badges: string[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {badges.map((b) => (
            <Badge key={b} variant="secondary">
              {b}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function NavCard({
  to,
  icon,
  title,
  description,
}: {
  to: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Link to={to}>
      <Card className="transition hover:bg-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {description}
        </CardContent>
      </Card>
    </Link>
  )
}
