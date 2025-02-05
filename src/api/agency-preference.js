import { getServerConfig } from "@/lib/config";
import { helper } from "@/helpers";
import Axios from "axios";

/**
 * Function to save agency preference
 * @param {object} formData
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function saveAgencyPreference(formData, showMessage = true) {
  const config = await getServerConfig();
  const response = await Axios({
    url: `${config.apiUrl}/agency-preference`,
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
    data: formData,
    DONT_SHOW_ERROR: showMessage,
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Function to save agency preference
 * @param {object} agencyId - agency ID
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function getAgencyPreference(agencyId, showMessage = true) {
  const config = await getServerConfig();
  const response = await Axios({
    url: `${config.apiUrl}/agency-preference/${agencyId}`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    DONT_SHOW_ERROR: showMessage,
  });
  return helper.api.handleApiResponse(response, showMessage);
}