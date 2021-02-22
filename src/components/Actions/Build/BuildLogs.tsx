import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import { LogModel } from '../../../api/CodeBuildModels';

type BuildLogsProps = {
  logs?: LogModel[];
};

const BuildLogs: React.FC<BuildLogsProps> = ({ logs }: BuildLogsProps) => {
  console.log('in logs!', logs);
  if (logs !== undefined) {
    return (
      <Accordion>
        {logs.map((log) => {
          return <Typography>{log.message}</Typography>;
        })}
      </Accordion>
    );
  } else {
    return <div>{'Hello World!'}</div>;
  }
};

export default BuildLogs;
