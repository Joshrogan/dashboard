import React from 'react'
import {PipelineModel} from '../api/CodePipelineModels'
import Card from '@material-ui/core/Card';


type PipelineProps = {
    pipeline: PipelineModel | null
}

const Pipeline: React.FC<PipelineProps> = ({pipeline}: PipelineProps) => {
    if (pipeline === null) {
        return null 
    }
    return (
        <Card>{pipeline.pipelineName}</Card>
    )
};

export default Pipeline