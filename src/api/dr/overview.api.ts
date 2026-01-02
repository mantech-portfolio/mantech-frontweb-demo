export type DrOverview = {
  primaryDc: string;
  secondaryDc: string;
  lastDrill: string;
  rpo: number;
  rto: number;
};

export async function fetchDrOverview(): Promise<DrOverview> {
  return Promise.resolve({
    primaryDc: '정상 운영',
    secondaryDc: 'Standby',
    lastDrill: '2025-01-10 (PASS)',
    rpo: 5,
    rto: 30,
  });
}
