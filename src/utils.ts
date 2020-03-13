export class Utils {
  static isHoliday(date: Date): boolean {
    const holiday: string = 'https://holidays-jp.github.io/api/v1/' + `date.getFullYear()` + '/date.json';
    const DayOfWeek: string = Utilities.formatDate(date, 'JST', 'E');
    const today:string = Utilities.formatDate(date, 'JST', 'yyyy-MM-dd').toString();
    const holidaysInfo: { [key: string]: string } = JSON.parse(UrlFetchApp.fetch(holiday).getContentText());

    Logger.log(holidaysInfo);

    if (DayOfWeek == 'Sat' || DayOfWeek == 'Sun') {
      Logger.log(today+'is holiday!!: '+ DayOfWeek);
      return true;
    }

    if (today in holidaysInfo){
      Logger.log(today+'is holiday!!: '+holidaysInfo[today]);
      return true;
    }else {
      Logger.log(today + 'is not holiday!!');
      return false;
    }
  }
}
