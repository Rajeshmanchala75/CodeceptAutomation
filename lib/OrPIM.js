const { RND1, RND, RND3 } = require("../pages/functions");

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
    await I.click("//button[text()=' Save ']")
    let succesmessage = await I.grabTextFrom("//p[text()='Successfully Saved']")
    return succesmessage;
}
//serching for user
async function searchUser(labelfieldname, value) {
    if (labelfieldname == 'Employee Name'
        || labelfieldname == 'Employee Id' ||
        labelfieldname == 'Supervisor Name') {

        I.waitForElement("//div[@class='oxd-form-row']", 15)
        I.seeElement("//label[text()='" + labelfieldname + "']")
        I.fillField("//label[text()='" + labelfieldname + "']/../..//input", value);
    }
    else {
        let locator = "//label[text()='" + labelfieldname + "']"
        I.waitForElement("" + locator + "/../..//div[@class='oxd-select-text oxd-select-text--active']", 15)
        await I.click("" + locator + "/../..//div[@class='oxd-select-text oxd-select-text--active']");
        I.waitForElement("//div/span[text()='" + value + "']", 10);
        await I.click("//div/span[text()='" + value + "']");
    }
    await I.forceClick("//button[@type='submit']")
}


async function dateSelection(fieldname, datevalue) {

    const d = new Date(datevalue)
    let monthname=d.toLocaleString('en-us',{month:'long'});
    
        datevalue = datevalue.split('-');
    let year = datevalue[0];
    let day = datevalue[2];
   
    I.waitForElement("//label[text()='" + fieldname + "']/../..//input", 15);
    I.click("//label[text()='" + fieldname + "']/../..//input")
    I.click("(//i[@class='oxd-icon bi-caret-down-fill oxd-icon-button__icon'])[1]");

    //selecting month
        I.click("//li[text()='" +monthname+"']");
    I.click("(//i[@class='oxd-icon bi-caret-down-fill oxd-icon-button__icon'])[2]")
    //selecting year
    I.click("//li[text()='" + year + "']");
    //selecting date
    I.click("//div[text()='" + day + "']");
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
    await I.waitForElement("//div[@class='orangehrm-container']", 10);
    I.wait(5)
    let headercount = await I.grabNumberOfVisibleElements("//div[@class='oxd-table-cell oxd-padding-cell']");
    for (i = 2; i <= headercount - 1; i++) {
        let rolenames = await I.grabTextFrom("//div[@class='oxd-table-cell oxd-padding-cell'][" + i + "]");
        if (rolenames == fieldname) {
            console.log(rolenames);
            rolenames.should.be.eql(fieldname);
        }
    }
}

async function addReports(reportname) {
    I.waitForElement("//a[text()='Reports']", 10);
    I.click("//a[text()='Reports']");
    I.seeElement("//h5[text()='Employee Reports']");
    I.click("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
    I.waitForElement("//h6[text()='Add Report']", 10);
    I.fillField("//label[text()='Report Name']/../..//input", reportname);
}

async function attachingfile(filename) {
    await I.attachFile('//img[@class="employee-image"]/../../../input', "/input/" + filename);
}
async function configurationtab(configtype, filename) {
    await I.click("//span[text()='Configuration ']");
    await I.waitForElement("//ul[@class='oxd-dropdown-menu']", 10)
    await I.click("//li/a[text()='" + configtype + "']");
    I.seeElement("//p[text()='Data Import']");
    I.seeElement("//button[text()=' Upload ']");
    await I.attachFile("//div[text()='Browse']/../..//input", "/input/" + filename);
    await I.click("//button[text()=' Upload ']");
    let successtext = await I.grabTextFrom("//p[text()='Number of Records Imported: 1']");
    return successtext;

}
module.exports = {
    UserCreation: UserCreation,
    dateSelection: dateSelection,
    handlingDropDown: handlingDropDown,
    searchUser: searchUser,
    gridDatatable: gridDatatable,
    addReports: addReports,
    attachingfile: attachingfile,
    configurationtab: configurationtab
}