import { useState, useEffect } from 'react';
import {CONFIGURATION} from './config'
import { CodePipelineClientConfig, GetPipelineOutput} from '@aws-sdk/client-codepipeline'
import { CodePipelineService } from './pipeline/CodePipelineService'
import {PipelineModel} from './pipeline/CodePipelineModels'

function App() {
  const [pipelines, setPipelines] = useState<PipelineModel[] | undefined>([]);
  const [pipelinesMetadata, setPipelinesMetadata] = useState<(PipelineModel | undefined)[]>([])
  const [config] = useState<CodePipelineClientConfig>(CONFIGURATION)

useEffect(() => {
  const fetchData = async(): Promise<void> => {
    const codePipeline = new CodePipelineService(config)
    const pipelineOverview = await codePipeline.listPipelines()
    if (pipelineOverview !== undefined) {
      setPipelines(pipelineOverview)
      const pipelinesMetaCall = async() => { return Promise.all(pipelineOverview.map(pipeline => codePipeline.getPipeline(pipeline.pipelineName))) }
      const pipelinesMeta = await pipelinesMetaCall()
      if (pipelinesMeta) {
        setPipelinesMetadata(pipelinesMeta)
        console.log(pipelinesMeta)
      }
    }      
  }
  fetchData();
}, [config])



return(
  <div className="wrapper">
   <h1>My Pipelines</h1>
   <ul>
     {pipelines?.map((pipeline,index) => 
     <li key={index}>{(pipeline.pipelineName)}
     <ul>

       <li>{JSON.stringify((pipelinesMetadata[index]?.stages))}</li>
       <li>{JSON.stringify((pipelinesMetadata[index]?.pipelineName))}</li>
     </ul>
     </li>)}
     
   </ul>
 </div>
)
}

export default App;
