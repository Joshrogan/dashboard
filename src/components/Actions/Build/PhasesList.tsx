import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { getStatusColor } from '../../pipelineUtils';
import ReactTimeAgo from 'react-time-ago';
import { PhaseModel } from '../../../api/CodeBuildModels';
import { renderToString } from 'react-dom/server';
import { Typography } from '@material-ui/core/';

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
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Phases
        </ListSubheader>
      }
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Click to expand phase list" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {phaseList.map((phase) => (
            <ListItem button>
              <ListItemIcon>{getStatusIcon(phase.phaseStatus)}</ListItemIcon>
              <ListItemText secondary={getListTextSecondary(phase)}>{getListItemText(phase)}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default PhasesList;
