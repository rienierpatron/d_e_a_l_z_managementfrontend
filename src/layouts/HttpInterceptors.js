import React, { useEffect } from "react";
import Axios from "axios";
import { helper } from "@/helpers";

export default function HttpInterceptors() {
  useEffect(() => {
    const requestInterceptor = Axios.interceptors.request.use(
      (config) => {
        let accessToken = helper.cookie.getAccessToken();
        config.headers = config.headers ? config.headers : {};
        if (helper.notEmpty(accessToken)) {
          config.headers["x-access-token"] = accessToken;
        }
        return config;
      },
      async (error) => {
        await helper.api.handleApiResponse(error.response);
      }
    );
    const responseInterceptor = Axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const dontShowError = error.response?.config?.DONT_SHOW_ERROR;
        return await helper.api.handleApiResponse(error.response, !dontShowError);
      }
    );
    return () => {
      Axios.interceptors.request.eject(requestInterceptor);
      Axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);
  return <div></div>;
}
