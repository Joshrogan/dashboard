import React from 'react';
import { BuildModel } from '../../../api/CodeBuildModels';
import { ActionModel } from '../../../api/CodePipelineModels';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getStatusColor, getS3Link } from '../../pipelineUtils';
import Link from '@material-ui/core/Link';
import ReactTimeAgo from 'react-time-ago';
import PhasesList from './PhasesList';
import BuildLogs from './BuildLogs';

type BuildListComponentProps = {
  build: BuildModel;
  action: ActionModel;
};

function millisToMinutesAndSeconds(millis: number): string {
  var minutes: number = Math.floor(millis / 60000);
  var seconds: number = Number(((millis % 60000) / 1000).toFixed(0));
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

const useStyles = makeStyles<Theme, BuildModel>((theme) =>
  createStyles({
    root: {
      marginBottom: '1em',
    },
    cardHeader: {
      backgroundColor: (build) => getStatusColor(build.buildStatus),
      borderBottom: '1px solid black',
    },
    card: {
      backgroundColor: 'FloralWhite',
    },
  })
);

const BuildListComponent: React.FC<BuildListComponentProps> = ({ build, action }: BuildListComponentProps) => {
  const classes = useStyles(build);

  let bucketLink = getS3Link(build.sourceVersion);
  const lastUpdateTime = build.endTime;

  return (
    <div className={classes.root}>
      <Card raised={true}>
        <CardHeader
          className={classes.cardHeader}
          title={build.buildRun}
          subheader={'Build No: ' + build.buildNumber + '. Status: ' + build.buildStatus}
        />
        <CardContent>
          {'Build duration: '}
          {millisToMinutesAndSeconds(build.duration)}
        </CardContent>
        <CardContent>
          {'Last Updated: '}
          {lastUpdateTime && <ReactTimeAgo date={lastUpdateTime} />}
        </CardContent>
        <CardContent>
          <Link href={bucketLink}>{'S3 Source Version'}</Link>
        </CardContent>
        <CardContent>
          <PhasesList phaseList={build.phases} />
        </CardContent>
        <CardContent>
          <BuildLogs logs={build.logs} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildListComponent;
