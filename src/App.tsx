import { useState, useEffect } from 'react';
import { CONFIGURATION } from './config';
import { CodePipelineClientConfig } from '@aws-sdk/client-codepipeline';
import { CodePipelineService } from './api/CodePipelineService';
import { PipelineModel } from './api/CodePipelineModels';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Pipeline from './components/Pipeline';
import Stages from './components/Stages';

interface IState {
  iname: string | undefined;
  show: boolean;
}

function App() {
  const [pipelines, setPipelines] = useState<PipelineModel[]>([]);
  // I'm using state for the config files for the opportunity in the future to support multiple regions/accounts.
  const [config] = useState<CodePipelineClientConfig>(CONFIGURATION);
  const [showChild, setShowChild] = useState<IState>({
    iname: 'none',
    show: false,
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const codePipelineClient = new CodePipelineService(config);
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
  }, [config]);

  console.log('pipelines app level', pipelines);
  return (
    <Container maxWidth="lg">
      <Typography variant="h2">{'My Pipelines'}</Typography>
      {showChild.show ? (
        <Stages pipeline={pipelines.find((pipeline) => pipeline.pipelineName === showChild.iname)} />
      ) : (
        pipelines?.map((pipeline) => (
          <Pipeline
            clickHandler={() => setShowChild({ iname: pipeline?.pipelineName, show: true })}
            pipeline={pipeline ?? null}
            key={pipeline?.pipelineName}
          />
        ))
      )}
    </Container>
  );
}

export default App;
