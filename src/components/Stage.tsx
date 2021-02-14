import React from 'react';
import { PipelineModel } from '../api/CodePipelineModels';

type StageProps = {
  stage: PipelineModel | undefined;
};

const Stage: React.FC<StageProps> = ({ stage }: StageProps) => {
  console.log('stage', stage);
  return <div>Hello World {stage?.pipelineName}</div>;
};

export default Stage;
