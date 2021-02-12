export interface ActionModel {
    actionName: string,
    category: string,
    repo?: string,
    branch?: string,
}

export interface StageModel {
    stageName: string,
    actions: ActionModel[]
}

export interface PipelineExecutionSummaryModel {
    lastUpdateTime: Date,
    sourceRevisions?: string,
    startTime: Date,
    status: string,
    stopTrigger?: string,
     
}

export interface PipelineModel {
    pipelineName:  string,
    created?: Date,
    updated?: Date,
    stages: StageModel[]
}

