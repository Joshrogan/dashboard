import React from 'react';
import { PipelineModel } from '../api/CodePipelineModels';
import Stage from './Stage';

type StagesProps = {
  pipeline: PipelineModel | undefined;
};

const Stages: React.FC<StagesProps> = ({ pipeline }: StagesProps) => {
  if (pipeline === undefined) {
    return null;
  }

  const stages = pipeline.stages;

  let header = pipeline.pipelineName + ' Status: ' + pipeline.status;

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
