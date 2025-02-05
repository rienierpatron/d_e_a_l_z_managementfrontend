import { getServerConfig } from "@/lib/config";
import { helper } from "@/helpers";
import Axios from "axios";

/**
 * Fetches location address information from the API.
 *
 * @param {Object} params - The query parameters to be sent in the GET request.
 * @param {string} params.searchText - The input text for location-based search.
 * @param {string|string[]} [params.countryCode] - An array of country codes to filter the location search. Optional.
 * @param {boolean} [showMessage=true] - Whether or not to display error messages if the request fails. Defaults to `true`.
 * @returns {Promise<Object>} - A promise that resolves to the API response, processed by `helper.api.handleApiResponse`.
 */
export async function fetchLocationAddress(params, showMessage = true) {
  const config = await getServerConfig();
  const response = await Axios({
    url: `${config.apiUrl}/location-address`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    params: params,
    DONT_SHOW_ERROR: showMessage,
  });
  return helper.api.handleApiResponse(response, showMessage);
}
