import axios, { AxiosInstance } from 'axios';
import camelCaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';
// import { showMessage } from 'react-native-flash-message';

import configs from '@app/configs';

class Http {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: configs.api.url,
    });
    this.addInterceptors();
  }

  addInterceptors() {
    this.client.interceptors.request.use(
      config => {
        if (!config.data) {
          return config;
        }

        // TODO: be sure if there is not any other case besides multipart/form-data
        // It should convert to `snakeCaseKeys` only our properties
        if (config.headers['Content-Type'] === 'multipart/form-data') {
          return config;
        }

        const snakeCasedData = snakeCaseKeys(config.data, { deep: true });
        return { ...config, data: snakeCasedData };
      },
      error => {
        // TODO: check if working in all cases like no network, etc...
        if (!error.data) {
          return Promise.reject(error);
        }

        const camelCasedError = camelCaseKeys(error.data, { deep: true });
        return Promise.reject({ ...error, data: camelCasedError });
      },
    );

    this.client.interceptors.response.use(
      response => {
        if (!response.data) {
          return response;
        }

        const camelCasedData = camelCaseKeys(response.data, { deep: true });
        return { ...response, data: camelCasedData };
      },
      error => {
        if (!error.response) {
          return Promise.reject(error);
        }

        const camelCasedError = camelCaseKeys(error.response.data, { deep: true });
        return Promise.reject({
          ...error,
          response: {
            ...error.response,
            data: camelCasedError,
          },
        });
      },
    );
  }

  setAuthHeader(token: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  removeAuthHeader = () => {
    delete this.client.defaults.headers.common.Authorization;
  };
}

const httpInstance = new Http();

export const http = httpInstance.client;
export default httpInstance;
