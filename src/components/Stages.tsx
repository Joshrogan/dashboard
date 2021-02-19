import React from 'react';
import { PipelineModel } from '../api/CodePipelineModels';
import Stage from './Stage';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { green, red } from '@material-ui/core/colors';

type StagesProps = {
  pipeline: PipelineModel | undefined;
};

const Stages: React.FC<StagesProps> = ({ pipeline }: StagesProps) => {
  if (pipeline === undefined) {
    return null;
  }

  const stages = pipeline.stages;

  let icon =
    pipeline.status === 'Succeeded' ? (
      <CheckIcon style={{ color: green[500] }} />
    ) : (
      <ErrorOutlineIcon style={{ color: red[500] }} />
    );

  let header = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <span>
        {pipeline.pipelineName}&nbsp;{'Overall Status: '}
      </span>{' '}
      {icon}
    </div>
  );

  return (
    <div>
      {header}

      {stages.map((stage) => (
        <Stage key={stage.stageName} stage={stage} pipeline={pipeline} />
      ))}
    </div>
  );
};

export default Stages;
