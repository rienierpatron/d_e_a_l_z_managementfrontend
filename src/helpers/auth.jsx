import { helper } from '../helpers';

/**
 * checks if user is authenticated by checking for access token in cookie
 * @returns {boolean}
 */
export async function isAuthenticated() {
  const accessToken = helper.cookie.getAccessToken();
  if (accessToken && accessToken !== '') {
    return true;
  } else {
    return false;
  }
}