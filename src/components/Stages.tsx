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

  return (
    <div>
      {stages.map((stage) => (
        <Stage stage={stage} pipeline={pipeline} />
      ))}
    </div>
  );
};

export default Stages;
