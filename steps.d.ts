/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type userlogin = typeof import('./lib/ORANGEHRMFUNCTION.js');
type MyHelper = import('./Helpers/myhelper_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, userlogin: userlogin }
  interface Methods extends Playwright, MyHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<MyHelper> {}
  namespace Translation {
    interface Actions {}
  }
}
