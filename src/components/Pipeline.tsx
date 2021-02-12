import React from 'react'
import {PipelineModel} from '../api/CodePipelineModels'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';



type PipelineProps = {
    pipeline: PipelineModel | null
}

const useStyles = makeStyles({
    root: {
      padding: '8px',
    //   height: '100vh',
    },
    paper: {
      width: '100%',
      height: '100%',
      backgroundColor: 'cyan',
    },
    card: {
      backgroundColor: 'gray',
    },
  });
  

const Pipeline: React.FC<PipelineProps> = ({pipeline}: PipelineProps) => {
    const classes = useStyles();


    if (pipeline === null) {
        return null 
    }

    console.log('pipelines', pipeline)

    return (
        <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>{pipeline.pipelineName}</CardContent>
        </Card>
        </div>
    )
};

export default Pipeline