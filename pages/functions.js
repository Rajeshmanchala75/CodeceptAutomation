

module.exports = {
  RND1(){
    let currentDate=new Date()
    let randnumber=currentDate.getHours() +"" + currentDate.getMinutes() +""+ currentDate.getSeconds();
return randnumber;
  },

  RND(){
    let currentDate=new Date()
    let randnumber=currentDate.getHours() +"" + currentDate.getMinutes() +""+ currentDate.getSeconds();
return randnumber;
  },
  
  RND3(){
    let currentDate=new Date()
    let randnumber=currentDate.getHours() +"" + currentDate.getMinutes() +""+ currentDate.getSeconds();
return randnumber;
  },

  fields: {
    email: "//input[@name='username']",
    password: "//input[@name='password']"
  },


  sendForm1(email, password) {
    I.waitForElement(this.fields.email,15);
    I.fillField(this.fields.email, email);
    I.fillField(this.fields.password, password);
  },

}
