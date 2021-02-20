import React from 'react';
import { BuildModel } from '../../../api/CodeBuildModels';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getStatusColor, getS3Link } from '../../pipelineUtils';
import Link from '@material-ui/core/Link';

type BuildListComponentProps = {
  build: BuildModel;
};

function millisToMinutesAndSeconds(millis: number): string {
  var minutes: number = Math.floor(millis / 60000);
  var seconds: number = Number(((millis % 60000) / 1000).toFixed(0));
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

const useStyles = makeStyles<Theme, BuildListComponentProps>((theme) =>
  createStyles({
    root: {
      padding: '8px',
    },
    cardHeader: {
      backgroundColor: ({ build }) => getStatusColor(build.buildStatus),
      borderBottom: '1px solid black',
    },
    card: {
      backgroundColor: 'FloralWhite',
    },
  })
);

const BuildListComponent: React.FC<BuildListComponentProps> = ({ build }: BuildListComponentProps) => {
  const classes = useStyles({ build });

  console.log('build', build);
  let bucketLink = getS3Link(build.sourceVersion);
  return (
    <div>
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
        <CardContent>{build.sourceVersion}</CardContent>
        <CardContent>
          {' '}
          <Link href={bucketLink}>{bucketLink}</Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildListComponent;
