import {PipelineExecutionStatus} from '@aws-sdk/client-codepipeline'
import {PipelineModel} from '../api/CodePipelineModels'


const getStatusColor = (pipeline: PipelineModel | null): string => {

    let status: any = null;

    if (pipeline?.pipelineExecutionSummary !== undefined) {
        status = pipeline?.pipelineExecutionSummary[0].status
    }

    switch (status) {
        case PipelineExecutionStatus.Failed: return 'red';
        case PipelineExecutionStatus.InProgress: return 'blue';
        case PipelineExecutionStatus.Stopped: return 'orange';
        case PipelineExecutionStatus.Stopping: return 'orange';
        case PipelineExecutionStatus.Succeeded: return 'MediumSpringGreen ';
        case PipelineExecutionStatus.Superseded: return 'pink';
        default: return 'white'
    }
}

export {getStatusColor}