import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { LogModel } from '../../../api/CodeBuildModels';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AccordionDetails = withStyles((theme) => ({
  root: {
    display: 'block',
    backgroundColor: 'beige',
    whiteSpace: 'pre-wrap',
  },
}))(MuiAccordionDetails);

type BuildLogsProps = {
  logs?: LogModel[];
};

const BuildLogs: React.FC<BuildLogsProps> = ({ logs }: BuildLogsProps) => {
  if (logs !== undefined) {
    let blurb = logs.map((log) => {
      return log.message;
    });

    let blurbStr = blurb.join('');
    if (logs !== undefined) {
      return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            Build Logs
          </AccordionSummary>
          <AccordionDetails>{blurbStr}</AccordionDetails>
        </Accordion>
      );
    } else {
      return <div>{'Hello World!'}</div>;
    }
  } else {
    return <div>{'Hello World!'}</div>;
  }
};

export default BuildLogs;
