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
import { green, red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import { CodePipelineService } from '../api/CodePipelineService';

type StageProps = {
  stage: StageModel;
  pipeline: PipelineModel;
  pipelineClient: CodePipelineService;
};

const Stage: React.FC<StageProps> = ({ stage, pipeline, pipelineClient }: StageProps) => {
  if (stage === undefined || pipeline === undefined || stage.actions === undefined) {
    return null;
  }

  const actions = stage.actions;

  let stageName = `Stage: ${stage.stageName}`;

  let icon =
    stage.status === 'Succeeded' ? (
      <CheckIcon style={{ color: green[500] }} />
    ) : (
      <>
        <ErrorOutlineIcon style={{ color: red[500] }} />
        &nbsp;
        <Button
          color="secondary"
          variant="outlined"
          onClick={() =>
            pipelineClient.retryStageExecution(pipeline.pipelineName, stage.stageName, pipeline.pipelineExecutionId!)
          }
        >
          Retry stage
        </Button>
      </>
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
              <Action action={action} pipeline={pipeline} key={action.actionName} stage={stage} />
            ))}
          </List>
        </TreeItem>
      </TreeView>
    </div>
  );
};

export default Stage;
