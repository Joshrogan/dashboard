import { CloudWatchService } from './CloudWatchService';
import { mock, when, anyString, instance } from 'ts-mockito';

const MockedCloudWatchService = mock(CloudWatchService);

describe('CloudWatchService', () => {
  it('testing', async () => {
    let mockInstance = instance(MockedCloudWatchService);

    when(MockedCloudWatchService.getLogEvents(anyString(), anyString())).thenResolve([
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
