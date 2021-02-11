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

export interface PipelineModel {
    pipelineName:  string,
    stages: StageModel[]
}

