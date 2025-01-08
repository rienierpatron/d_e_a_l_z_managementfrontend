import { helper } from ".";

export function cookiePrefix() {
  return 'K0A9B9XW3FG45DT8QRMZ_' + '_dealzmanagement_';
}

/**
 * get all cookies and set into an array
 * @returns {{}}
 */
export function getCookies() {
  const pairs = document.cookie.split(';');
  let cookies = {};
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    cookies[pair[0].trim()] = unescape(pair[1]);
  }
  return cookies;
}

/**
 * get cookie value by key
 * @param {string} key
 * @returns {string}
 */
export function getCookie(key) {
  const cookies = helper.cookie.getCookies();
  const cookieKey = helper.cookie.cookiePrefix() + key;
  const accessToken = cookies[cookieKey] ? cookies[cookieKey] : '';
  return accessToken;
}

/**
 * delete a cookie by key
 * @param {string} key
 */
export function deleteCookie(key) {
  document.cookie =
    helper.cookie.cookiePrefix() +
    key +
    '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
}

/**
 * store a cookie using key and value
 * @param {string} key
 * @param {string} value
 */
export function setCookie(key, value) {
  helper.cookie.deleteCookie(key);
  document.cookie = helper.cookie.cookiePrefix() + key + '=' + value + '; path=/';
}

/**
 * store access token
 * @param accessToken
 */
export function setAccessToken(accessToken) {
  helper.cookie.deleteAccessToken();
  helper.cookie.setCookie("_access_token", accessToken);
}

/**
 * delete access token
 */
export function deleteAccessToken() {
  helper.cookie.deleteCookie(helper.cookie.cookieAccessToken);
}

/**
 * get access token
 * @returns {string}
 */
export function getAccessToken() {
  return h.cookie.getCookie(h.cookie.cookieAccessToken);
}