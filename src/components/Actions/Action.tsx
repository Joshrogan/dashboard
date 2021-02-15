import BuildAction from './BuildAction';
import DeployAction from './DeployAction';
import SourceAction from './SourceAction';
import { ActionModel } from '../../api/CodePipelineModels';
import { ActionTypeId } from '@aws-sdk/client-codepipeline';

// interface JsxElementArray {
//     [index: string]: JSX.Element
// }

// let myArray: JsxElementArray = (action: ActionModel) => ({
//     Build: <BuildAction action={action}/>,
//     "Deploy": <DeployAction action={action} />,
//     "Source": <SourceAction action={action} />
// })

// const allTypes: JSX.Element = (action: ActionModel) =>
//     Build: <BuildAction action={action}/>,
//     Deploy: <DeployAction action={action} />,
//     Source: <SourceAction action={action} />

// const getAction = (action: ActionModel) => ({
//     allTypes(action)
// })

type ActionProps = {
  action: ActionModel | undefined;
};
const Action: any | undefined = (Props: ActionProps) => {
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
