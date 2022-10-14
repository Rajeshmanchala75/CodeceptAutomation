/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type userlogin = typeof import('./lib/ORANGEHRMFUNCTION.js');
type RND = typeof import('./pages/functions.js');
type PIM = typeof import('./lib/OrPIM.js');
type loginPage = typeof import('./pages/Login.js');
type MyHelper = import('./Helpers/myhelper_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, userlogin: userlogin, RND: RND, PIM: PIM, loginPage: loginPage }
  interface Methods extends Playwright, MyHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<MyHelper> {}
  namespace Translation {
    interface Actions {}
  }
}
