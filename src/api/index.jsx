import * as authApi from "./auth";
import * as subscriptionApi from "./subscriptions";
import * as locationAddressApi from "./location-address";
import * as preferenceApi from "./agency-preference";
import * as userApi from "./user"
import * as fileApi from "./file"
import * as dealzApi from "./dealz"

export const api = {
  auth: authApi,
  subscription: subscriptionApi,
  locationAddress: locationAddressApi,
  preference: preferenceApi,
  user: userApi,
  file: fileApi,
  dealz: dealzApi
};
