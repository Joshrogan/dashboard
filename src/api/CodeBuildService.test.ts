import { CodeBuildService } from './CodeBuildService';
import { mock, when, instance, anything } from 'ts-mockito';

const MockedCodeBuildService = mock(CodeBuildService);

const mockBuild = {
  buildRun: 'reactCodeBuild59E2E923-X83xLqjjUBPR:5e8cf91b-0aff-4096-9707-0ef1affa6746',
  buildStatus: 'SUCCEEDED',
  buildNumber: 17,
  sourceVersion: 'arn:aws:s3:::velocity-pipeline-artifact-bucket/reactClientPipeline/reactRepoL/9rVjoB2.zip',
  duration: 86228,
  completed: true,
  endTime: '2021-03-08T15:18:58.633Z',
  phases: [
    {
      contextMessage: '',
      contextStatusCode: '',
      phaseStatus: 'SUCCEEDED',
      phaseType: 'SUBMITTED',
      durationinSeconds: 0,
      startTime: '2021-03-08T15:17:32.405Z',
      endTime: '2021-03-08T15:17:32.579Z',
    },
    {
      contextMessage: '',
      contextStatusCode: '',
      phaseStatus: 'SUCCEEDED',
      phaseType: 'QUEUED',
      durationinSeconds: 1,
      startTime: '2021-03-08T15:17:32.579Z',
      endTime: '2021-03-08T15:17:33.719Z',
    },
    {
      contextMessage: '',
      contextStatusCode: '',
      phaseStatus: 'SUCCEEDED',
      phaseType: 'PROVISIONING',
      durationinSeconds: 21,
      startTime: '2021-03-08T15:17:33.719Z',
      endTime: '2021-03-08T15:17:55.655Z',
    },
    {
      contextMessage: '',
      contextStatusCode: '',
      phaseStatus: 'SUCCEEDED',
      phaseType: 'DOWNLOAD_SOURCE',
      durationinSeconds: 9,
      startTime: '2021-03-08T15:17:55.655Z',
      endTime: '2021-03-08T15:18:05.280Z',
    },
    {
      contextMessage: '',
      contextStatusCode: '',
      phaseStatus: 'SUCCEEDED',
      phaseType: 'INSTALL',
      durationinSeconds: 2,
      startTime: '2021-03-08T15:18:05.280Z',
      endTime: '2021-03-08T15:18:07.433Z',
    },
    {
      contextMessage: '',
      contextStatusCode: '',
      phaseStatus: 'SUCCEEDED',
      phaseType: 'PRE_BUILD',
      durationinSeconds: 32,
      startTime: '2021-03-08T15:18:07.433Z',
      endTime: '2021-03-08T15:18:39.485Z',
    },
    {
      contextMessage: '',
      contextStatusCode: '',
      phaseStatus: 'SUCCEEDED',
      phaseType: 'BUILD',
      durationinSeconds: 16,
      startTime: '2021-03-08T15:18:39.485Z',
      endTime: '2021-03-08T15:18:56.270Z',
    },
    {
      contextMessage: '',
      contextStatusCode: '',
      phaseStatus: 'SUCCEEDED',
      phaseType: 'POST_BUILD',
      durationinSeconds: 0,
      startTime: '2021-03-08T15:18:56.270Z',
      endTime: '2021-03-08T15:18:56.308Z',
    },
    {
      contextMessage: '',
      contextStatusCode: '',
      phaseStatus: 'SUCCEEDED',
      phaseType: 'UPLOAD_ARTIFACTS',
      durationinSeconds: 0,
      startTime: '2021-03-08T15:18:56.308Z',
      endTime: '2021-03-08T15:18:56.547Z',
    },
    {
      contextMessage: '',
      contextStatusCode: '',
      phaseStatus: 'SUCCEEDED',
      phaseType: 'FINALIZING',
      durationinSeconds: 2,
      startTime: '2021-03-08T15:18:56.547Z',
      endTime: '2021-03-08T15:18:58.633Z',
    },
    {
      contextMessage: '',
      contextStatusCode: '',
      phaseType: 'COMPLETED',
      startTime: '2021-03-08T15:18:58.633Z',
    },
  ],
  cloudWatch: {
    cloudWatchLogsArn:
      'arn:aws:logs:eu-west-1:509079033231:log-group:/aws/codebuild/reactCodeBuild59E2E923-X83xLqjjUBPR:log-stream:5e8cf91b-0aff-4096-9707-0ef1affa6746',
    deepLink:
      'https://console.aws.amazon.com/cloudwatch/home?region=eu-west-1#logEvent:group=/aws/codebuild/reactCodeBuild59E2E923-X83xLqjjUBPR;stream=5e8cf91b-0aff-4096-9707-0ef1affa6746',
    groupName: '/aws/codebuild/reactCodeBuild59E2E923-X83xLqjjUBPR',
    streamName: '5e8cf91b-0aff-4096-9707-0ef1affa6746',
  },
};

describe('CloudWatchService', () => {
  it('testing methods', async () => {
    let mockInstance = instance(MockedCodeBuildService);

    when(MockedCodeBuildService.batchGetBuilds(anything())).thenResolve(mockBuild);

    const actual = await mockInstance.batchGetBuilds(['buildId', 'buildId2']);

    expect(actual).toEqual(mockBuild);
  });
});
