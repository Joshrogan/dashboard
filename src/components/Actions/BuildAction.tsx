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

  let buildProjectId = action.buildProject!;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const codeBuildClient = new CodeBuildService(config);
      const buildIds = await codeBuildClient.listBuildsForProject(buildProjectId);
      console.log('buildIds', buildIds);
    };
    fetchData();
  }, [config]);

  return <div>{action.category}</div>;
};

export default BuildAction;
