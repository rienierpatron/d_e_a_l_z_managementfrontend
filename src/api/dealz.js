import { helper } from "@/helpers";
import { config } from "@/lib/config";
import Axios from "axios";

/**
 * Create a new deal
 * @param {Object} payload - The data for the deal to be created
 * @param {boolean} [showMessage=true] - Whether to show a success or error message
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function createDeal(payload, showMessage = true) {
  try {
    const response = await Axios({
      url: `${config.apiUrl}/dealz`,
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      data: payload,
      DONT_SHOW_ERROR: showMessage,
    });

    return helper.api.handleApiResponse(response, showMessage);
  } catch (error) {
    console.error("Error creating deal:", error);
    throw error;
  }
}

/**
 * Get a list of deal records
 * @param {Object} params - The query parameters for the API request
 * @param {string} [params.limit=10] - The number of records to return
 * @param {string} [params.offset=0] - The starting point for the records
 * @param {string} [params.orderColumn=''] - The column to order the results by
 * @param {string} [params.orderDirection=''] - The direction of the order (ASC or DESC)
 * @param {string} [params.status=''] - The status of the deals
 * @param {string} [params.title=''] - The title of the deals
 * @param {string} [params.created_by=''] - The created_by of the deals
 * @param {string} [params.valid_date_from=''] - The start date for valid date filter
 * @param {string} [params.valid_date_to=''] - The end date for valid date filter
 * @param {string} [params.slot_date=''] - The slot date for valid date filter
 * @param {string} [params.agency_id=''] - The agency ID filter
 * @param {boolean} [showMessage=true] - Whether to show a success or error message
 * @returns {Promise<{data: Object[], status: string}>} - The response data and status from the API
 */
export async function getDealRecords(params = {}, showMessage = true) {
  try {
    const {
      limit = 10,
      offset = 0,
      orderColumn = '',
      orderDirection = '',
      status = '',
      title = '',
      valid_date_from = '',
      valid_date_to = '',
      agency_id = '',
      created_by = '',
      slot_date = '',
    } = params;

    const requestParams = {};

    if (limit) requestParams.limit = limit;
    if (offset) requestParams.offset = offset;
    if (orderColumn) requestParams.orderColumn = orderColumn;
    if (orderDirection) requestParams.orderDirection = orderDirection;
    if (status) requestParams.status = status;
    if (title) requestParams.title = title;
    if (valid_date_from) requestParams.valid_date_from = valid_date_from;
    if (valid_date_to) requestParams.valid_date_to = valid_date_to;
    if (agency_id) requestParams.agency_id = agency_id;
    if (created_by) requestParams.created_by = created_by;
    if (slot_date) requestParams.slot_date = slot_date;

    const response = await Axios({
      url: `${config.apiUrl}/dealz/records`,
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      params: requestParams, // Pass only non-empty params
      DONT_SHOW_ERROR: showMessage,
    });

    return helper.api.handleApiResponse(response, showMessage);
  } catch (error) {
    console.error("Error fetching deal records:", error);
    throw new Error(`Failed to fetch deal records: ${error.message}`);
  }
}


/**
 * View a deal by its ID
 * @param {string} dealzId - The ID of the deal to be fetched
 * @param {boolean} [showMessage=false] - Whether to show a success or error message
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function viewDealById(dealzId, showMessage = false) {
  try {
    const response = await Axios({
      url: `${config.apiUrl}/dealz/${dealzId}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return helper.api.handleApiResponse(response, showMessage);
  } catch (error) {
    throw error;
  }
}

/**
 * Edit a deal
 * @param {string|number} dealzId - The ID of the deal to edit
 * @param {Record<string, any>} payload - The data for the deal to be updated
 * @param {boolean} [showMessage=true] - Whether to show a success or error message
 * @returns {Promise<{data: object, status: string}>}
 */
export async function editDeal(dealzId, payload, showMessage = true) {
  if (!dealzId) {
    throw new Error("Invalid dealzId provided.");
  }

  try {
    const response = await Axios({
      url: `${config.apiUrl}/dealz/${dealzId}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: payload,
      DONT_SHOW_ERROR: showMessage,
    });

    return helper.api.handleApiResponse(response, showMessage);
  } catch (error) {
    console.error("Error editing deal:", error);
    throw error;
  }
}

/**
 * Delete a deal
 * @param {string|number} dealzId - The ID of the deal to delete
 * @param {boolean} [showMessage=true] - Whether to show a success or error message
 * @returns {Promise<{data: object, status: string}>}
 */
export async function deleteDeal(dealzId, showMessage = true) {
  if (!dealzId) {
    throw new Error("Invalid dealzId provided.");
  }

  try {
    const response = await Axios({
      url: `${config.apiUrl}/dealz/${dealzId}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      DONT_SHOW_ERROR: showMessage,
    });

    return helper.api.handleApiResponse(response, showMessage);
  } catch (error) {
    console.error("Error deleting deal:", error);
    throw error;
  }
}

/**
 * Create a coupon
 * @param {number} length - The length of the coupon
 * @param {boolean} [showMessage=true] - Whether to show a success or error message
 * @returns {Promise<{data: object, status: string}>}
 */
export async function createCoupon(length = 10, showMessage = false) {
  if (!length) {
    throw new Error("Invalid length provided.");
  }

  try {
    const response = await Axios({
      url: `${config.apiUrl}/dealz/coupon/${length}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      DONT_SHOW_ERROR: showMessage,
    });

    return helper.api.handleApiResponse(response, showMessage);
  } catch (error) {
    console.error("Error creating coupon:", error);
    throw error;
  }
}

