import { CloudWatchLogsService } from './CloudWatchLogsService';
import { mock, when, anyString, instance } from 'ts-mockito';

const MockedCloudWatchLogsService = mock(CloudWatchLogsService);

describe('CloudWatchLogsService', () => {
  it('testing', async () => {
    let mockInstance = instance(MockedCloudWatchLogsService);

    when(MockedCloudWatchLogsService.getLogEvents(anyString(), anyString())).thenReturn([
      {
        timestamp: '1549312452',
        message: 'hello',
      },
    ]);

    const actual = await mockInstance.getLogEvents('logGroupName', 'logStreamName');

    expect(actual).toEqual([
      {
        timestamp: '1549312452',
        message: 'hello',
      },
    ]);
  });
});
