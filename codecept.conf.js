const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);
require('dotenv').config();
// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost',
      show: true,
      browser: 'chromium',
      //windowSize: "maximize",
    },
      MyHelper: {
        require: './Helpers/myhelper_helper.js',
      },

    },
  include: {
    I: './steps_file.js',
    userlogin:'./lib/ORANGEHRMFUNCTION.js',
    RND:'./pages/functions.js',
    PIM:'./lib/OrPIM.js',
    loginPage: './pages/Login.js',
  },
  name: 'CodeceptFrameWork',

  plugins: {
    autoDelay: {
      enabled: true,
    },
    allure: {
      enabled: true,
      outputDir: "./output/AlluriReports/ALReports"
    },
  },

};
