import BuildAction from './BuildAction';
import DeployAction from './DeployAction';
import SourceAction from './SourceAction';
import { ActionModel } from '../../api/CodePipelineModels';

type ActionProps = {
  action: ActionModel | undefined;
};
const Action: Function = (Props: ActionProps) => {
  let category = Props.action?.category;
  let action = Props.action;
  switch (category) {
    case 'Build':
      return <BuildAction action={action} />;
    case 'Deploy':
      return <DeployAction action={action} />;
    case 'Source':
      return <SourceAction action={action} />;
  }
};

export default Action;
