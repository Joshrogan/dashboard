import React from 'react';
import { ActionModel } from '../../api/CodePipelineModels';

type BuildActionProps = {
  action: ActionModel | undefined;
};

const BuildAction: React.FC<BuildActionProps> = ({ action }: BuildActionProps) => {
  return <div>{'Hello world build action'}</div>;
};

export default BuildAction;
