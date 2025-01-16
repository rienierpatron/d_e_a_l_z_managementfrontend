import * as authApi from "./auth";
import * as subscriptionApi from "./subscriptions";
import * as locationAddressApi from "./location-address";
import * as preferenceApi from "./agency-preference";
import * as userApi from "./user"

export const api = {
  auth: authApi,
  subscription: subscriptionApi,
  locationAddress: locationAddressApi,
  preference: preferenceApi,
  user: userApi
};
