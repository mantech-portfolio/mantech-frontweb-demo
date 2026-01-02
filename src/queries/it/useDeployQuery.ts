import { useQuery } from '@tanstack/react-query';
import { fetchDeployHistory } from '@/api/it/deploy.api';
import { queryKeys } from '../queryKeys';

export function useDeployHistoryQuery() {
  return useQuery({
    queryKey: queryKeys.it.deployHistory,
    queryFn: fetchDeployHistory,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}
