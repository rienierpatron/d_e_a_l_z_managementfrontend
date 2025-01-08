import * as generalHelper from './general';
import * as apiHelper from './api';
import * as authHelper from './auth';
import * as cookieHelper from './cookie'

export const helper = {
  general: generalHelper,
  api: apiHelper,
  auth: authHelper,
  cookie: cookieHelper,

  //General helper functions to expose on top level
  notEmpty: generalHelper.notEmpty,
  cmpStr: generalHelper.compareString,
  cmpBool: generalHelper.compareBoolean,
  validateEmail: generalHelper.validateEmail
};
