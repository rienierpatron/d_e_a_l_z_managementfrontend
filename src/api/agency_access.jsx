import { getServerConfig } from "@/lib/config";
import { helper } from "@/helpers";
import Axios from "axios";

/**
 * Fetches access to all agencies for a user.
 * 
 * This function makes a GET request to the `/staff/dealz/records` endpoint 
 * to retrieve all the dealz records. The access token is included in the 
 * headers to authenticate the request.
 * 
 * @param {boolean} [showMessage=false] - Whether or not to display any messages based on the response.
 * @returns {Promise<{data: {}, status: string}>} - The API response with `data` and `status`.
 */
export async function getUserListAgencies(showMessage = false) {
  const config = await getServerConfig();
  const response = await Axios({
    url: `${config.apiUrl}/user/agencies`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-access-token": helper.cookie.getAccessToken(),
    },
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Fetches access to all agencies for a user.
 * 
 * This function makes a GET request to the `/staff/dealz/records` endpoint 
 * to retrieve all the dealz records. The access token is included in the 
 * headers to authenticate the request.
 * 
 * @param {boolean} [showMessage=false] - Whether or not to display any messages based on the response.
 * @returns {Promise<{data: {}, status: string}>} - The API response with `data` and `status`.
 */
export async function switchAgency(agency_id, showMessage = false) {
  const config = await getServerConfig();
  const response = await Axios({
    url: `${config.apiUrl}/agency/switch/${agency_id}`,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "x-access-token": helper.cookie.getAccessToken(),
    },
  });
  return helper.api.handleApiResponse(response, showMessage);
}