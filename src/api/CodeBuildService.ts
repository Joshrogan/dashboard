import {
  BatchGetBuildsCommand,
  CodeBuildClient,
  CodeBuildClientConfig,
  BatchGetBuildsCommandOutput,
  ListBuildsForProjectCommand,
  ListBuildsForProjectCommandOutput,
} from '@aws-sdk/client-codebuild';
import { BuildModel } from './CodeBuildModels';

export class CodeBuildService {
  private client: CodeBuildClient;

  constructor(configuration: CodeBuildClientConfig) {
    this.client = new CodeBuildClient(configuration);
  }

  public async batchGetBuilds(builds: string[]): Promise<any> {
    try {
      const results: BatchGetBuildsCommandOutput = await this.client.send(new BatchGetBuildsCommand({ ids: builds }));

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
          } as BuildModel;
        });

        return builds;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async listBuildsForProject(projectName: string): Promise<any> {
    console.log('proj name', projectName);
    try {
      console.log('proj name inside try', projectName);
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
