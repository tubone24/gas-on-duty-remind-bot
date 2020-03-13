import { SlackService } from "./slackService";
import { GetScriptsProperties, Property } from "./getScriptsProperties";
import { SpreadSheetService } from "./spreadSheetService";
import { Utils } from "./utils";

declare var global: any;

global.main = () => {
  const config: Property = GetScriptsProperties.getProperty();
  const spreadSheetService: SpreadSheetService = new SpreadSheetService();
  const todayPersonInfo: string[] = spreadSheetService.getPersonsInfo();

  const date: Date = new Date();

  if (Utils.isHoliday(date)) {
    spreadSheetService.updateTransaction();
    return true;
  }

  SlackService.notifySlack(todayPersonInfo, config.slackWebhook);

  spreadSheetService.updateTransaction();
};
