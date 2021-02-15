import React from 'react';
import { StageModel, PipelineModel } from '../api/CodePipelineModels';
import List from '@material-ui/core/List';
import Action from './Actions/Action';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeItem } from '@material-ui/lab';

type StageProps = {
  stage: StageModel;
  pipeline: PipelineModel;
};

const Stage: React.FC<StageProps> = ({ stage, pipeline }: StageProps) => {
  if (stage === undefined || pipeline === undefined) {
    return null;
  }

  console.log('stage - pipeline', pipeline);

  const actions = stage.actions;

  let stageName = `Stage: ${stage.stageName}`;

  return (
    <div>
      <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
        <TreeItem nodeId={stage.stageName} label={stageName}>
          <List key={stage.stageName}>
            {actions.map((action) => (
              <Action action={action} pipeline={pipeline} key={action.actionName} />
            ))}
          </List>
        </TreeItem>
      </TreeView>
    </div>
  );
};

export default Stage;
