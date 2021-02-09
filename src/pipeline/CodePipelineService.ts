import {CodePipelineClient, ListPipelinesCommand, ListPipelinesCommandOutput, PipelineSummary, CodePipelineClientConfig} from '@aws-sdk/client-codepipeline'

export class CodePipelineService {
  private client: CodePipelineClient;

  constructor(configuration: CodePipelineClientConfig) {
    this.client = new CodePipelineClient(configuration)
  }

  public async listPipelines():  Promise<PipelineSummary[] | undefined> {
    try {
      const results: ListPipelinesCommandOutput = await this.client.send(new ListPipelinesCommand({}))
      if (results.pipelines !== undefined) {
        let transformed =  results.pipelines.map(pipeline  => ({
          name: pipeline.name as string,
          version: pipeline.version as number,
          updated: pipeline.updated as Date,
          created: pipeline.created as Date,
        } as PipelineSummary))
        return transformed
      }
    } catch (error) {
      const { requestId, cfId, extendedRequestId } = error.$metadata;
      console.error(error)
      console.log({ requestId, cfId, extendedRequestId });
    }
  } 
}


