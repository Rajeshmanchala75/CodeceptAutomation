const Helper = require('@codeceptjs/helper');

class MyHelper extends Helper {
  async Inputfunction(email, value) {
    await this.helpers.Playwright.waitForVisible("//input[@name='" + email + "']", 30);
    await this.helpers.Playwright.fillField("//input[@name='" + email + "']", value);
  }
}

module.exports = MyHelper;
