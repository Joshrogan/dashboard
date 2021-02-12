import {CodePipelineClient,
ListPipelinesCommand,
ListPipelinesCommandOutput,
CodePipelineClientConfig, 
GetPipelineCommand,
GetPipelineCommandOutput,
PipelineDeclaration,
StageDeclaration,
ListPipelineExecutionsCommand,
ListPipelineExecutionsOutput,
PipelineExecutionSummary} from '@aws-sdk/client-codepipeline'
import {PipelineModel, PipelineExecutionSummaryModel} from './CodePipelineModels'


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
          pipelineName: pipeline.name as string,
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

  public async getPipelineInfo(pipelineName: string): Promise<PipelineModel | undefined> {
    try {
        const results: GetPipelineCommandOutput = await this.client.send(new GetPipelineCommand({name: pipelineName}))

        const pipelineResult: PipelineDeclaration = results.pipeline as PipelineDeclaration
        const stageResult: StageDeclaration[] = results.pipeline!.stages! as StageDeclaration[]


        const pipelineExecution = await this.getPipelineExecutionInfo(pipelineName)

        if (pipelineResult && stageResult) {

  
        const pipeline: PipelineModel = {
          pipelineName: pipelineResult.name!,
          updated: results.metadata?.updated,
          pipelineExecutionSummary: pipelineExecution,
          stages: stageResult.map((stage) => {
            return {
            stageName: stage.name!,
            actions: stage.actions!.map((action) => {
              return {
                actionName: action.name!,
                category: action.actionTypeId?.category!,
                repo: action.configuration?.RepositoryName,
                branch: action.configuration?.BranchName
              }
            })
            }
          })
        }

        return pipeline
      }
      
    }
   catch (error) {
    console.log(error)
  }
}


private async getPipelineExecutionInfo(pipelineName: string): Promise<(PipelineExecutionSummaryModel[] | undefined)> {
  try {
      const results: ListPipelineExecutionsOutput = await this.client.send(new ListPipelineExecutionsCommand({pipelineName}))

      const pipelineExecutionSummaries = results.pipelineExecutionSummaries
      if (pipelineExecutionSummaries !== undefined) {

        const executionInfo: PipelineExecutionSummaryModel[]  = pipelineExecutionSummaries.map((info: PipelineExecutionSummary) => {
          return {
            lastUpdateTime: info.lastUpdateTime!,
            startTime: info.startTime!,
            status: info.status!,
            sourceRevisions: info.sourceRevisions?.map((revision) =>  {
              return {
                actionName: revision.actionName,
                revisionSummary: revision.revisionSummary,
                revisionUrl: revision.revisionUrl
              }
            })
          }
        })
        return executionInfo
      }
      // const pipelineResult: PipelineExecutionSummary = results as ListPipelineExecutionsOutput
    
    
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