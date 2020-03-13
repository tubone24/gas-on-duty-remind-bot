export class SlackService {
  static notifySlack(todayPersonInfo: string[], webhookUrl: string): void{
    const jsonData: JsonData =
      {
        username: 'DailyBot',
        icon_emoji: ':robot_face:',
        text: todayPersonInfo[2]+' 今日のRedmine担当は'+todayPersonInfo[1]+'さん！ よろしくおねがいします！！'
      };
    const payload: string = JSON.stringify(jsonData);

    const options =
      {
        'method': 'post',
        'contentType': 'application/json',
        'payload': payload
      };
    // @ts-ignore
    UrlFetchApp.fetch(webhookUrl, options);
  }
}

export interface JsonData {
  username: string,
  icon_emoji: string,
  text: string
}
