import React from 'react';
import { StageModel, PipelineModel } from '../api/CodePipelineModels';
import List from '@material-ui/core/List';
import Action from './Actions/Action';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeItem } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import { green, red, blue } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import { CodePipelineService } from '../api/CodePipelineService';
import { PipelineExecutionStatus } from '@aws-sdk/client-codepipeline';
import { StatusType } from '@aws-sdk/client-codebuild';
type StageProps = {
  stage: StageModel;
  pipeline: PipelineModel;
  pipelineClient: CodePipelineService;
};

const getStageLabel = (
  status: string,
  pipelineName: string,
  stageName: string,
  pipelineExecutionId: string,
  pipelineClient: CodePipelineService
): any => {
  let retry = (
    <Button
      color="secondary"
      variant="outlined"
      onClick={() => pipelineClient.retryStageExecution(pipelineName, stageName, pipelineExecutionId!)}
    >
      Retry stage
    </Button>
  );

  switch (status) {
    case PipelineExecutionStatus.Failed:
    case StatusType.FAILED:
    case StatusType.FAULT:
    case PipelineExecutionStatus.Stopped:
    case StatusType.STOPPED:
    case PipelineExecutionStatus.Stopping:
    case StatusType.TIMED_OUT:
    case PipelineExecutionStatus.Superseded:
      return (
        <>
          <ErrorOutlineIcon style={{ color: red[500] }} />
          &nbsp;
          {retry}
        </>
      );
    case PipelineExecutionStatus.InProgress:
    case StatusType.IN_PROGRESS:
      return <BlurCircularIcon style={{ color: blue[500] }} />;
    case PipelineExecutionStatus.Succeeded:
    case StatusType.SUCCEEDED:
      return <CheckIcon style={{ color: green[500] }} />;
    default:
      return null;
  }
};

const Stage: React.FC<StageProps> = ({ stage, pipeline, pipelineClient }: StageProps) => {
  if (
    stage === undefined ||
    pipeline === undefined ||
    stage.actions === undefined ||
    stage.status === undefined ||
    pipeline.pipelineExecutionId === undefined
  ) {
    return null;
  }

  const actions = stage.actions;

  let stageName = `Stage: ${stage.stageName}`;

  let icon = getStageLabel(
    stage.status,
    pipeline.pipelineName,
    stage.stageName,
    pipeline.pipelineExecutionId,
    pipelineClient
  );

  let stageLabel = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {stageName}
      <span>
        &nbsp;{`Status: ${stage.status}`}
        {icon}
      </span>
    </div>
  );

  return (
    <div>
      <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
        <TreeItem nodeId={stage.stageName} label={stageLabel}>
          <List key={stage.stageName}>
            {actions.map((action) => (
              <Action
                action={action}
                pipeline={pipeline}
                key={action.actionName}
                stage={stage}
                pipelineClient={pipelineClient}
              />
            ))}
          </List>
        </TreeItem>
      </TreeView>
    </div>
  );
};

export default Stage;
