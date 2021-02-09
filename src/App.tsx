import { useState, useEffect } from 'react';
import {CONFIGURATION} from './config'
import {PipelineSummary, CodePipelineClientConfig} from '@aws-sdk/client-codepipeline'
import { CodePipelineService } from './pipeline/CodePipelineService'


function App() {

  const [pipelines, setPipelines] = useState<PipelineSummary[] | undefined>([]);
  const [config] = useState<CodePipelineClientConfig>(CONFIGURATION)




useEffect(() => {

  const fetchData = async(): Promise<void> => {
    const codePipeline = new CodePipelineService(config)
    const result = await codePipeline.listPipelines()
    if (result !== undefined) {
      setPipelines(result)
    }      
  }
  fetchData();
}, [config])





return(
  <div className="wrapper">
   <h1>My Pipelines</h1>
   <ul>
     {pipelines?.map((pipeline,index) => <li key={index}>{pipeline.name}</li>)}
   </ul>
 </div>
)
}

export default App;
