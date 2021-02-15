import React from 'react';
import { StageModel, PipelineModel } from '../api/CodePipelineModels';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Action from './Actions/Action';

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

  return (
    <div>
      <Typography variant="h6">
        {'Stage Name: '}
        {stage.stageName}
      </Typography>
      <List>
        {actions.map((action) => (
          <Action action={action} pipeline={pipeline} />
        ))}
      </List>
    </div>
  );
};

export default Stage;
