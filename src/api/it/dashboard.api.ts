export type SystemStatus = {
  name: string;
  status: 'UP' | 'DOWN' | 'DEGRADED';
};

export type DeployMetric = {
  date: string;
  success: number;
  fail: number;
};

/**
 * GET /api/ops/it/dashboard/system-status
 */
export async function fetchSystemStatus(): Promise<SystemStatus[]> {
  return Promise.resolve([
    { name: 'API Gateway', status: 'UP' },
    { name: 'Batch Server', status: 'UP' },
    { name: 'DB Cluster', status: 'DEGRADED' },
  ]);
}

/**
 * GET /api/ops/it/dashboard/deploy-metrics
 */
export async function fetchDeployMetrics(): Promise<DeployMetric[]> {
  return Promise.resolve([
    { date: '01-01', success: 2, fail: 0 },
    { date: '01-02', success: 1, fail: 1 },
    { date: '01-03', success: 3, fail: 0 },
    { date: '01-04', success: 2, fail: 0 },
    { date: '01-05', success: 2, fail: 0 },
    { date: '01-06', success: 5, fail: 1 },
    { date: '01-07', success: 2, fail: 0 },
    { date: '01-08', success: 2, fail: 0 },
  ]);
}
