import {
  CloudWatchLogsClient,
  CloudWatchLogsClientConfig,
  GetLogEventsCommand,
  GetLogEventsCommandOutput,
} from '@aws-sdk/client-cloudwatch-logs';
import { LogModel } from './CodeBuildModels';

export class CloudWatchService {
  public client: CloudWatchLogsClient;

  constructor(configuration: CloudWatchLogsClientConfig) {
    this.client = new CloudWatchLogsClient(configuration);
  }

  public async getLogEvents(
    logGroupName: string | undefined,
    logStreamName: string | undefined
  ): Promise<LogModel[] | undefined> {
    try {
      const results: GetLogEventsCommandOutput = await this.client.send(
        new GetLogEventsCommand({ logGroupName, logStreamName })
      );

      if (results.events !== undefined) {
        let parsed: LogModel[] = results.events.map((log) => {
          if (log.timestamp !== undefined && log.message !== undefined) {
            return {
              timestamp: new Date(log.timestamp!).toISOString(),
              message: log.message,
            } as LogModel;
          } else {
            return {
              timestamp: '',
              message: '',
            };
          }
        });
        return parsed;
      }
    } catch (error) {}
  }
}
