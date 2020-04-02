import axios, { AxiosInstance } from 'axios';
import camelCaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';
// import { showMessage } from 'react-native-flash-message';

import configs from '@app/configs';

class Http {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: configs.api.url + 'oo',
    });
    this.addInterceptors();
  }

  addInterceptors() {
    this.client.interceptors.request.use(
      config => {
        if (!config.data) {
          return config;
        }

        // TODO: check if there is no any other case besides multipart/form-data
        // It should convert to `snakeCaseKeys` only our properties
        if (
          config.headers['Content-Type'] &&
          config.headers['Content-Type'].includes('multipart/form-data')
        ) {
          return config;
        }

        const snakeCasedData = snakeCaseKeys(config.data, { deep: true });
        config.data = snakeCasedData;
        return config;
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
          // return error;
          return Promise.reject(error);
        }

        try {
          const camelCasedError = camelCaseKeys(error.response.data, { deep: true });
          error.response.data = camelCasedError;
        } catch (e) {
          return Promise.reject(error);
        }

        return Promise.reject(error);
      },
    );
  }

  setAuthHeader(token: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  setLanguageHeader(language: string) {
    this.client.defaults.headers.common['Accept-Language'] = language;
  }

  removeAuthHeader = () => {
    delete this.client.defaults.headers.common.Authorization;
  };
}

const httpInstance = new Http();

export const http = httpInstance.client;
export default httpInstance;
