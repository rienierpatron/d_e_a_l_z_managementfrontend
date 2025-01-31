import { helper } from ".";

/**
 * checks if user is authenticated by checking for access token in cookie
 * @returns {boolean}
 */
export function isAuthenticated() {
  try {
    const accessToken = helper.cookie.getAccessToken();
    return !!accessToken;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false; // In case of any error, consider the user not authenticated.
  }
}

export async function redirectToLogin() {
  helper.cookie.deleteAccessToken()
  window.location.href = '/login'
}