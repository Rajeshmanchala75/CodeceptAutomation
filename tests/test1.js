const { RND } = require("../pages/functions");
const should = require("chai").should();
const chance = require("chance").Chance();
let rnd = chance.string({ length: 4, numeric: true })

Feature("Orange HRM")

Scenario('Login and verifying labels', async ({ I, userlogin }) => {
    I.amOnPage(process.env.url);
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
    let firstname = 'Testing' + rnd
    let lastname = 'test' + rnd
    I.amOnPage(process.env.url);
    // await userlogin.login('Admin','admin123')
    await userlogin.login(process.env.login_username, process.env.password)
    let successM = await PIM.UserCreation(firstname, lastname, rnd, 'Password!1', 'five.jpg');
    successM.should.be.eql("Successfully Saved")
    await PIM.DeteSelection('License Expiry Date', '2022-06-25');
    await PIM.DeteSelection('Date of Birth', '1996-06-14');
    await PIM.handlingDropDown('Nationality', 'Indian');
    await PIM.handlingDropDown('Marital Status', 'Married');
    await PIM.handlingDropDown('Blood Type', 'B+');
    await I.click("//p[text()=' * Required']/..//button")
    let succesmessage = await I.grabTextFrom("//p[text()='Successfully Updated']")
    succesmessage.should.be.eql("Successfully Updated")
}).tag('chay')

Scenario('searching for user', async ({ I, userlogin, PIM }) => {
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password)
    await PIM.searchUser('Employee Id', rnd)
    await PIM.gridDatatable(rnd);
}).tag('raji')

Scenario('Add Reports ', async ({ I, userlogin, PIM }) => {
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password)
    await PIM.addReports('Rajesh'+rnd);
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
    let sucesssave=await I.grabTextFrom("//p[text()='Successfully Saved']");
    sucesssave.should.be.eql('Successfully Saved');
}).tag('a1');
 
// Scenario('reports searching',async ({I, userlogin, PIM }) =>{
//     I.amOnPage(process.env.url);
//     await userlogin.login(process.env.login_username, process.env.password)
//     I.click("//a[text()='Reports']");
//     PIM.searchUser('Report Name','Rajesh1941');
// }).tag('a3');

 //div/span[text()='" + dropdownvalue + "']
let accounts = new DataTable(['username', 'password']);
accounts.add(['Admin', 'admin123']);

Data(accounts).Scenario('Test Login',async ({I,current}) =>
{
{
    I.amOnPage(process.env.url);
    I.waitForElement("//input[@name='username']",15)
    I.fillField("//input[@name='username']",current.username);
    I.fillField("//input[@name='password']",current.password);
    await I.click("//button[@type='submit']")
    //await userlogin.login(process.env.username,process.env.password)
}
}).tag('R')

Scenario('Links verification', async ({ I, userlogin,PIM }) => {
    I.amOnPage(process.env.url);
    await userlogin.login(process.env.login_username, process.env.password)
    await userlogin.leftnavigationLinksVerfications("PIM")
    await userlogin.leftnavigationLinksVerfications("Leave")
    PIM.dateSelection('From Date',"2022-09-10");
   // PIM.dateSelection('From Date',"2022-12-10");
   // PIM.DeteSelection('To Date','2022','July','25');
}).tag("h2");

Scenario('Importing Data', async ({ I, userlogin,PIM }) => {
    I.amOnPage(process.env.url);
    const datef=new Date();
    console.log(datef.getMonth(10));
    console.log(datef.getTime());
    const d = new Date('2019-02-10')
    console.log(d.toLocaleString({month:'long'}));
    //const newDate = new Date(d)

//console.log(newDate.setMonth(5));

//console.log(new Date('2020-01-28').toLocaleString('en-us',{month:'long'}));
console.log(d.toLocaleString('en-us',{month:'short'}));
//     await userlogin.login(process.env.login_username, process.env.password);
//    let sucesstext= await PIM.configurationtab('Data Import','importData1.csv');
//    sucesstext.should.be.eql('Number of Records Imported: 1');

}).tag("h1");