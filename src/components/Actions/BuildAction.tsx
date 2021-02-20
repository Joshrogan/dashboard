import React from 'react';
import { useState, useEffect } from 'react';
import { ActionModel, PipelineModel, StageModel } from '../../api/CodePipelineModels';
import { CodeBuildService } from '../../api/CodeBuildService';
import { CodeBuildClientConfig } from '@aws-sdk/client-codebuild';
import { CONFIGURATION } from '../../config';
import { BuildModel } from '../../api/CodeBuildModels';
import BuildListComponent from './Build/BuildListComponent';

type BuildActionProps = {
  action: ActionModel;
  pipeline: PipelineModel;
  stage: StageModel;
};

const BuildAction: React.FC<BuildActionProps> = ({ action, pipeline, stage }: BuildActionProps) => {
  const [config] = useState<CodeBuildClientConfig>(CONFIGURATION);
  const [builds, setBuilds] = useState<BuildModel[]>([]);

  let buildProjectId = action.buildProject!;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const codeBuildClient = new CodeBuildService(config);
      const buildIds = await codeBuildClient.listBuildsForProject(buildProjectId);
      const builds = await codeBuildClient.batchGetBuilds(buildIds);
      setBuilds(builds);
    };
    fetchData();
  }, [config]);

  return (
    <div>
      {builds.map((build) => (
        <BuildListComponent build={build} />
      ))}
    </div>
  );
};

export default BuildAction;
