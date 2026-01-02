export type DeployItem = {
  id: number;
  time: string;
  service: string;
  version: string;
  env: 'prod' | 'staging';
  operator: string;
  status: 'SUCCESS' | 'FAILED';
  reason?: string;
};

export async function fetchDeployHistory(): Promise<DeployItem[]> {
  return Promise.resolve([
    {
      id: 1,
      time: '2025-01-04 10:21',
      service: 'gateway',
      version: 'v2.1.0',
      env: 'prod',
      operator: 'ops-admin',
      status: 'SUCCESS',
    },
    {
      id: 2,
      time: '2025-01-03 22:10',
      service: 'product-service',
      version: 'v1.4.2',
      env: 'prod',
      operator: 'deploy-bot',
      status: 'FAILED',
      reason: 'Health check timeout',
    },
  ]);
}
