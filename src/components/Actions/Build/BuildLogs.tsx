import React from 'react';
import { BuildModel } from '../../../api/CodeBuildModels';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getStatusColor, getS3Link } from '../../pipelineUtils';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

type BuildLogsProps = {
  build: BuildModel;
};

const BuildLogs: React.FC<BuildLogsProps> = ({ build }: BuildLogsProps) => {
  return <div>Hello World</div>;
};

export default BuildLogs;
