import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { getStatusColor } from '../../pipelineUtils';
import ReactTimeAgo from 'react-time-ago';
import { PhaseModel } from '../../../api/CodeBuildModels';
import { renderToString } from 'react-dom/server';
import { Typography } from '@material-ui/core/';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';

type PhasesListProps = {
  phaseList: PhaseModel[];
};

const getStatusIcon = (status: string) => {
  let color = getStatusColor(status);

  let icon = <FiberManualRecordIcon style={{ color: color }} />;

  return icon;
};

const getListItemText = (phase: PhaseModel) => {
  let phaseType = phase.phaseType;
  let phaseContextMessage = phase.contextMessage;
  let phaseContextStatusCode = phase.contextStatusCode;

  let phaseTypeText = <Typography style={{ fontWeight: 'bold' }}>{phaseType}</Typography>;

  let ContextMessage = (
    <Typography>
      {phaseTypeText}
      {`Message: ${phaseContextMessage} | Status Code: ${phaseContextStatusCode}`}
    </Typography>
  );

  if (phaseContextMessage === '' || phaseContextStatusCode === '') {
    return phaseTypeText;
  } else if (phaseContextMessage !== undefined && phaseContextStatusCode !== undefined) {
    return ContextMessage;
  }
};

const getListTextSecondary = (phase: PhaseModel) => {
  let startTime = <ReactTimeAgo date={phase.startTime} />;
  let duration = phase.durationinSeconds ? phase.durationinSeconds : 0;

  let startTimeRender = renderToString(startTime);

  let startTimeSpan = <span dangerouslySetInnerHTML={{ __html: startTimeRender }}></span>;
  let durationSpan = <span>{` duration: ${duration} seconds`}</span>;
  return (
    <div>
      {'Started: '}
      {startTimeSpan}
      {durationSpan}
    </div>
  );
};

const PhasesList: React.FC<PhasesListProps> = ({ phaseList }: PhasesListProps) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1b-content" id="panel1b-header">
        Phase Details
      </AccordionSummary>
      <List component="div" disablePadding>
        {phaseList.map((phase) => (
          <ListItem button>
            <ListItemIcon>{getStatusIcon(phase.phaseStatus)}</ListItemIcon>
            <ListItemText secondary={getListTextSecondary(phase)}>{getListItemText(phase)}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Accordion>
  );
};

export default PhasesList;
