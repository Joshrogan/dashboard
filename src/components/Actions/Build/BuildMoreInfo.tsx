import React from 'react';
import { BuildModel } from '../../../api/CodeBuildModels';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getStatusColor, getS3Link } from '../../pipelineUtils';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

type BuildMoreInfoProps = {
  build: BuildModel;
};

function millisToMinutesAndSeconds(millis: number): string {
  var minutes: number = Math.floor(millis / 60000);
  var seconds: number = Number(((millis % 60000) / 1000).toFixed(0));
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

const useStyles = makeStyles<Theme, BuildMoreInfoProps>((theme) =>
  createStyles({
    root: {
      marginBottom: '1em',
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

const BuildMoreInfo: React.FC<BuildMoreInfoProps> = ({ build }: BuildMoreInfoProps) => {
  const classes = useStyles({ build });

  let bucketLink = getS3Link(build.sourceVersion);
  return (
    <div className={classes.root}>
      <Card raised={true}>
        <CardHeader
          className={classes.cardHeader}
          title={build.buildRun}
          subheader={'Build No: ' + build.buildNumber + '. Status: ' + build.buildStatus}
          action={
            <Button size="small" color="primary" variant="contained">
              More Info
            </Button>
          }
        />
        <CardContent>
          {'Build duration: '}
          {millisToMinutesAndSeconds(build.duration)}
        </CardContent>
        <CardContent>{build.sourceVersion}</CardContent>
        <CardContent>
          {' '}
          <Link href={bucketLink}>{'S3 Source Version'}</Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildMoreInfoProps;
