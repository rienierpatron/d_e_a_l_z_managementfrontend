import { getServerConfig } from "../lib/config";
import { helper } from "@/helpers";
import { removeDomain } from "@/lib/utils";
import Axios from "axios";

/**
 * Upload a file
 * @param {string} uploadType - The type of upload (e.g., dealz_banner, user_profile_image, agency_logo_image, etc.)
 * @param {File} file - The file to upload
 * @param {Object} options - Additional options for the upload
 * @param {string} [options.dealzId] - Optional dealz_id if required
 * @param {string} [options.couponCreationType] - Optional coupon creation type
 * @param {string} [options.couponCodeType] - Optional coupon code type
 * @param {boolean} [options.showMessage=true] - Whether to show a success or error message
 * @returns {Promise<{data: {}, status: string}>}
 */

export async function uploadFile(
  uploadType,
  file,
  {
    dealzId = null,
    couponCreationType = null,
    couponCodeType = null,
    showMessage = true,
  } = {}
) {
  const config = await getServerConfig();
  const params = new URLSearchParams();

  if (dealzId) params.append("dealz_id", dealzId);
  if (couponCreationType)
    params.append("coupon_creation_type", couponCreationType);
  if (couponCodeType) params.append("coupon_code_type", couponCodeType);

  let url = `${config.apiUrl}/upload/${uploadType}`;

  if (params.toString()?.length) {
    url = url + `?${params.toString()}`;
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await Axios({
    url,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Delete an uploaded file
 * @param {string} fileUrl - The URL of the file to be deleted
 * @param {boolean} [showMessage=false] - Whether to show a success or error message
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function deleteUploadedFile(fileUrl, showMessage = false) {
  try {
    const config = await getServerConfig();
    const response = await Axios({
      url: `${config.apiUrl}/upload`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        file_url: removeDomain(fileUrl),
      },
    });

    return helper.api.handleApiResponse(response, showMessage);
  } catch (error) {
    throw error;
  }
}

/**
 * Upload a agency_logo
 * @param {string} uploadType - The type of upload (e.g., agency_logo_image)
 * @param {File} file - The file to upload
 * @param {Object} options - Additional options for the upload
 * @param {boolean} [options.showMessage=true] - Whether to show a success or error message
 * @returns {Promise<{data: {}, status: string}>}
 */

export async function publicUpload(
  uploadType,
  file,
  { showMessage = true } = {}
) {
  const config = await getServerConfig();
  const params = new URLSearchParams();

  let url = `${config.apiUrl}/public/upload/${uploadType}`;

  if (params.toString()?.length) {
    url = url + `?${params.toString()}`;
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await Axios({
    url,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return helper.api.handleApiResponse(response, showMessage);
}
