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
    },
    DONT_SHOW_ERROR: showMessage,
  });
  return helper.api.handleApiResponse(response, showMessage);
}
