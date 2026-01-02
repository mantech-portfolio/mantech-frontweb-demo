import { useQuery } from '@tanstack/react-query';
import { fetchDrOverview } from '@/api/dr/overview.api';
import { queryKeys } from '../queryKeys';

export function useDrOverviewQuery() {
  return useQuery({
    queryKey: queryKeys.dr.overview,
    queryFn: fetchDrOverview,
    staleTime: 1000 * 60 * 15,
    retry: 0,
  });
}
