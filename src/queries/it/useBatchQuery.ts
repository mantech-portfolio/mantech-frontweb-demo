import { useQuery } from '@tanstack/react-query';
import { fetchBatchJobs } from '@/api/it/batch.api';
import { queryKeys } from '../queryKeys';

export function useBatchJobsQuery() {
  return useQuery({
    queryKey: queryKeys.it.batchJobs,
    queryFn: fetchBatchJobs,
    staleTime: 1000 * 60 * 10,
    retry: 0,
  });
}
