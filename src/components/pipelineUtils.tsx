import { PipelineExecutionStatus } from '@aws-sdk/client-codepipeline';
import { StatusType } from '@aws-sdk/client-codebuild';

const getStatusColor = (status: string): string => {
  switch (status) {
    case PipelineExecutionStatus.Failed:
    case StatusType.FAILED:
    case StatusType.FAULT:
      return 'red';
    case PipelineExecutionStatus.InProgress:
    case StatusType.IN_PROGRESS:
      return 'blue';
    case PipelineExecutionStatus.Stopped:
    case StatusType.STOPPED:
      return 'orange';
    case PipelineExecutionStatus.Stopping:
    case StatusType.TIMED_OUT:
      return 'orange';
    case PipelineExecutionStatus.Succeeded:
    case StatusType.SUCCEEDED:
      return 'MediumSpringGreen ';
    case PipelineExecutionStatus.Superseded:
      return 'pink';
    default:
      return 'white';
  }
};

export { getStatusColor };
