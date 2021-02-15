import BuildAction from './BuildAction';
import DeployAction from './DeployAction';
import SourceAction from './SourceAction';
import { ActionModel, PipelineModel } from '../../api/CodePipelineModels';

type ActionProps = {
  action: ActionModel | undefined;
  pipeline: PipelineModel;
};
const Action: Function = (Props: ActionProps) => {
  let category = Props.action?.category;
  let action = Props.action;

  let pipeline = Props.pipeline;
  switch (category) {
    case 'Build':
      return <BuildAction action={action} />;
    case 'Deploy':
      return <DeployAction action={action} />;
    case 'Source':
      return <SourceAction action={action} pipeline={pipeline} />;
  }
};

export default Action;
