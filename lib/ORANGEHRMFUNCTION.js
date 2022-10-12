const { RND, sendForm1 } = require("../pages/functions");
const { sendForm } = require("../pages/Login");
const should = require("chai").should();
const { I, loginPage } = inject();

async function login(username, password) {
    await I.Inputfunction('username', username);
    await I.Inputfunction('password', password);
    await I.click("//button[@type='submit']");
}

async function login1(usrn, pwd) {
    //using page object function 
    await loginPage.sendForm(usrn, pwd)
    await I.click("//button[@type='submit']");
}

async function labelverification(labelname) {
    I.waitForElement("//div[@class='oxd-form-row']", 15)
    I.seeElement("//label[text()='" + labelname + "']");
}

async function leftnavigationLinksVerfications(Linkname) {
    I.click("//li[@class='oxd-main-menu-item-wrapper']/../.././/span[text()='" + Linkname + "']")
   
}
async function UserCreation(firstname, lastname, empid, password) {
    I.waitForElement("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']", 10)
    I.click("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']")
    I.waitForElement("//input[@name='firstName']", 15)
    await I.attachFile('//img[@class="employee-image"]/../../../input', '/input/five.jpg')
    let employeeidpath = "//label[text()='Employee Id']/../..//input";
    I.wait(5);
    I.clearField(employeeidpath);
    I.fillField(employeeidpath, empid)
    await I.fillField("//input[@name='firstName']", firstname)
    I.fillField("//input[@name='lastName']", lastname)
    I.forceClick("//input[@type='checkbox']")
    let usernamelocator = "//label[text()='Username']/../..//input[@class='oxd-input oxd-input--active']";
    I.waitForElement(usernamelocator, 15)
    I.fillField(usernamelocator, firstname)
    let passwordpath = "/../..//input[@type='password']"
    await I.fillField("//label[text()='Password']" + passwordpath + "", password);
    await I.fillField("//label[text()='Confirm Password']" + passwordpath + "", password)
    await I.click("//button[text()=' Save ']")

    console.log(firstname);
    await I.click("//li[@class='oxd-main-menu-item-wrapper']/../.././/span[text()='PIM']")
    await I.fillField(employeeidpath, empid);
    I.wait(5);
    I.click("//button[@type='submit']")
    await I.waitForElement("//div[@class='orangehrm-container']", 10);
    await I.seeElement("//div[@role='columnheader'][contains(.,'Last Name')]/../../..//div[text()='" + lastname + "']")
}
module.exports = {
    login: login,
    labelverification: labelverification,
    leftnavigationLinksVerfications: leftnavigationLinksVerfications,
    UserCreation: UserCreation,
    login1: login1
}