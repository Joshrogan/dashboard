export const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));

const GetLogEventsCommandFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

export class CloudWatchLogsClient {
  GetLogEventsCommand = GetLogEventsCommandFn;
}
