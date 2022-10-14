const Helper = require('@codeceptjs/helper');

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
  }

}

module.exports = MyHelper;
