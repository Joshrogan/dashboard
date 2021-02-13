import React from 'react'
import {PipelineModel} from '../api/CodePipelineModels'
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CardContent from '@material-ui/core/CardContent';
import ReactTimeAgo from 'react-time-ago'
import {getStatusColor} from './pipelineUtils'


type PipelineProps = {
    pipeline: PipelineModel | null
}

const useStyles = makeStyles<Theme, PipelineProps>(theme => 
  createStyles({
    root: {
      padding: '8px',
    },
    card: {
      backgroundColor: ({pipeline}) => getStatusColor(pipeline),
    },
  }));
  

const Pipeline: React.FC<PipelineProps> = ({pipeline}: PipelineProps) => {
    const classes = useStyles({pipeline});


    if (pipeline === null) {
        return null 
    }

    let lastUpdateTime: any = null;
    if (pipeline?.pipelineExecutionSummary !== undefined) {
      lastUpdateTime = pipeline.pipelineExecutionSummary[0].lastUpdateTime ? pipeline.pipelineExecutionSummary[0].lastUpdateTime : null
    }

    let pipelineStatus: any = null;
    if (pipeline?.pipelineExecutionSummary !== undefined) {
    pipelineStatus = pipeline.pipelineExecutionSummary[0].status ? pipeline.pipelineExecutionSummary[0].status : null
    }


    console.log('pipelines', pipeline)

    return (
        <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>{pipeline.pipelineName}</CardContent>
          <CardContent>{"Last Updated: "}
            {lastUpdateTime && <ReactTimeAgo date={lastUpdateTime}/>}
            </CardContent>
            <CardContent>{pipelineStatus}</CardContent>
        </Card>
        </div>
    )
};

export default Pipeline