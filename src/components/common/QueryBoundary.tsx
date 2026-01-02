import type { UseQueryResult } from '@tanstack/react-query'
import ErrorState from '@/components/common/ErrorState'
import EmptyState from '@/components/common/EmptyState'
import { Skeleton } from '@/components/ui/skeleton'

type QueryBoundaryProps<TData> = {
    query: UseQueryResult<TData, unknown>
    children: (data: TData) => React.ReactNode

    // 선택 옵션들
    loading?: React.ReactNode
    error?: React.ReactNode
    empty?: React.ReactNode
    isEmpty?: (data: TData) => boolean
}

export default function QueryBoundary<TData>({
    query,
    children,
    loading,
    error,
    empty,
    isEmpty,
}: QueryBoundaryProps<TData>) {
    if (query.isLoading) {
        return loading ?? <Skeleton className="h-24 w-full" />
    }

    if (query.isError) {
        return error ?? <ErrorState />
    }

    if (query.data == null) {
        return empty ?? <EmptyState />
    }

    if (isEmpty?.(query.data)) {
        return empty ?? <EmptyState />
    }

    return <>{children(query.data)}</>
}
