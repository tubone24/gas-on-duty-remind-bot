function main() {
  
  var todayPersonInfo = getPersonsInfo();
  
  var date = new Date();
  
  if (isHoriday(date)) {
    updateTransaction();
    return true;
  }
  
  notifySlack(todayPersonInfo);
  
  updateTransaction();
 
}


function isHoriday (date) {
  const horiday = 'https://holidays-jp.github.io/api/v1/2019/date.json';
  var DayOfWeek = Utilities.formatDate(date, 'JST', 'E');
  var today = Utilities.formatDate(date, 'JST', 'yyyy-MM-dd').toString();
  var horidaysInfo = JSON.parse(UrlFetchApp.fetch(horiday).getContentText());
  
  Logger.log(horidaysInfo);
  
  if (DayOfWeek == 'Sat' || DayOfWeek == 'Sun') {
    Logger.log(today+'is horiday!!: '+ DayOfWeek);
    return true;
  }
  
  if (today in horidaysInfo){
    Logger.log(today+'is horiday!!: '+horidaysInfo[today]);
    return true;
  }else{
    Logger.log(today+'is not horiday!!');
    return false;
  }
  
}

function getPersonsInfo () {
  var transaction = SpreadsheetApp.getActive().getSheetByName('transaction');
  var tt = SpreadsheetApp.getActive().getSheetByName('tt');
  var todaysRow = transaction.getRange('A1:A1').getValue();
  
  var todaysPersonInfo = tt.getRange('B'+todaysRow+':D'+todaysRow).getValues();
  
  Logger.log(todaysPersonInfo);
  
  return todaysPersonInfo[0];
}

function notifySlack (todayPersonInfo) {
  
  const url = 'https://hooks.slack.com/services/xxxxxxxxx'
  
  var jsonData =
  {
     "username" : 'DailyBot',
    "icon_emoji": ':robot_face:',
     "text" : todayPersonInfo[2]+' 今日のRedmine担当は'+todayPersonInfo[1]+'さん！ よろしくおねがいします！！'
  };
  var payload = JSON.stringify(jsonData);

  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(url, options);
}

function updateTransaction () {
  var transaction = SpreadsheetApp.getActive().getSheetByName('transaction');
  var todaysRow = transaction.getRange('A1:A1').getValue();
  
  if (todaysRow == 9) {
    transaction.getRange('A1:A1').setValue(10)
  }else{
    transaction.getRange('A1:A1').setValue((todaysRow + 1) % 10)
  }
  
  
}
