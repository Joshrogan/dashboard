import React from 'react';
import { ActionModel } from '../../api/CodePipelineModels';

type DeployActionProps = {
  action: ActionModel | undefined;
};

const DeployAction: React.FC<DeployActionProps> = ({ action }: DeployActionProps) => {
  return <div>{'Hello world deploy action'}</div>;
};

export default DeployAction;
