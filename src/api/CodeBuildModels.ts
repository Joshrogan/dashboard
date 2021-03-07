export interface LogModel {
  message: string;
  timestamp: string;
}

export interface CloudWatchModel {
  cloudWatchLogsArn: string;
  deepLink: string;
  groupName: string;
  streamName: string;
}

export interface PhaseModel {
  contextMessage?: string;
  contextStatusCode?: string;
  phaseStatus: string;
  phaseType: string;
  durationinSeconds: number;
  startTime: Date;
  endTime: Date;
}

export interface BuildModel {
  buildRun: string;
  buildStatus: string;
  buildNumber: number;
  sourceVersion: string;
  duration: number;
  completed: boolean;
  phases: PhaseModel[];
  cloudWatch?: CloudWatchModel;
  logs?: LogModel[];
  endTime: Date;
}

// logs and phases todo
