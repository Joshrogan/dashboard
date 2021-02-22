import {
  CloudWatchLogsClient,
  CloudWatchLogsClientConfig,
  GetLogEventsCommand,
  GetLogEventsCommandOutput,
} from '@aws-sdk/client-cloudwatch-logs';

export class CloudWatchLogsService {
  private client: CloudWatchLogsClient;

  constructor(configuration: CloudWatchLogsClientConfig) {
    this.client = new CloudWatchLogsClient(configuration);
  }

  public async getLogEvents(logGroupName: string | undefined, logStreamName: string | undefined): Promise<any> {
    try {
      const results: GetLogEventsCommandOutput = await this.client.send(
        new GetLogEventsCommand({ logGroupName, logStreamName })
      );

      if (results.events !== undefined) {
        let parsed = results.events.map((log) => {
          return {
            timestamp: new Date(log.timestamp!).toISOString(),
            message: log.message,
          };
        });

        return parsed;
      }
    } catch (error) {}
  }
}
