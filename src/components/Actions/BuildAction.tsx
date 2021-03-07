import React from 'react';
import { useState, useEffect } from 'react';
import { ActionModel, PipelineModel, StageModel } from '../../api/CodePipelineModels';
import { CodeBuildService } from '../../api/CodeBuildService';
import { CodeBuildClientConfig } from '@aws-sdk/client-codebuild';
import { CloudWatchLogsService } from '../../api/CloudWatchLogsService';
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

  const buildProjectId = action.buildProject!;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const codeBuildClient = new CodeBuildService(config);
      const CloudWatchLogsClient = new CloudWatchLogsService(config);
      const buildIds = await codeBuildClient.listBuildsForProject(buildProjectId);
      let builds: BuildModel[] = await codeBuildClient.batchGetBuilds(buildIds);
      if (builds !== undefined) {
        let buildsWithLogs: BuildModel[] = await Promise.all(
          builds.map(async (build) => {
            return {
              ...build,
              logs: await CloudWatchLogsClient.getLogEvents(build.cloudWatch?.groupName, build.cloudWatch?.streamName)!,
            };
          })
        );

        setBuilds(buildsWithLogs);
      }
    };
    fetchData();
  }, [config, buildProjectId]);

  if (builds.length > 0 && builds !== undefined) {
    return (
      <div>
        {builds.map((build) => (
          <BuildListComponent build={build} action={action} />
        ))}
      </div>
    );
  } else {
    return <div>{'Loading...'}</div>;
  }
};

export default BuildAction;
