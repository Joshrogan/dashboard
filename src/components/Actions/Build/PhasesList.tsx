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

  if (phaseContextMessage === '' || phaseContextStatusCode === '') {
    return phaseType + 'start time: ' + String(phase.startTime);
  } else if (phaseContextMessage !== undefined && phaseContextStatusCode !== undefined) {
    return phaseContextMessage + phaseContextStatusCode;
  }
};

const PhasesList: React.FC<PhasesListProps> = ({ phaseList }: PhasesListProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  console.log('phaseList', phaseList);
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
              <ListItemText>{getListItemText(phase)}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default PhasesList;
