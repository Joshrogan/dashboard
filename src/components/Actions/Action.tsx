import BuildAction from './BuildAction';
import DeployAction from './DeployAction';
import SourceAction from './SourceAction';
import ApprovalAction from './ApprovalAction';
import { ActionModel, PipelineModel, StageModel } from '../../api/CodePipelineModels';
import { CodePipelineService } from '../../api/CodePipelineService';

type ActionProps = {
  action: ActionModel;
  pipeline: PipelineModel;
  stage: StageModel;
  pipelineClient: CodePipelineService;
};

const Action: Function = (Props: ActionProps) => {
  let category = Props.action?.category;
  let action = Props.action;
  let stage = Props.stage;
  let pipelineClient = Props.pipelineClient;

  let pipeline = Props.pipeline;
  switch (category) {
    case 'Build':
      return <BuildAction action={action} pipeline={pipeline} stage={stage} />;
    case 'Deploy':
      return <DeployAction action={action} pipeline={pipeline} stage={stage} />;
    case 'Source':
      return <SourceAction action={action} pipeline={pipeline} stage={stage} />;
    case 'Approval':
      return <ApprovalAction action={action} pipeline={pipeline} stage={stage} pipelineClient={pipelineClient} />;
  }
};

export default Action;
