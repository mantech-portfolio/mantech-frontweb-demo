export type BatchJob = {
  name: string;
  cron: string;
  avgDuration: string;
  lastRun: string;
  status: 'SUCCESS' | 'FAILED';
};

export async function fetchBatchJobs(): Promise<BatchJob[]> {
  return Promise.resolve([
    {
      name: '정산 배치',
      cron: '0 2 * * *',
      avgDuration: '3m 20s',
      lastRun: '2025-01-04 02:00',
      status: 'SUCCESS',
    },
    {
      name: '로그 정리 배치',
      cron: '0 1 * * *',
      avgDuration: '1m 10s',
      lastRun: '2025-01-04 01:00',
      status: 'FAILED',
    },
  ]);
}
