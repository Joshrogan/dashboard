import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ReactTimeAgo from 'react-time-ago';
import { getStatusColor } from '../pipelineUtils';
import Link from '@material-ui/core/Link';
import LaunchIcon from '@material-ui/icons/Launch';

import { ActionModel, PipelineModel } from '../../api/CodePipelineModels';

type SourceActionProps = {
  action: ActionModel | undefined;
  pipeline: PipelineModel;
};

const useStyles = makeStyles<Theme, PipelineModel>((theme) =>
  createStyles({
    root: {
      padding: '8px',
    },
    cardHeader: {
      backgroundColor: (pipeline) => getStatusColor(pipeline),
      borderBottom: '1px solid black',
    },
    card: {
      backgroundColor: 'FloralWhite',
    },
  })
);

const SourceAction: React.FC<SourceActionProps> = ({ action, pipeline }: SourceActionProps) => {
  const classes = useStyles(pipeline);

  if (pipeline === null) {
    return null;
  }

  if (pipeline?.pipelineExecutionSummary === undefined) {
    return null;
  }

  const summary = pipeline.pipelineExecutionSummary[0];

  const lastUpdateTime = summary.lastUpdateTime ? pipeline.pipelineExecutionSummary[0].lastUpdateTime : null;

  const pipelineStatus = summary.status ? pipeline.pipelineExecutionSummary[0].status : null;

  const latestCommitUrl = summary.sourceRevisions![0].revisionUrl;

  const latestCommitSummary = summary.sourceRevisions![0].revisionSummary;

  const latestCommitId = summary.sourceRevisions![0].revisionId;

  return (
    <div className={classes.root}>
      <Card className={classes.card} raised={true}>
        <CardHeader
          className={classes.cardHeader}
          title={pipeline.pipelineName}
          subheader={'Status: ' + pipelineStatus}
        />
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
      </Card>
    </div>
  );
};

export default SourceAction;
