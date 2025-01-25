import * as generalHelper from './general';
import * as apiHelper from './api';
import * as authHelper from './auth';
import * as cookieHelper from './cookie'
import * as dateHelper from './date'

export const helper = {
  general: generalHelper,
  api: apiHelper,
  auth: authHelper,
  cookie: cookieHelper,
  date: dateHelper,

  //General helper functions to expose on top level
  isEmpty: generalHelper.isEmpty,
  notEmpty: generalHelper.notEmpty,
  cmpStr: generalHelper.compareString,
  cmpBool: generalHelper.compareBoolean,
  validateEmail: generalHelper.validateEmail
};
