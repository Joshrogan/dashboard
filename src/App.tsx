import { useState, useEffect } from 'react';
import {CONFIGURATION} from './config'
import { CodePipelineClientConfig} from '@aws-sdk/client-codepipeline'
import { CodePipelineService } from './pipeline/CodePipelineService'
import {PipelineModel} from './pipeline/CodePipelineModels'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';



function App() {
  const [pipelines, setPipelines] = useState<(PipelineModel | undefined)[]>([])
  // I'm using state for the config files for the opportunity in the future to support multiple regions/accounts.
  const [config] = useState<CodePipelineClientConfig>(CONFIGURATION)

useEffect(() => {
  const fetchData = async(): Promise<void> => {
    const codePipelineClient = new CodePipelineService(config)
    const currentPipelines = await codePipelineClient.listPipelines()
    
    if (currentPipelines !== undefined) {
      const getCurrentPipelinesInfo = async() => { return Promise.all(currentPipelines.map(pipeline => codePipelineClient.getPipelineInfo(pipeline.pipelineName))) }
      const pipelinesFullDetail = await getCurrentPipelinesInfo()
      if (pipelinesFullDetail) {
        setPipelines(pipelinesFullDetail)
        console.log(pipelinesFullDetail)
      }
    }      
  }
  fetchData();
}, [config])


console.log(pipelines)
return(
    <Container maxWidth="sm">
    <Typography variant="h2">{"My Pipelines"}</Typography>
    {pipelines?.map((pipeline => {return <Typography variant="body1">{pipeline?.pipelineName}</Typography>}))}
    </Container> 
)
}

export default App;
