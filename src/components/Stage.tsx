import React from 'react'
import {StageModel} from '../api/CodePipelineModels'




type StageProps = {
    stage: string | undefined
}


  

const Stage: React.FC<StageProps> = ({stage}: StageProps) => {
    return (
      <div>Hello World {stage}</div>
    )
};

export default Stage