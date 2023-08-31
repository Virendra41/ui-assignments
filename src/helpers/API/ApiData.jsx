import axios from "axios";
import { autoLogoutHandler } from "../commonHelpers";
const host = window.location.hostname;

export const getHost = () => {
  switch (host) {
    case "localhost":
    case "127.0.0.1":
      return import.meta.env.VITE_APP_API;
    default:
      return import.meta.env.VITE_APP_API;
  }
};

export const BaseURL = getHost();

const defaultHeaders = {
  AdditionalParams: {},
  isJsonRequest: true,
};

const handleError = (error) => {
  if (
    error &&
    error.hasOwnProperty("response") &&
    error.response &&
    error.response.hasOwnProperty("data") &&
    error.response.data &&
    error.response.data.hasOwnProperty("error") &&
    error.response.data.error
  ) {
    return error.response.data.error;
  } else {
    return error;
  }
};

export const ApiGet = (type, AdditionalHeader) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + type, getHeaderData(AdditionalHeader))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const ApiPost = (type, userData, AdditionalHeader) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + type, userData, getHeaderData(AdditionalHeader))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const ApiPut = (type, userData, AdditionalHeader) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + type, userData, getHeaderData(AdditionalHeader))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const ApiDelete = (type, AdditionalHeader) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(BaseURL + type, getHeaderData(AdditionalHeader))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const getHttpOptions = (options = defaultHeaders) => {
  let headers = {};

  if (options.hasOwnProperty("isJsonRequest") && options.isJsonRequest) {
    headers["Content-Type"] = "application/json";
  }

  return { headers };
};

export const getHeaderData = (AdditionalHeader) => {
  let header = {
    ...getHttpOptions(),
  };
  if (AdditionalHeader) {
    header.headers = {
      ...header.headers,
      ...AdditionalHeader.headers,
    };
  }
  return header;
};
