import React from 'react';
import './App.css';
import {CodePipelineClient, ListPipelinesCommand} from '@aws-sdk/client-codepipeline'
import AWS from 'aws-sdk';



function App() {

const codePipelineClient = new CodePipelineClient({
    region: 'eu-west-1',
    credentials: {
       accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID!,
       secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY!
}})

let results = codePipelineClient.send(new ListPipelinesCommand({}))

results.then(res => {
  console.log(res)
})


  return (
    <div className="App">
    </div>
  );
}

export default App;
