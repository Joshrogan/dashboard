import { useState, useEffect } from 'react';
import {CONFIGURATION} from './config'
import {PipelineSummary, CodePipelineClientConfig, GetPipelineOutput} from '@aws-sdk/client-codepipeline'
import { CodePipelineService } from './pipeline/CodePipelineService'
import {PipelineModel} from './pipeline/CodePipelineModels'

function App() {
  const [pipelines, setPipelines] = useState<PipelineModel[] | undefined>([]);
  const [pipelinesMetadata, setPipelinesMetadata] = useState<(GetPipelineOutput | undefined)[]>([])
  const [config] = useState<CodePipelineClientConfig>(CONFIGURATION)

useEffect(() => {
  const fetchData = async(): Promise<void> => {
    const codePipeline = new CodePipelineService(config)
    const pipelineOverview = await codePipeline.listPipelines()
    if (pipelineOverview !== undefined) {
      setPipelines(pipelineOverview)
      const pipelinesMetaCall = async() => { return Promise.all(pipelineOverview.map(pipeline => codePipeline.getPipeline(pipeline.name))) }
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
     <li key={index}>{(pipeline.name)}
     <ul>

       <li>{JSON.stringify((pipelinesMetadata[index]?.metadata))}</li>
       <li>{JSON.stringify((pipelinesMetadata[index]?.pipeline))}</li>
     </ul>
     </li>)}
     
   </ul>
 </div>
)
}

export default App;
