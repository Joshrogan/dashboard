export interface ActionModel {
  actionName: string;
  category: string;
  actionId?: string;
  repo?: string;
  branch?: string;
  status?: string;
  buildProject?: string;
}

export interface StageModel {
  stageName: string;
  status?: string;
  actions: ActionModel[];
}

export interface SourceRevisionModel {
  actionName: string | undefined;
  revisionSummary?: string;
  revisionUrl?: string;
  revisionId?: string;
}

export interface PipelineExecutionSummaryModel {
  lastUpdateTime: Date;
  sourceRevisions?: SourceRevisionModel[];
  startTime: Date;
  status: string;
  stopTrigger?: string;
}

export interface PipelineModel {
  pipelineName: string;
  created?: Date;
  updated?: Date;
  status?: string;
  pipelineExecutionId?: string;
  pipelineExecutionSummary?: PipelineExecutionSummaryModel[];
  stages: StageModel[];
}
