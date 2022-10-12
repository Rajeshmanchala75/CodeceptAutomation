const { I } = inject();

module.exports = {

  fields: {
    email1: "//input[@name='username']",
    password1: "//input[@name='password']"
  },


  sendForm(email, password)
  
   {
    I.waitForElement(this.fields.email1,15);
    I.fillField(this.fields.email1, email);
    I.fillField(this.fields.password1, password);
    //return sendForm;
  },

}
