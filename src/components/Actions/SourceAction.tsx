import React from 'react';
import { ActionModel } from '../../api/CodePipelineModels';

type SourceActionProps = {
  action: ActionModel | undefined;
};

const SourceAction: React.FC<SourceActionProps> = ({ action }: SourceActionProps) => {
  return <div>{'Hello world source action'}</div>;
};

export default SourceAction;
