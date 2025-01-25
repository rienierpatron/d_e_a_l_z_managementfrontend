import { toast } from "react-toastify";
/**
 * check variable for empty value
 * @param value
 * @returns {boolean}
 */
export function isEmpty(value) {
  // test results
  //---------------
  // []        true, empty array
  // {}        true, empty object
  // null      true
  // undefined true
  // ""        true, empty string
  // ''        true, empty string
  // 0         false, number
  // true      false, boolean
  // false     false, boolean
  // Date      false
  // function  false

  if (value === undefined) return true;

  if (
    typeof value === 'function' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    Object.prototype.toString.call(value) === '[object Date]'
  )
    return false;

  if (value === null || value.length === 0)
    // null or 0 length array
    return true;

  if (typeof value === 'object') {
    // empty object

    let r = true;

    if (Object.keys(value).length > 0) {
      r = false;
    }

    return r;
  }

  return false;
}

/**
 * inverse of isEmpty function
 * @param value
 * @returns {boolean}
 */
export function notEmpty(value) {
  return !isEmpty(value);
}

/**
 * compare two values and returns true if match else false
 * @param str1
 * @param str2
 */
export function compareString(str1, str2) {
  if (typeof str1 !== typeof undefined && typeof str2 !== typeof undefined) {
    if (String(str1).toLowerCase() === String(str2).toLowerCase()) {
      return true;
    }
  }
  return false;
}

/**
 * alias of compareString function
 * @param str1
 * @param str2
 */
export function cmpStr(str1, str2) {
  return this.compareString(str1, str2);
}

/**
 * compare two booleans and returns true if match else false
 * @param value1
 * @param value2
 * @returns {boolean}
 */
export function compareBoolean(value1, value2) {
  if (
    typeof value1 !== typeof undefined &&
    typeof value1 !== typeof undefined
  ) {
    if (Boolean(value1) === Boolean(value2)) {
      return true;
    }
  }
  return false;
}

/**
 * alias of compareBoolean function
 * @param value1
 * @param value2
 */
export function cmpBool(value1, value2) {
  return this.compareBoolean(value1, value2);
}

/**
 * Generic alert
 * @param {string} type
 * @param {{message:string, autoClose?:number}} option
 */
export function alert(
  type = 'success',
  options = { message: '', autoCloseInSecs: 5 },
) {
  type = type || 'success';
  const toastOptions = {
    className: 'toast-' + type,
    position: 'top-center',
    autoClose: options.autoCloseInSecs * 1000,
  };
  switch (type) {
    case 'warn':
      toast.warn(options.message, toastOptions);
      break;
    case 'info':
      toast.info(options.message, toastOptions);
      break;
    case 'error':
      toast.error(options.message, toastOptions);
      break;
    default:
      toast.success(options.message, toastOptions);
  }
}

/*
Validate Email
*/
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/* 
Get Initials
*/
export const getInitials = (firstName, lastName) => {
  const firstInitial = firstName?.charAt(0).toUpperCase() || '';
  const lastInitial = lastName?.charAt(0).toUpperCase() || '';
  return `${firstInitial}${lastInitial}`;
};