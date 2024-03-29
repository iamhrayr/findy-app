import axios, { AxiosInstance } from 'axios';
import camelCaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';
import { showMessage } from 'react-native-flash-message';

import configs from '@app/configs';
import i18n from '@app/i18n';

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
      (config) => {
        if (!config.data) {
          return config;
        }

        // TODO: check if there is no any other case besides multipart/form-data
        // It should only convert our properties to `snakeCaseKeys`
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
      (error) => {
        if (!error.data) {
          return Promise.reject(error);
        }

        const camelCasedError = camelCaseKeys(error.data, { deep: true });
        return Promise.reject({ ...error, data: camelCasedError });
      },
    );

    this.client.interceptors.response.use(
      (response) => {
        if (!response.data) {
          return response;
        }

        const camelCasedData = camelCaseKeys(response.data, { deep: true });
        return { ...response, data: camelCasedData };
      },
      (error) => {
        // No response means there is a network error
        if (!error.response) {
          error.response = {
            data: i18n.t('network_error'),
          };
          showMessage({
            type: 'danger',
            message: i18n.t('there_is_network_error'),
          });
          return Promise.reject(error);
        }

        // show global error message if server crashed
        if (error.status === 500) {
          showMessage({
            type: 'danger',
            message: i18n.t('something_went_wrong'),
          });
          return Promise.reject(error);
        }

        try {
          const camelCasedError = camelCaseKeys(error.response.data, { deep: true });
          return Promise.reject(camelCasedError);
          // error.response.data = camelCasedError;
        } catch (e) {
          return Promise.reject(error);
        }

        // return Promise.reject(error);
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
