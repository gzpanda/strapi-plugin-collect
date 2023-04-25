export type Source = {
  id: number;
  kind: string;
  name: string;
  url: string;
  content: string;
  class: boolean;
  publishedAt: string | null;
};

export type CronJob = {
  id: number;
  name: string;
  schedule: string;
  command: string;
  iterationsLimit: number;
  iterationsCount: number;
  startDate: string | null;
  endDate: string | null;
  latestExecutionLog: string | null;
  publishedAt: string | null;
};

export type CronJobInputData = Pick<
  CronJob,
  'name' | 'schedule' | 'command' | 'iterationsLimit' | 'startDate' | 'endDate'
>;
