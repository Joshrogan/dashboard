import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import ReactTimeAgo from 'react-time-ago';
import { getStatusColor } from '../pipelineUtils';
import Link from '@material-ui/core/Link';
import LaunchIcon from '@material-ui/icons/Launch';
import { ActionModel, PipelineModel, StageModel } from '../../api/CodePipelineModels';
import { CodePipelineService } from '../../api/CodePipelineService';

type ApprovalActionProps = {
  action: ActionModel;
  pipeline: PipelineModel;
  stage: StageModel;
  pipelineClient: CodePipelineService;
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
    button: {
      padding: '1rem',
      width: '50%',
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

const ApprovalAction: React.FC<ApprovalActionProps> = ({
  action,
  pipeline,
  stage,
  pipelineClient,
}: ApprovalActionProps) => {
  const classes = useStyles(stage);
  const [textAreaValue, setTextAreaValue] = useState<string>('');

  if (action === undefined) {
    return null;
  }
  if (pipeline === null) {
    return null;
  }

  if (pipeline?.pipelineExecutionSummary === undefined) {
    return null;
  }

  let pipelineName = pipeline.pipelineName;
  let stageName = stage.stageName;
  let actionName = action.actionName;

  const onClick = async (buttonType: string) => {
    let resultStatus = buttonType;
    let resultSummary = textAreaValue;
    let token = action.token ? action.token : '';
    let result = await pipelineClient.putApprovalResult(
      pipelineName,
      stageName,
      resultStatus,
      resultSummary,
      actionName,
      token
    );
  };

  let summary = pipeline.pipelineExecutionSummary.find((exeuctionSummary) => exeuctionSummary.status === 'Succeeded');

  if (summary === undefined) {
    summary = pipeline.pipelineExecutionSummary[0];
  }
  const lastUpdateTime = action.lastUpdated ? action.lastUpdated : null;

  const latestCommitUrl = summary.sourceRevisions![0].revisionUrl;

  const latestCommitSummary = summary.sourceRevisions![0].revisionSummary;

  const latestCommitId = summary.sourceRevisions![0].revisionId;
  if (action.token !== undefined) {
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
            <div>
              <textarea
                rows={10}
                className={classes.textArea}
                value={textAreaValue}
                placeholder={'Optional Feedback Here...'}
                maxLength={255}
                onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>): void => setTextAreaValue(ev.target.value)}
              ></textarea>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => onClick('Approved')}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => onClick('Rejected')}
              >
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
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
