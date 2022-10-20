const { RND } = require("../pages/functions");
const should = require("chai").should();
const chance = require("chance").Chance();
let rnd = chance.string({ length: 4, numeric: true })
let rndname = chance.name()
const fs = require('fs');

Feature("Orange HRM")

Scenario('login and verifying labels', async ({ I, userlogin }) => {
    await I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password)
    await userlogin.labelverification("Employee Name");
    await userlogin.labelverification("Employee Id");
    await userlogin.labelverification("Employment Status");
    await userlogin.labelverification("Include");
    await userlogin.labelverification("Job Title");
}).tag("a2");

Scenario('Links verification', async ({ I, userlogin }) => {
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password)
    await userlogin.leftnavigationLinksVerfications("Admin")
    await userlogin.leftnavigationLinksVerfications("PIM")
    await userlogin.leftnavigationLinksVerfications("Leave")
    await userlogin.leftnavigationLinksVerfications("Time")
    await userlogin.leftnavigationLinksVerfications("My Info")
    await userlogin.leftnavigationLinksVerfications("Directory")
    await userlogin.leftnavigationLinksVerfications("Recruitment")
    await userlogin.leftnavigationLinksVerfications("Performance")
    await userlogin.leftnavigationLinksVerfications("Dashboard")
    await userlogin.leftnavigationLinksVerfications("Buzz")
    await userlogin.leftnavigationLinksVerfications("Maintenance")
}).tag("viyaan1");

Scenario('Creating User', async ({ I, userlogin, PIM }) => {
    let firstname = 'FN' + rndname
    let lastname = 'LN' + rndname
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password)
    await PIM.UserCreation(firstname, lastname, rnd, 'Password!1', 'five.jpg');
    let successmessage = await PIM.savebutton('Successfully Saved');
    successmessage.should.be.eql("Successfully Saved");
    await PIM.dateSelection('License Expiry Date', '2022-06-25');
    await PIM.dateSelection('Date of Birth', '1996-06-14');
    await PIM.handlingDropDown('Nationality', 'Indian');
    await PIM.handlingDropDown('Marital Status', 'Married');
    await PIM.handlingDropDown('Blood Type', 'B+');
    await I.click("//p[text()=' * Required']/..//button")
    let succesmessage = await I.grabTextFrom("//p[text()='Successfully Updated']")
    succesmessage.should.be.eql("Successfully Updated")
    await PIM.searchUser('Employee Name', firstname, 'PIM');
    await PIM.gridDatatable(rnd);
    await PIM.gridDatatable(firstname + " ");
    await PIM.gridDatatable(lastname);
}).tag('c1');

Scenario('searching for user', async ({ I, userlogin, PIM }) => {
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password);
    await PIM.searchUser('Employee Id', rnd, 'PIM');
    await PIM.gridDatatable(rnd);
}).tag('chay')

Scenario('Add Reports ', async ({ I, userlogin, PIM }) => {
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password)
    await PIM.addReports('Rajesh' + rnd);
    await PIM.handlingDropDown('Selection Criteria', 'Pay Grade');
    I.wait(10);
    await PIM.handlingDropDown('Include', 'Current Employees Only');
    I.wait(10);
    await PIM.handlingDropDown('Select Display Field Group', 'Personal');
    await PIM.handlingDropDown('Select Display Field', 'Employee Id');
    await I.click("//button[text()=' Save ']")
    let warningmessage = await I.grabTextFrom("//p[text()='At least one display field should be added']")
    warningmessage.should.be.eql('At least one display field should be added');
    I.click("//h6[text()='Display Fields']/..//i[@class='oxd-icon bi-plus']");
    await PIM.handlingDropDown('Select Display Field', 'Employee First Name');
    await I.click("//button[text()=' Save ']")
    let sucesssave = await I.grabTextFrom("//p[text()='Successfully Saved']");
    sucesssave.should.be.eql('Successfully Saved');
}).tag('a1');

let accounts = new DataTable(['username', 'password']);
accounts.add(['Admin', 'admin123']);

Data(accounts).Scenario('Test Login', async ({ I, current }) => {
    {
        I.amOnPage(process.env.url);
        I.waitForElement("//input[@name='username']", 15)
        I.fillField("//input[@name='username']", current.username);
        I.fillField("//input[@name='password']", current.password);
        await I.click("//button[@type='submit']")
    }
}).tag('R');

Scenario('Importing Data', async ({ I, userlogin, PIM }) => {
    let filename = 'importdata' + rnd + '.csv';
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password);
    await PIM.configurationtab();
    await PIM.importingdata('Data Import', 'importData1.csv', filename);
}).tag("h11");

Scenario('Verifying Optional Fields', async ({ I, userlogin, PIM }) => {
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password);
    await PIM.configurationtab();
    await PIM.optionalfields('Optional Fields');
    let successmessage = await PIM.savebutton('Successfully Saved');
    successmessage.should.be.eql("Successfully Saved");
}).tag("h5");

Scenario('Verify custom Fields', async ({ I, userlogin, PIM }) => {
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password);
    await PIM.configurationtab();
    await PIM.customfields('Custom Fields', 'Rajesh' + rnd);
    await PIM.handlingDropDown('Screen', 'Personal Details');
    await PIM.handlingDropDown('Type', 'Text or Number');
    await PIM.handlingDropDown('Type', 'Drop Down');
    I.fillField("//label[text()='Select Options']/../..//input", 'Ra1' + rnd);
    let successmessage = await PIM.savebutton('Successfully Saved');
    successmessage.should.be.eql("Successfully Saved");
    await PIM.gridDatatable('Rajesh' + rnd);
}).tag("h6");

Scenario('verify Reporting Methods', async ({ I, userlogin, PIM }) => {
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password);
    await PIM.configurationtab();
    await PIM.reportingmethods('Reporting Methods', 'Rajesh' + rnd);
    let successmessage = await PIM.savebutton('Successfully Saved');
    successmessage.should.be.eql("Successfully Saved");
    await PIM.gridDatatable('Rajesh' + rnd);
}).tag("h7");

Scenario('verify termination reasons', async ({ I, userlogin, PIM }) => {
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password);
    await PIM.configurationtab();
    await PIM.terminationreasons('Termination Reasons', 'Rajesh' + rnd);
    let successmessage = await PIM.savebutton('Successfully Saved');
    successmessage.should.be.eql("Successfully Saved");
    await PIM.gridDatatable('Rajesh' + rnd);
}).tag("h8");

Scenario('calendar checking from helpers', async ({ I, userlogin, PIM }) => {
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password)
    await userlogin.leftnavigationLinksVerfications("Admin")
    await userlogin.leftnavigationLinksVerfications("PIM")
    await userlogin.leftnavigationLinksVerfications("Leave")
    await I.calenderhandling('From Date', '2021-10-02');
    I.wait(2);
    await PIM.dateSelection("From Date", '2021-10-01');


}).tag('h9');


