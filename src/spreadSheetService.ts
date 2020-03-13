export class SpreadSheetService {
  private readonly transaction: GoogleAppsScript.Spreadsheet.Sheet;
  private readonly tt: GoogleAppsScript.Spreadsheet.Sheet;
  private readonly todaysRow: number;
  private readonly todaysPersonInfo: string[][];
  constructor(){
    this.transaction = SpreadsheetApp.getActive().getSheetByName('transaction');
    this.tt = SpreadsheetApp.getActive().getSheetByName('tt');
    this.todaysRow = this.transaction.getRange('A1:A1').getValue();
    this.todaysPersonInfo = this.tt.getRange('B'+this.todaysRow+':D'+this.todaysRow).getValues();
  }

  getPersonsInfo(): string[] {
    Logger.log(this.todaysPersonInfo);
    return this.todaysPersonInfo[0];
  }

  updateTransaction(): void {
    if (this.todaysRow == 9) {
      this.transaction.getRange('A1:A1').setValue(10);
    }else{
      this.transaction.getRange('A1:A1').setValue((this.todaysRow + 1) % 10);
    }
  }
}
