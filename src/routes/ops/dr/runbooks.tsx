import { createFileRoute } from '@tanstack/react-router'
import PageHeader from '@/components/common/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/ops/dr/runbooks')({
    component: RunbooksPage,
})

function RunbooksPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="DR Runbooks"
                description="재해 발생 시 대응 절차를 정의한 문서 목록입니다."
            />

            <Card>
                <CardHeader>
                    <CardTitle>복구 시나리오</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div>1. Primary DC 장애 감지</div>
                    <div>2. Secondary DC 전환</div>
                    <div>3. 서비스 정상화 검증</div>
                </CardContent>
            </Card>
        </div>
    )
}
