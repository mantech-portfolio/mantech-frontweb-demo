import { useQuery } from '@tanstack/react-query';
import { fetchSystemStatus, fetchDeployMetrics } from '@/api/it/dashboard.api';
import { queryKeys } from '../queryKeys';

export function useSystemStatusQuery() {
  return useQuery({
    queryKey: queryKeys.it.systemStatus,
    queryFn: fetchSystemStatus,
    staleTime: 1000 * 60 * 3,
    retry: 1,
  });
}

export function useDeployMetricsQuery() {
  return useQuery({
    queryKey: queryKeys.it.deployMetrics,
    queryFn: fetchDeployMetrics,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    select: (data) =>
      data.map((d) => ({
        ...d,
        total: d.success + d.fail,
      })),
  });
}
