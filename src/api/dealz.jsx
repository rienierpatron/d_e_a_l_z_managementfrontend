import { config } from "@/lib/config";
import { helper } from "@/helpers";
import Axios from "axios";

/**
 * Fetches all dealz records for the super admin.
 * 
 * This function makes a GET request to the `/staff/dealz/records` endpoint 
 * to retrieve all the dealz records. The access token is included in the 
 * headers to authenticate the request.
 * 
 * @param {boolean} [showMessage=false] - Whether or not to display any messages based on the response.
 * @returns {Promise<{data: {}, status: string}>} - The API response with `data` and `status`.
 */
export async function getAllSuperAdminDealzRecords(showMessage = false) {
  const response = await Axios({
    url: `${config.apiUrl}/staff/dealz/records`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-access-token": helper.cookie.getAccessToken(),
    },
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Fetches the details of a specific dealz record.
 * 
 * This function makes a GET request to the `/staff/dealz/{dealz_id}` endpoint 
 * to retrieve the details of a single dealz record identified by the provided `dealz_id`.
 * The access token is included in the headers for authentication.
 * 
 * @param {string} dealz_id - The unique identifier for the dealz record.
 * @param {boolean} [showMessage=false] - Whether or not to display any messages based on the response.
 * @returns {Promise<{data: {}, status: string}>} - The API response with `data` and `status`.
 */
export async function getDealzSuperAdminRecordDetail(dealz_id, showMessage = false) {
  const response = await Axios({
    url: `${config.apiUrl}/staff/dealz/${dealz_id}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-access-token": helper.cookie.getAccessToken(),
    },
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Updates a specific dealz record with new data.
 * 
 * This function makes a PUT request to the `/staff/dealz/{dealz_id}` endpoint 
 * to update a dealz record identified by `dealz_id`. The updated data is provided
 * in the `data` object, and the CSRF token is included in the headers to protect against CSRF attacks.
 * 
 * @param {object} data - The data to update the dealz record with.
 * @param {string} dealz_id - The unique identifier for the dealz record.
 * @param {boolean} [showMessage=true] - Whether or not to display any messages based on the response.
 * @returns {Promise<{data: {}, status: string}>} - The API response with `data` and `status`.
 */
export async function updateSuperAdminDealzRecord(data, dealz_id, showMessage = true) {
  const response = await Axios({
    url: `${config.apiUrl}/staff/dealz/${dealz_id}`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "x-access-token": helper.cookie.getAccessToken(),
    },
    data,
  });
  return await helper.api.handleApiResponse(response, showMessage);
}

/**
 * Updates status of Dealz Record
 * 
 * This function makes a PUT request to the `/staff/dealz/{dealz_id}` endpoint 
 * to update a dealz record identified by `dealz_id`. The updated data is provided
 * in the `data` object, and the CSRF token is included in the headers to protect against CSRF attacks.
 * 
 * @param {object} data - The data to update the dealz record with.
 * @param {string} dealz_id - The unique identifier for the dealz record.
 * @param {boolean} [showMessage=true] - Whether or not to display any messages based on the response.
 * @returns {Promise<{data: {}, status: string}>} - The API response with `data` and `status`.
 */
export async function updateSuperAdminStatusDealzRecord(data, dealz_id, showMessage = true) {
  const response = await Axios({
    url: `${config.apiUrl}/staff/dealz/status/${dealz_id}`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "x-access-token": helper.cookie.getAccessToken(),
    },
    data,
  });
  return await helper.api.handleApiResponse(response, showMessage);
}