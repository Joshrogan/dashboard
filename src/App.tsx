import { useState, useEffect } from 'react';
import { CONFIGURATION } from './config';
import { CodePipelineClientConfig } from '@aws-sdk/client-codepipeline';
import { CodePipelineService } from './api/CodePipelineService';
import { PipelineModel } from './api/CodePipelineModels';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Pipeline from './components/Pipeline';
import Stages from './components/Stages';
import { BrowserRouter as Router, Route, Link as RouterLink } from 'react-router-dom';

function App() {
  const [pipelines, setPipelines] = useState<PipelineModel[]>([]);
  // I'm using state for the config files for the opportunity in the future to support multiple regions/accounts.
  const [config] = useState<CodePipelineClientConfig>(CONFIGURATION);

  const codePipelineClient = new CodePipelineService(config);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const currentPipelines = await codePipelineClient.listPipelines();

      if (currentPipelines !== undefined) {
        const getCurrentPipelinesInfo = async () => {
          return Promise.all(
            currentPipelines.map((pipeline) => codePipelineClient.getPipelineInfo(pipeline.pipelineName))
          );
        };
        const pipelinesFullDetail = await getCurrentPipelinesInfo();
        if (pipelinesFullDetail !== undefined) {
          let notUndefined: PipelineModel[] = pipelinesFullDetail as PipelineModel[];
          if (notUndefined.every((pipeline) => pipeline !== undefined)) {
            setPipelines(notUndefined);
          }
        }
      }
    };
    fetchData();
    // setInterval(fetchData, 10000);
  }, [config]);

  return (
    <Container maxWidth="lg">
      <Router>
        <Typography variant="h2">
          <RouterLink to="/">Velocity CD Dashboard</RouterLink>
        </Typography>
        <Route exact path="/">
          {pipelines?.map((pipeline) => (
            <Pipeline pipeline={pipeline ?? null} key={pipeline?.pipelineName} />
          ))}
        </Route>
        <Route
          exact
          path="/pipeline/:pipelineName"
          render={(props) => (
            <Stages
              pipeline={pipelines.find((pipeline) => pipeline.pipelineName === props.match.params.pipelineName)}
              pipelineClient={codePipelineClient}
            />
          )}
        ></Route>
      </Router>
    </Container>
  );
}

export default App;
