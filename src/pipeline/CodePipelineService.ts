import {CodePipelineClient, ListPipelinesCommand, ListPipelinesCommandOutput, CodePipelineClientConfig, GetPipelineCommand, GetPipelineOutput, GetPipelineCommandOutput} from '@aws-sdk/client-codepipeline'
import {PipelineModel, ActionModel, StageModel} from './CodePipelineModels'
export class CodePipelineService {
  private client: CodePipelineClient;

  constructor(configuration: CodePipelineClientConfig) {
    this.client = new CodePipelineClient(configuration)
  }

  public async listPipelines():  Promise<PipelineModel[] | undefined> {
    try {
      const results: ListPipelinesCommandOutput = await this.client.send(new ListPipelinesCommand({}))
      if (results.pipelines !== undefined) {
        const pipelineList: PipelineModel[] =  results.pipelines.map(pipeline  => ({
          name: pipeline.name as string,
          updated: pipeline.updated as Date,
          created: pipeline.created as Date,
          stages: []
        } ))
        return pipelineList
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