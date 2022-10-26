const { RND1, RND, RND3 } = require("../pages/functions");
const fs = require('fs');
const { I } = inject();
const should = require("chai").should();


async function UserCreation(firstname, lastname, empid, password, filename) {
    I.waitForElement("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']", 10)
    I.click("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']")
    I.waitForElement("//input[@name='firstName']", 15)
    await I.attachFile('//img[@class="employee-image"]/../../../input', "/input/" + filename);
    let employeeidpath = "//label[text()='Employee Id']/../..//input";
    I.wait(5);
    await I.fillField("//input[@name='firstName']", firstname)
    I.fillField("//input[@name='lastName']", lastname)
    I.clearField(employeeidpath);
    I.fillField(employeeidpath, empid)
    I.forceClick("//input[@type='checkbox']")
    let usernamelocator = "//label[text()='Username']/../..//input[@class='oxd-input oxd-input--active']";
    I.waitForElement(usernamelocator, 15)
    await I.checkOption("Enabled");
    I.fillField(usernamelocator, firstname)
    let passwordpath = "/../..//input[@type='password']"
    await I.fillField("//label[text()='Password']" + passwordpath + "", password);
    await I.fillField("//label[text()='Confirm Password']" + passwordpath + "", password)
}
//serching for user
async function searchUser(labelfieldname, value, Linkname) {
    await I.waitForElement("//li[@class='oxd-main-menu-item-wrapper']/../.././/span[text()='" + Linkname + "']", 10);
    await I.click("//li[@class='oxd-main-menu-item-wrapper']/../.././/span[text()='" + Linkname + "']")

    if (labelfieldname == 'Employee Id' ||
        labelfieldname == 'Supervisor Name') {

        I.waitForElement("//div[@class='oxd-form-row']", 15)
        I.seeElement("//label[text()='" + labelfieldname + "']")
        I.fillField("//label[text()='" + labelfieldname + "']/../..//input", value);
    }
    else if (labelfieldname == 'Employee Name') {

        I.waitForElement("//div[@class='oxd-form-row']", 15)
        I.seeElement("//label[text()='" + labelfieldname + "']")
        I.fillField("//label[text()='" + labelfieldname + "']/../..//input", value);
        I.wait(5);
        I.waitForElement("//div[@class='oxd-autocomplete-option']", 5);
        I.click("//div[@class='oxd-autocomplete-option']");
    }
    else {
        let locator = "//label[text()='" + labelfieldname + "']"
        I.waitForElement("" + locator + "/../..//div[@class='oxd-select-text oxd-select-text--active']", 15)
        await I.click("" + locator + "/../..//div[@class='oxd-select-text oxd-select-text--active']");
        I.waitForElement("//div/span[text()='" + value + "']", 10);
        await I.click("//div/span[text()='" + value + "']");
    }
    I.wait(2);
    await I.click("//button[@type='submit']");
}


async function dateSelection(fieldname, datevalue) {

    datevalue = datevalue.split('-');
    let year = datevalue[0];
    let day = datevalue[2].replace(/^0+/, '');

    let monthname = new Date(datevalue[1]).toLocaleString('en-us', { month: 'long' });
    I.waitForElement("//label[text()='" + fieldname + "']/../..//input", 15);
    I.click("//label[text()='" + fieldname + "']/../..//input")
    I.click("(//i[@class='oxd-icon bi-caret-down-fill oxd-icon-button__icon'])[1]");

    //selecting month
    I.click("//li[text()='" + monthname + "']");
    I.click("(//i[@class='oxd-icon bi-caret-down-fill oxd-icon-button__icon'])[2]")
    //selecting year
    I.click("//li[text()='" + year + "']");
    //selecting date
    I.click("//div[text()='" + day + "']");
    let datetext = await I.grabValueFromAll("//label[text()='" + fieldname + "']/../..//input");
    console.log(datetext);
    datetext.should.be.eql(datetext);
}

//selecting dropdown values
async function handlingDropDown(dropdownlabelname, dropdownvalue) {
    let locator = "//label[text()='" + dropdownlabelname + "']"
    await I.waitForElement("" + locator + "/../..//div[@class='oxd-select-text oxd-select-text--active']", 15)
    await I.click("" + locator + "/../..//div[@class='oxd-select-text oxd-select-text--active']");
    await I.waitForElement("//div/span[text()='" + dropdownvalue + "']", 10);
    await I.click("//div/span[text()='" + dropdownvalue + "']");
}

async function gridDatatable(fieldname) {
    await I.waitForElement("//div[@class='orangehrm-container']", 30);

    let locator = "//div[@class='oxd-table-cell oxd-padding-cell']/..//div[text()='" + fieldname + "']"
    I.waitForElement(locator, 10);
    I.seeElement(locator);
    let checkoptionlocator = "//i[@class='oxd-icon bi-check oxd-checkbox-input-icon']";
    I.waitForElement(checkoptionlocator, 10);
    I.checkOption(checkoptionlocator);
    I.waitForElement("//i[@class='oxd-icon bi-trash-fill oxd-button-icon']", 10);
    I.seeElement("//i[@class='oxd-icon bi-trash-fill oxd-button-icon']");
    I.uncheckOption(checkoptionlocator);
    let fieldtext = await I.grabTextFrom(locator);
    fieldtext.should.be.eql(fieldname);
}

async function addReports(reportname) {
    I.waitForElement("//a[text()='Reports']", 10);
    I.click("//a[text()='Reports']");
    I.seeElement("//h5[text()='Employee Reports']");
    I.click("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
    I.waitForElement("//h6[text()='Add Report']", 10);
    I.fillField("//label[text()='Report Name']/../..//input", reportname);
}


async function configurationtab() {
    await I.waitForElement("//span[text()='Configuration ']", 10);
    await I.click("//span[text()='Configuration ']");
    await I.waitForElement("//ul[@class='oxd-dropdown-menu']", 10)
}

async function importingdata(configtype, inputfilename, templatefilename) {
    await I.click("//li/a[text()='" + configtype + "']");
    await I.seeElement("//p[text()='Data Import']");
    await I.seeElement("//button[text()=' Upload ']");
    await I.handlingDownloadFile('Download', templatefilename);
    I.wait(2);
    await I.attachFile("//div[text()='Browse']/../..//input", "/input/" + inputfilename);
    await I.click("//button[text()=' Upload ']");
    I.waitForInvisible(`//div[@class="oxd-loading-spinner-container"]`);
    I.waitForElement("//p[text()='Number of Records Imported: 1']", 20);
    let successtext = await I.grabTextFrom("//p[text()='Number of Records Imported: 1']");
    return successtext;
}

async function optionalfields(configtype) {
    I.waitForElement("//a[text()='" + configtype + "']", 10);
    I.click("//a[text()='" + configtype + "']");
    I.wait(2);
    let locatorscount = await I.grabNumberOfVisibleElements("//p[@class='oxd-text oxd-text--p orangehrm-optional-field-label']")
    let locarortext = await I.grabTextFromAll("//p[@class='oxd-text oxd-text--p orangehrm-optional-field-label']");
    for (i = 0; i < locatorscount; i++) {
        await I.uncheckOption("//p[text()='" + locarortext[i] + "']/..//input");
        I.wait(2);
        await I.checkOption("//p[text()='" + locarortext[i] + "']/..//input");
        I.wait(2);
    }
}

async function customfields(configtype, value) {
    I.waitForElement("//a[text()='" + configtype + "']", 10);
    I.click("//a[text()='" + configtype + "']");
    I.waitForElement("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']", 10);
    I.seeElement("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
    I.click("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
    I.seeElement("//h6[text()='Add Custom Field']");
    I.fillField("//label[text()='Field Name']/../..//input", value);
}

async function savebutton(fieldtext) {
    I.waitForElement("//button[text()=' Save ']")
    I.seeElement("//button[text()=' Save ']");
    I.click("//button[text()=' Save ']");
    let Successfullysave = await I.grabTextFrom("//p[text()='" + fieldtext + "']")
    return Successfullysave;
}
async function reportingmethods(configtype, value) {
    I.waitForElement("//a[text()='" + configtype + "']", 10);
    I.click("//a[text()='" + configtype + "']");
    I.waitForElement("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']", 10);
    I.seeElement("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
    I.click("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
    I.waitForElement("//p[text()='Add Reporting Method']", 10);
    I.seeElement("//p[text()='Add Reporting Method']");
    I.fillField("//label[text()='Name']/../..//input", value);
}

async function terminationreasons(configtype, value) {
    I.waitForElement("//a[text()='" + configtype + "']", 10);
    I.click("//a[text()='" + configtype + "']");
    I.waitForElement("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']", 10);
    I.seeElement("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
    I.click("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
    I.waitForElement("//p[text()='Add Termination Reason']", 10);
    I.seeElement("//p[text()='Add Termination Reason']");
    I.fillField("//label[text()='Name']/../..//input", value);
}

module.exports = {
    UserCreation: UserCreation,
    dateSelection: dateSelection,
    handlingDropDown: handlingDropDown,
    searchUser: searchUser,
    gridDatatable: gridDatatable,
    addReports: addReports,
    configurationtab: configurationtab,
    importingdata: importingdata,
    optionalfields: optionalfields,
    customfields: customfields,
    savebutton: savebutton,
    reportingmethods: reportingmethods,
    terminationreasons: terminationreasons

}