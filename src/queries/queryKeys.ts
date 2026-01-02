export const queryKeys = {
  it: {
    systemStatus: ['ops', 'it', 'systemStatus'] as const,
    deployMetrics: ['ops', 'it', 'deployMetrics'] as const,
    deployHistory: ['ops', 'it', 'deployHistory'] as const,
    batchJobs: ['ops', 'it', 'batchJobs'] as const,
  },
  dr: {
    overview: ['ops', 'dr', 'overview'] as const,
  },
};
