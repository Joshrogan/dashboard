import React from 'react';
import { PipelineModel } from '../api/CodePipelineModels';
import Stage from './Stage';

type StagesProps = {
  pipeline: PipelineModel | undefined;
};

const Stages: React.FC<StagesProps> = ({ pipeline }: StagesProps) => {
  console.log('pipeline', pipeline);

  if (pipeline === undefined) {
    return null;
  }

  const stages = pipeline.stages;

  console.log('stages', stages);
  return (
    <div>
      {stages.map((stage) => (
        <Stage stage={stage} />
      ))}
    </div>
  );
};

export default Stages;
