export interface ActionModel {
    name: string,
    category: string,
    repo?: string,
    branch?: string,
    actionArn: string,
}

export interface StageModel {
    name: string,
    actions: ActionModel[]
}

export interface PipelineModel {
    name:  string,
    updated:  Date,
    created:  Date,
    pipelineArn: string,
    stages: StageModel[]
}

