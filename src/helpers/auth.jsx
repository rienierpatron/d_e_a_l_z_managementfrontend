import { helper } from ".";

/**
 * checks if user is authenticated by checking for access token in cookie
 * @returns {boolean}
 */
export async function isAuthenticated() {
  try {
    const accessToken = helper.cookie.getAccessToken(); // Assuming helper.cookie.getAccessToken() returns the access token.
    return !!accessToken; // Return true if accessToken exists and is truthy, false otherwise.
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false; // In case of any error, consider the user not authenticated.
  }
}

export async function redirectToLogin() {
  window.location.href = '/login'
}