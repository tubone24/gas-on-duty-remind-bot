export class GetScriptsProperties {
  static getProperty(): Property {
    const slackWebhook: string = PropertiesService.getScriptProperties().getProperty(
      'SLACK_WEBHOOK'
    );
    return {slackWebhook}
  }
}

export interface Property {
  slackWebhook: string
}
