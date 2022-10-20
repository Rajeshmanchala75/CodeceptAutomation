const Helper = require('@codeceptjs/helper');
const { arrayBuffer } = require('stream/consumers');


class MyHelper extends Helper {
  async Inputfunction(fieldname, value) {
    await this.helpers.Playwright.waitForVisible("//label[text()='" + fieldname + "']/../..//input", 20);
    await this.helpers.Playwright.fillField("//label[text()='" + fieldname + "']/../..//input", value);
  }

  async calenderhandling(fieldname, datevalue) {
    datevalue = datevalue.split('-');
    let year = datevalue[0];
    let day = datevalue[2].replace(/^0+/, '');
    let monthname = new Date(datevalue[1]).toLocaleString('en-us', { month: 'long' });
    await this.helpers.Playwright.waitForElement("//label[text()='" + fieldname + "']/../..//input", 15);
    await this.helpers.Playwright.click("//label[text()='" + fieldname + "']/../..//input")
    await this.helpers.Playwright.click("(//i[@class='oxd-icon bi-caret-down-fill oxd-icon-button__icon'])[1]");
    //selecting month
    await this.helpers.Playwright.click("//li[text()='" + monthname + "']");
    await this.helpers.Playwright.click("(//i[@class='oxd-icon bi-caret-down-fill oxd-icon-button__icon'])[2]")
    //selecting year
    await this.helpers.Playwright.click("//li[text()='" + year + "']");
    //selecting date
    await this.helpers.Playwright.click("//div[text()='" + day + "']");
    let datetext = await this.helpers.Playwright.grabValueFromAll("//label[text()='" + fieldname + "']/../..//input");
    console.log(datetext);
    datetext.should.be.eql(datetext)
  }

  async handlingDownloadFile(fieldname, filename) {
    await this.helpers.Playwright.waitForElement("//a[text()='" + fieldname + "']", 10);
    await this.helpers.Playwright.handleDownloads("/downloads/" + filename + "");
    await this.helpers.Playwright.click("//a[text()='" + fieldname + "']");
    await this.helpers.FileSystem.amInPath('/output/downloads');
    await this.helpers.FileSystem.waitForFile(filename, 10);
    await this.helpers.FileSystem.seeFile(filename);
    let downloadedFileNames = await this.helpers.FileSystem.grabFileNames("/output/downloads/" + filename + "");
    //let downloadnewfilename=downloadedFileNames.filter(filenamecheck);
    //console.log(downloadnewfilename);

   
    
    let i;
    for (i = 0; i < downloadedFileNames.length; i++) {

      if (downloadedFileNames[i] == filename) {
        console.log(downloadedFileNames[i]);
      }
    }

    await this.helpers.FileSystem.seeFileNameMatching('.csv');



  }
}
module.exports = MyHelper;
