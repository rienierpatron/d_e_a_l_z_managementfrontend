import { config } from "@/lib/config";
import { helper } from "@/helpers";
import Axios from "axios";

/**
 * Get payment link for a specific Stripe product price
 * @param {string} stripeProductPriceId - The ID of the Stripe product price
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function getPaymentLink(
  { stripeProductPriceId },
  showMessage = true
) {
  const response = await Axios({
    url: `${config.apiUrl}/subscription/payment-link/${stripeProductPriceId}`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    DONT_SHOW_ERROR: showMessage,
  });
  return helper.api.handleApiResponse(response);
}

/**
 * Get customer portal link
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function getCustomerPortalLink() {
  const response = await Axios({
    url: `${config.apiUrl}/subscription/customer-portal-link`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return helper.api.handleApiResponse(response);
}

/**
 * Get subscription details
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function getSubscriptionDetails(showMessage = true) {
  const response = await Axios({
    url: `${config.apiUrl}/subscription`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return helper.api.handleApiResponse(response, showMessage);
}

/**
 * Get addon payment link for a specific Stripe product price and quantity
 * @param {string} stripeProductPriceId - The ID of the Stripe product price
 * @param {number} quantity - The quantity of the addon
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function getAddonPaymentLink(stripeProductPriceId, quantity) {
  const response = await Axios({
    url: `${config.apiUrl}/subscription/addon-payment-link/${stripeProductPriceId}/${quantity}`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return helper.api.handleApiResponse(response);
}

/**
 * Get subscription plans
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function getSubscriptionPlans(showMessage = false) {
  const response = await Axios({
    url: `${config.apiUrl}/subscription/plans`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    DONT_SHOW_ERROR: true,
  });
  return helper.api.handleApiResponse(response, showMessage);
}
