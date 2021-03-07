import { PipelineExecutionStatus } from '@aws-sdk/client-codepipeline';
import { StatusType } from '@aws-sdk/client-codebuild';
import { CONFIGURATION } from '../config';

const getStatusColor = (status: string): string => {
  switch (status) {
    case PipelineExecutionStatus.Failed:
    case StatusType.FAILED:
    case StatusType.FAULT:
      return 'red';
    case PipelineExecutionStatus.InProgress:
    case StatusType.IN_PROGRESS:
      return 'DodgerBlue';
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

const getS3Link = (bucket: string): string => {
  let bucketSplit = bucket.split('arn:aws:s3:::')[1];

  let lastIndexSlash = bucketSplit.lastIndexOf('/');

  let bucketName = bucketSplit.substr(0, lastIndexSlash);

  let prefixSearch = bucketSplit.substr(lastIndexSlash + 1);

  return `https://${CONFIGURATION.region}.console.aws.amazon.com/s3/buckets/${bucketName}/?region=${CONFIGURATION.region}&tab=overview$prefixSearch=${prefixSearch}`;
};

export { getStatusColor, getS3Link };
