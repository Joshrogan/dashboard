import React from 'react';
import { ActionModel, PipelineModel, StageModel } from '../../../api/CodePipelineModels';
import { BuildModel } from '../../../api/CodeBuildModels';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

type BuildListComponentProps = {
  build: BuildModel;
};

function millisToMinutesAndSeconds(millis: number): string {
  var minutes: number = Math.floor(millis / 60000);
  var seconds: number = Number(((millis % 60000) / 1000).toFixed(0));
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

const BuildListComponent: React.FC<BuildListComponentProps> = ({ build }: BuildListComponentProps) => {
  console.log('build', build);
  return (
    <div>
      <Card raised={true}>
        <CardHeader
          title={build.buildRun}
          subheader={'Build No: ' + build.buildNumber + '. Status: ' + build.buildStatus}
        />
        <CardContent>
          {'duration: '}
          {millisToMinutesAndSeconds(build.duration)}
        </CardContent>
        <CardContent>{build.sourceVersion}</CardContent>
      </Card>
    </div>
  );
};

export default BuildListComponent;
