import { config } from "@/lib/config";
import { helper } from "@/helpers";
import Axios from "axios";

/**
 * Function to get current user profile data
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function getCurrentUser(showMessage = true) {
  const response = await Axios({
    url: `${config.apiUrl}/user/profile`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-access-token": helper.cookie.getAccessToken(),
    },
    DONT_SHOW_ERROR: showMessage,
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Get all the users in an agency
 * @param {object} [data]
 * @param {object} [params]
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function getAllAgencyUsers(showMessage = true) {
  const response = await Axios({
    url: `${config.apiUrl}/agency/user/list`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-access-token": helper.cookie.getAccessToken(),
    },
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Invite a user to the agency
 * @param {object} [data]
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function inviteAgencyUser(data, showMessage = true) {
  const response = await Axios({
    url: `${config.apiUrl}/agency/user/invite`,
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": helper.cookie.getAccessToken(),
    },
    DONT_SHOW_ERROR: showMessage,
    data,
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Invite All pending user to the agency
 * @param {object} [data]
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function inviteAllPendingAgencyUser(showMessage = true) {
  const response = await Axios({
    url: `${config.apiUrl}/agency/users/invite/resend/all`,
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": helper.cookie.getAccessToken(),
    },
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Invite selected pending user to the agency
 * @param {object} [data]
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function inviteSelectedPendingAgencyUser(data, showMessage) {
  const response = await Axios({
    url: `${config.apiUrl}/agency/user/invite/resend/selected`,
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": helper.cookie.getAccessToken(),
    },
    data,
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Delete a user
 * @param {object} [data]
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function deleteAgencyUser(AgencyUserId, showMessage = true) {
  const response = await Axios({
    url: `${config.apiUrl}/agency/user/${AgencyUserId}`,
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": helper.cookie.getAccessToken(),
    },
    DONT_SHOW_ERROR: showMessage,
  });
  return helper.api.handleApiResponse(response, showMessage);
}
