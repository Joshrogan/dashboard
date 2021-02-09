export interface ActionModel {
    name: string,
    category: string,
    repo?: string,
    branch?: string,
}

export interface StageModel {
    name: string,
    actions: ActionModel[]
}

export interface PipelineModel {
    name:  string,
    updated:  Date,
    created:  Date,
    stages: StageModel[]
}

