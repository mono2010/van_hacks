// the purpose of this function is to use regular expression to scrape small to medium sized text files via url from --
// the VAN report manager feature
// use Google App Script documentation to get started https://developers.google.com/apps-script/
// Google Scripts can take advantage of OAuth 2.0 so it's a fairly secure way to move data
// use time based triggers to automate data transfer, it's like our very own Stork!!!
// keep in mind that Google Apps Scripts does have transfer quotas https://developers.google.com/apps-script/guides/services/quotas --
// so don't use this to move large amounts of data

function update_[which metric are you updating]() { //name your function
  var label = GmailApp.getUserLabelByName("van_reports/[insert gmail label here]"); //use gmail labels to help classify differen reports
  var threads = label.getThreads(0,1)[0];
  var count = threads.getMessageCount()-1;
  var message = threads.getMessages()[count];
  var body = message.getPlainBody();
  var link = body.match(/\<(.*)\>/).pop(); //use regular expression to scrape VAN Report email, this expression should capture anything 
// between <> in case VAN decides to change the download url structure
  var file = UrlFetchApp.fetch(link);
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  var sheet = SpreadsheetApp.openById("[insert google sheets id]"); // link to relevant google sheet
  var first = sheet.getSheetByName("Sheet1");
  first.clearContents().clearFormats(); //wipe data before loading
  first.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData); // load data
  
  Logger.log(link); // use the logger.log function to debug your code
}
