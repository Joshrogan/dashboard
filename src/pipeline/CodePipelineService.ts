import {CodePipelineClient, ListPipelinesCommand, ListPipelinesCommandOutput, PipelineSummary, CodePipelineClientConfig, GetPipelineCommand, GetPipelineOutput, GetPipelineCommandOutput} from '@aws-sdk/client-codepipeline'
import {PipelineModel} from './CodePipelineModels'
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
      return undefined
    }
  } 

  public async getPipeline(pipelineName: string | undefined): Promise<GetPipelineOutput | undefined> {
    try {
        const results: GetPipelineCommandOutput = await this.client.send(new GetPipelineCommand({name: pipelineName}))

        return results
      
    }
   catch (error) {
    console.log(error)
  }
}
}



/* 
export interface GetPipelineOutput {
    /**
     * <p>Represents the structure of actions and stages to be performed in the pipeline.
     *         </p>
     */
   // pipeline?: PipelineDeclaration;
    /**
     * <p>Represents the pipeline metadata information returned as part of the output of a
     *                 <code>GetPipeline</code> action.</p>
     */
    //metadata?: PipelineMetadata;
//}