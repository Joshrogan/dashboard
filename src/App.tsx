import { useState, useEffect } from 'react';
import {CONFIGURATION} from './config'
import { CodePipelineClientConfig} from '@aws-sdk/client-codepipeline'
import { CodePipelineService } from './api/CodePipelineService'
import {PipelineModel} from './api/CodePipelineModels'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Pipeline from './components/Pipeline'



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
    <Container maxWidth="lg">
    <Typography variant="h2">{"My Pipelines"}</Typography>
    {pipelines?.map((pipeline => <Pipeline key={pipeline?.pipelineName} pipeline={pipeline ?? null}/> ))}
    </Container> 
)
}

export default App;
