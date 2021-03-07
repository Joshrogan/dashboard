import {
  BatchGetBuildsCommand,
  CodeBuildClient,
  CodeBuildClientConfig,
  BatchGetBuildsCommandOutput,
  ListBuildsForProjectCommand,
  ListBuildsForProjectCommandOutput,
} from '@aws-sdk/client-codebuild';
import { BuildModel, PhaseModel } from './CodeBuildModels';

export class CodeBuildService {
  private client: CodeBuildClient;

  constructor(configuration: CodeBuildClientConfig) {
    this.client = new CodeBuildClient(configuration);
  }

  public async batchGetBuilds(builds: string[]): Promise<any> {
    try {
      const results: BatchGetBuildsCommandOutput = await this.client.send(new BatchGetBuildsCommand({ ids: builds }));

      console.log('buildResults', results);
      if (results.builds !== undefined) {
        const builds: BuildModel[] = results.builds.map((build) => {
          let totalDuration: any = build.endTime!.valueOf() - build.startTime!.valueOf();
          return {
            buildRun: build.id!,
            buildStatus: build.buildStatus!,
            buildNumber: build.buildNumber!,
            sourceVersion: build.sourceVersion!,
            duration: totalDuration!,
            completed: build.buildComplete!,
            endTime: build.endTime!,
            phases: build.phases!.map((phase) => {
              let contextMessage = '';
              let contextStatus = '';
              if (phase.contexts) {
                if (phase.contexts[0].message !== undefined && phase.contexts[0].statusCode !== undefined) {
                  contextMessage = phase.contexts![0].message!;
                  contextStatus = phase.contexts![0].statusCode!;
                }
              }
              return {
                contextMessage: contextMessage,
                contextStatusCode: contextStatus,
                phaseStatus: phase.phaseStatus,
                phaseType: phase.phaseType,
                durationinSeconds: phase.durationInSeconds,
                startTime: phase.startTime,
                endTime: phase.endTime,
              } as PhaseModel;
            }),
            cloudWatch: {
              cloudWatchLogsArn: build.logs?.cloudWatchLogsArn!,
              deepLink: build.logs?.deepLink!,
              groupName: build.logs?.groupName!,
              streamName: build.logs?.streamName!,
            },
          };
        });

        console.log('builds', builds);
        return builds;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async listBuildsForProject(projectName: string): Promise<any> {
    try {
      const results: ListBuildsForProjectCommandOutput = await this.client.send(
        new ListBuildsForProjectCommand({ projectName })
      );

      let ids = await results.ids;
      return ids;
    } catch (error) {
      console.error(error);
    }
  }
}

// listBuildsForProject needed
// ListProjects needed
