import React from 'react';
import { ActionModel, PipelineModel } from '../../api/CodePipelineModels';

type SourceActionProps = {
  action: ActionModel | undefined;
  pipeline: PipelineModel;
};

const SourceAction: React.FC<SourceActionProps> = ({ action, pipeline }: SourceActionProps) => {
  console.log('SOURCE_ACTION## PIPELINE NAME', pipeline);

  return <div>{pipeline.pipelineName}</div>;
};

export default SourceAction;
