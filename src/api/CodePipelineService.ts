import {
  CodePipelineClient,
  ListPipelinesCommand,
  ListPipelinesCommandOutput,
  CodePipelineClientConfig,
  GetPipelineCommand,
  GetPipelineCommandOutput,
  GetPipelineStateCommand,
  GetPipelineStateCommandOutput,
  GetPipelineExecutionCommand,
  GetPipelineExecutionCommandOutput,
  PipelineDeclaration,
  StageDeclaration,
  ListPipelineExecutionsCommand,
  ListPipelineExecutionsOutput,
  PipelineExecutionSummary,
  StageState,
} from '@aws-sdk/client-codepipeline';
import { PipelineModel, PipelineExecutionSummaryModel, StageModel, ActionModel } from './CodePipelineModels';

export class CodePipelineService {
  private client: CodePipelineClient;

  constructor(configuration: CodePipelineClientConfig) {
    this.client = new CodePipelineClient(configuration);
  }

  public async listPipelines(): Promise<PipelineModel[] | undefined> {
    try {
      const results: ListPipelinesCommandOutput = await this.client.send(new ListPipelinesCommand({}));
      if (results.pipelines !== undefined) {
        const pipelineList: PipelineModel[] = results.pipelines.map((pipeline) => ({
          pipelineName: pipeline.name as string,
          updated: pipeline.updated as Date,
          created: pipeline.created as Date,
          stages: [],
        }));
        return pipelineList;
      }
    } catch (error) {
      const { requestId, cfId, extendedRequestId } = error.$metadata;
      console.error(error);
      console.log({ requestId, cfId, extendedRequestId });
      return undefined;
    }
  }

  public async getPipelineInfo(pipelineName: string): Promise<PipelineModel | undefined> {
    try {
      const results: GetPipelineCommandOutput = await this.client.send(new GetPipelineCommand({ name: pipelineName }));

      const pipelineResult: PipelineDeclaration = results.pipeline as PipelineDeclaration;
      const stageResult: StageDeclaration[] = results.pipeline!.stages! as StageDeclaration[];

      const pipelineExecutionInfo = await this.getPipelineExecutionInfo(pipelineName);

      const pipelineState: GetPipelineStateCommandOutput = await this.getPipelineState(pipelineName);
      let pipelineExecutionId = pipelineState.stageStates![0].latestExecution!.pipelineExecutionId;

      const pipelineExecution = await this.getPipelineExecution(pipelineName, pipelineExecutionId!);
      let pipelineStatus = pipelineExecution?.pipelineExecution?.status;

      if (pipelineResult && stageResult) {
        const pipeline: PipelineModel = {
          pipelineName: pipelineResult.name!,
          updated: results.metadata?.updated,
          pipelineExecutionId: pipelineExecutionId,
          status: pipelineStatus,
          pipelineExecutionSummary: pipelineExecutionInfo,
          stages: stageResult.map((stage) => {
            return {
              stageName: stage.name!,
              actions: stage.actions!.map((action) => {
                return {
                  actionName: action.name!,
                  category: action.actionTypeId?.category!,
                  repo: action.configuration?.RepositoryName,
                  branch: action.configuration?.BranchName,
                };
              }),
            };
          }),
        };

        // code below is to get the status of each stage & status of each action and store them in model too
        let pipelineStageStates: GetPipelineStateCommandOutput = await this.getPipelineState(pipeline.pipelineName);
        if (pipelineStageStates.stageStates !== undefined) {
          let stageStates: StageState[] = pipelineStageStates.stageStates;
          let newStages: StageModel[] = pipeline.stages.map((stage) => {
            let findStage = stageStates.find((tempStage) => {
              return tempStage.stageName === stage.stageName;
            });
            let newActions: ActionModel[] = stage.actions.map((action) => {
              return {
                ...action,
                status: findStage?.actionStates![0].latestExecution?.status,
              };
            });
            let newStage: StageModel = {
              ...stage,
              status: findStage?.latestExecution?.status,
              actions: newActions,
            };
            return newStage;
          });

          let newPipeline: PipelineModel = {
            ...pipeline,
            stages: newStages,
          };

          return newPipeline;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async getPipelineExecutionInfo(pipelineName: string): Promise<PipelineExecutionSummaryModel[] | undefined> {
    try {
      const results: ListPipelineExecutionsOutput = await this.client.send(
        new ListPipelineExecutionsCommand({ pipelineName })
      );

      const pipelineExecutionSummaries = results.pipelineExecutionSummaries;
      if (pipelineExecutionSummaries !== undefined) {
        const executionInfo: PipelineExecutionSummaryModel[] = pipelineExecutionSummaries.map(
          (info: PipelineExecutionSummary) => {
            return {
              lastUpdateTime: info.lastUpdateTime!,
              startTime: info.startTime!,
              status: info.status!,
              sourceRevisions: info.sourceRevisions?.map((revision) => {
                return {
                  actionName: revision.actionName,
                  revisionSummary: revision.revisionSummary,
                  revisionUrl: revision.revisionUrl,
                  revisionId: revision.revisionId,
                };
              }),
            };
          }
        );
        return executionInfo;
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async getPipelineExecution(
    pipelineName: string,
    pipelineExecutionId: string
  ): Promise<GetPipelineExecutionCommandOutput | undefined> {
    try {
      const results: GetPipelineExecutionCommandOutput = await this.client.send(
        new GetPipelineExecutionCommand({ pipelineName, pipelineExecutionId })
      );

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  private async getPipelineState(pipelineName: string): Promise<any> {
    try {
      const results: GetPipelineStateCommandOutput = await this.client.send(
        new GetPipelineStateCommand({ name: pipelineName })
      );

      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
