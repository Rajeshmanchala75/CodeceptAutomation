const Helper = require('@codeceptjs/helper');
const fs = require('fs')
//const csvtojson=require('csvtojson');
let csv = require('convert-csv-to-json');
const csvparser = require('csv-parser');
const csvtojsonV2 = require("csvtojson");
var assert = require('chai').assert


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
    // let filedata = await csvtojsonV2().fromFile(`./output/downloads/${filename}`);
    // let filedata1 = await csvtojsonV2().fromFile("./input/importData1.csv");
    // let invalidname = await csvtojsonV2().fromFile("./input/importDatanew.csv");
    // console.log(filedata);
    // console.log(filedata1);

    // assert(JSON.stringify(filedata) == JSON.stringify(filedata1),
    //   `comparision failed: actual file: ${JSON.stringify(filedata)} 
    // expected file: ${JSON.stringify(filedata1)}`);
    // await this.helpers.FileSystem.seeFileNameMatching('.csv');

    let exfiledata = await csvtojsonV2().fromFile("./input/empdata2.xlsx");
    let exfiledata1 = await csvtojsonV2().fromFile(".input/empdata1.xlsx");
   // let exinvalidname = await csvtojsonV2().fromFile("./input/importDatanew.csv");
    console.log(exfiledata);
    console.log(exfiledata1);

    assert(JSON.stringify(exfiledata) == JSON.stringify(exfiledata1),
      `comparision failed: actual file: ${JSON.stringify(exfiledata)} 
    expected file: ${JSON.stringify(exfiledata1)}`);
   // await this.helpers.FileSystem.seeFileNameMatching('.xlsx');
  }
}





module.exports = MyHelper;
