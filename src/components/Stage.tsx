import React from 'react';
import { StageModel } from '../api/CodePipelineModels';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Action from './Actions/Action';

type StageProps = {
  stage: StageModel;
};

const Stage: React.FC<StageProps> = ({ stage }: StageProps) => {
  console.log('stage', stage);

  if (stage === undefined) {
    return null;
  }

  const actions = stage.actions;

  console.log('actions', actions);

  return (
    <div>
      <Typography variant="h6">
        {'Stage Name: '}
        {stage.stageName}
      </Typography>
      <List>
        {actions.map((action) => (
          <Action action={action} />
        ))}
      </List>
    </div>
  );
};

export default Stage;
