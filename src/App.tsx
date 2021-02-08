import React from 'react';
import './App.css';
import AWS from 'aws-sdk';



function App() {


const codepipeline = new AWS.CodePipeline({
  region: 'eu-west-1',
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID!,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY!
  }
})

console.log('secrets', process.env.REACT_APP_ACCESS_KEY_ID)
console.log('secrets2', process.env.REACT_APP_SECRET_ACCESS_KEY)
console.log(codepipeline)

let test =  codepipeline.listPipelines({}).promise().then(function(data) {
  return data
}).catch(function(err) {
  return err
}).then(async resp => {
  console.log(resp)
})



let trying = codepipeline.listPipelines({}).promise().then(function(data) {
  let pipelines = data.pipelines
  if (!pipelines) {
    return null

  }
  let names = pipelines.map( (pipeline) => {
    console.log(pipeline.name)
    return pipeline.name
  }
  )

  return names
}
).catch(err => {
  console.log('err', err)
}).then(res => {
  console.log('finalres',res)
})


  return (
    <div className="App">
    </div>
  );
}

export default App;
