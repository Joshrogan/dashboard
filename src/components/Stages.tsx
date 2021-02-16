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

  let stagesTemp = stages[0].stageName;

  console.log(typeof stages);

  return (
    <div>
      {stagesTemp}
      {stages.map((stage) => (
        <Stage key={stage.stageName} stage={stage} pipeline={pipeline} />
      ))}
    </div>
  );
};

export default Stages;
