import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ReactTimeAgo from 'react-time-ago';
import { getStatusColor } from '../pipelineUtils';
import Link from '@material-ui/core/Link';
import LaunchIcon from '@material-ui/icons/Launch';
import { ActionModel, PipelineModel, StageModel } from '../../api/CodePipelineModels';

type ApprovalActionProps = {
  action: ActionModel;
  pipeline: PipelineModel;
  stage: StageModel;
};

const useStyles = makeStyles<Theme, StageModel>((theme) =>
  createStyles({
    textArea: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
    },
    root: {
      padding: '8px',
    },
    cardHeader: {
      backgroundColor: (stage) => getStatusColor(stage.status ? stage.status : 'default'),
      borderBottom: '1px solid black',
    },
    card: {
      backgroundColor: 'FloralWhite',
    },
  })
);

const ApprovalAction: React.FC<ApprovalActionProps> = ({ action, pipeline, stage }: ApprovalActionProps) => {
  const classes = useStyles(stage);
  if (action === undefined) {
    return null;
  }
  if (pipeline === null) {
    return null;
  }

  if (pipeline?.pipelineExecutionSummary === undefined) {
    return null;
  }

  let summary = pipeline.pipelineExecutionSummary.find((exeuctionSummary) => exeuctionSummary.status === 'Succeeded');

  if (summary === undefined) {
    summary = pipeline.pipelineExecutionSummary[0];
  }
  const lastUpdateTime = action.lastUpdated ? action.lastUpdated : null;

  const latestCommitUrl = summary.sourceRevisions![0].revisionUrl;

  const latestCommitSummary = summary.sourceRevisions![0].revisionSummary;

  const latestCommitId = summary.sourceRevisions![0].revisionId;

  console.log('actionAPPROVAL', action);
  if (action.summary === undefined && action.token !== undefined) {
    return <textarea rows={10} className={classes.textArea}></textarea>;
  } else {
    return (
      <div className={classes.root}>
        <Card className={classes.card} raised={true}>
          <CardHeader className={classes.cardHeader} title={action.actionName} subheader={'Status: ' + stage.status} />
          <CardContent>
            {'Last Updated: '}
            {lastUpdateTime && <ReactTimeAgo date={lastUpdateTime} />}
          </CardContent>
          <CardContent>
            {'Latest Commit: '}
            {latestCommitSummary}{' '}
            {
              <Link href={latestCommitUrl}>
                {latestCommitId?.substring(0, 9)} {<LaunchIcon fontSize={'inherit'} viewBox={'0 0 24 18'} />}
              </Link>
            }
          </CardContent>
          <CardContent>
            {'Comments: '}
            {action.summary}
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default ApprovalAction;
