import { Badge } from '@/components/ui/badge'

export type StatusType = 'SUCCESS' | 'FAILED' | 'WARNING'

export default function StatusBadge({ status }: { status: StatusType }) {
    const map = {
        SUCCESS: 'bg-green-600',
        FAILED: 'bg-red-600',
        WARNING: 'bg-yellow-500',
    }

    return <Badge className={map[status]}>{status}</Badge>
}
