import { useState, useEffect } from 'react';
import {CONFIGURATION} from './config'
import { CodePipelineClientConfig} from '@aws-sdk/client-codepipeline'
import { CodePipelineService } from './pipeline/CodePipelineService'
import {PipelineModel} from './pipeline/CodePipelineModels'

function App() {
  const [pipelines, setPipelines] = useState<(PipelineModel | undefined)[]>([])
  const [config] = useState<CodePipelineClientConfig>(CONFIGURATION)

useEffect(() => {
  const fetchData = async(): Promise<void> => {
    const codePipelineClient = new CodePipelineService(config)
    const currentPipelines = await codePipelineClient.listPipelines()
    
    if (currentPipelines !== undefined) {
      const getCurrentPipelinesInfo = async() => { return Promise.all(currentPipelines.map(pipeline => codePipelineClient.getPipelineInfo(pipeline.pipelineName))) }
      const pipelineFullDetails = await getCurrentPipelinesInfo()
      if (pipelineFullDetails) {
        setPipelines(pipelineFullDetails)
        console.log(pipelineFullDetails)
      }
    }      
  }
  fetchData();
}, [config])


console.log(pipelines)
return(
  <div className="wrapper">
   <h1>My Pipelines</h1>
  {/* <div>{pipelinesMetadata?.map((pipeline => {
        return pipeline?.stages.map(stage => {
      return stage?.actions.map(action => {
        return `
        ${pipeline.pipelineName}
        ${stage.stageName}
        ${action.category} 
        `
      })})}))}
    </div> */}
    {pipelines?.map((pipeline => { return JSON.stringify(pipeline)}))
      }
    </div>
)
}

export default App;
