import React from 'react';
import { useState, useEffect } from 'react';
import { ActionModel, PipelineModel, StageModel } from '../../api/CodePipelineModels';
import { CodeBuildService } from '../../api/CodeBuildService';
import { CodeBuildClientConfig } from '@aws-sdk/client-codebuild';
import { CONFIGURATION } from '../../config';

type BuildActionProps = {
  action: ActionModel;
  pipeline: PipelineModel;
  stage: StageModel;
};

const BuildAction: React.FC<BuildActionProps> = ({ action, pipeline, stage }: BuildActionProps) => {
  const [config] = useState<CodeBuildClientConfig>(CONFIGURATION);

  let builds = action.actionId !== undefined ? [action.actionId] : [];

  console.log('buildaction', action);
  console.log('buildstage', stage);
  console.log('buildpipe', pipeline);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const codeBuildClient = new CodeBuildService(config);
      const currentBuilds = await codeBuildClient.batchGetBuilds(builds);
      console.log('currentBuilds', currentBuilds);
    };
    fetchData();
  }, [config]);

  return <div>{action.category}</div>;
};

export default BuildAction;
