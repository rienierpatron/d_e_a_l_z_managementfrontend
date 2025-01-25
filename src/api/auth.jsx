import { config } from '../lib/config';
import { helper } from '@/helpers';
import Axios from 'axios';

export async function getCsrfToken(showMessage = false) {
  const response = await Axios({
    url: `${config.apiUrl}/auth/csrf`,
    method: 'GET',
    withCredentials: true,
  });

  helper.api.handleApiResponse(response, showMessage).then((res) => {
    if (res.status === 'ok') {
      helper.cookie.setCookie('_csrf', res.data.csrf_token);
    }
  });
}

export async function register(data, showMessage) {
  const response = await Axios({
    url: `${config.apiUrl}/auth/register`,
    withCredentials: true,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-csrf-token': helper.cookie.getCookie('_csrf'),
    },
    data,
  });

  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Verify Registered email verification
 * @param {object} [data]
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function verifyUserEmail(data, showMessage) {
  const response = await Axios({
    url: `${config.apiUrl}/auth/register/verify`,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data,
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Login user by email
 * @param {object} [data]
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function loginEmail(data, auth_type) {
  const response = await Axios({
    url: `${config.apiUrl}/auth/login/${auth_type}`,
    withCredentials: true,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-csrf-token': helper.cookie.getCookie('_csrf')
    },
    data,
  });
  return await helper.api.handleApiResponse(response);
}

/**
 * Verify login verification
 * @param {object} [data]
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function verifyLoginEmail(data, showMessage) {
  const response = await Axios({
    url: `${config.apiUrl}/auth/login/verify`,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data,
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Verify Invited email verification
 * @param {object} [data]
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function verifyInvitedEmail(data, showMessage) {
  const response = await Axios({
    url: `${config.apiUrl}/auth/invite/accept`,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data,
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Logout user session
 * @param {object} [data]
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function logout(showMessage) {
  const response = await Axios({
    url: `${config.apiUrl}/auth/logout`,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': helper.cookie.getAccessToken
    },
  });
  return await helper.api.handleApiResponse(response, showMessage);
}