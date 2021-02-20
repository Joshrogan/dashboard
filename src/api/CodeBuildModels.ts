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
}

// logs and phases todo
