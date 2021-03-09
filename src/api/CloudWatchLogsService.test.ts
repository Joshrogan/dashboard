import { CloudWatchLogsService } from './CloudWatchLogsService';
import { mocked } from 'ts-jest/utils';
// import { CloudWatchLogsClient, GetLogEventsCommandFn } from '../../__mocks__/aws-sdk/client-cloudwatch-logs';

export const CONFIGURATION = {
  region: 'eu-west-1',
  credentials: {
    accessKeyId: 'ACCESS_KEY',
    secretAccessKey: 'SECRET_ACCESS_KEY',
  },
};

jest.mock('./CloudWatchLogsService', () => {
  return {
    CloudWatchLogsService: jest.fn().mockImplementation(() => {
      return {
        getLogEvents: (logGroupName: string, logStreamName: string) => {
          return `${logGroupName}${logStreamName}`;
        },
      };
    }),
  };
});

describe('CloudWatchLogsService', () => {
  const MockedCloudWatchLogsService = mocked(CloudWatchLogsService, true);

  beforeEach(() => {
    MockedCloudWatchLogsService.mockClear();
  });

  it('Checking it calls class constructor', () => {
    const cwClient = new CloudWatchLogsService(CONFIGURATION);
    expect(MockedCloudWatchLogsService).toHaveBeenCalledTimes(1);
  });

  it('Testing it calls getLogEvents', () => {
    const cwClient = new CloudWatchLogsService(CONFIGURATION);
    let value = cwClient.getLogEvents('logGroupName', 'logStreamName');
    expect(value).toEqual('logGroupNamelogStreamName');
  });
});
