import React from 'react';
import { PipelineModel } from '../api/CodePipelineModels';
import Stage from './Stage';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { green, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { CodePipelineService } from '../api/CodePipelineService';

type StagesProps = {
  pipeline: PipelineModel | undefined;
  pipelineClient: CodePipelineService;
};

const Stages: React.FC<StagesProps> = ({ pipeline, pipelineClient }: StagesProps) => {
  if (pipeline === undefined || pipelineClient === undefined) {
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
        justifyContent: 'space-between',
      }}
    >
      <span>
        {pipeline.pipelineName}&nbsp;{`Overall Status: ${pipeline.status} `}
        {icon}
      </span>{' '}
      <Button
        size="small"
        color="primary"
        variant="outlined"
        onClick={() => pipelineClient.startPipelineExecution(pipeline.pipelineName)}
      >
        Restart This Pipeline
      </Button>
    </div>
  );

  return (
    <div>
      {header}

      {stages.map((stage) => (
        <Stage key={stage.stageName} stage={stage} pipeline={pipeline} pipelineClient={pipelineClient} />
      ))}
    </div>
  );
};

export default Stages;
