import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';

import configs from '@app/configs';

const http = axios.create({
  baseURL: configs.api.url,
});

// transforming request and response datas to suitable ones
// request: camelCase -> snake_case
// response: snake_case -> camelCase
http.interceptors.request.use(
  config => {
    if (!config.data) {
      return config;
    }

    const snakeCasedData = snakeCaseKeys(config.data, { deep: true });
    return { ...config, data: snakeCasedData };
  },
  error => {
    if (!error.data) {
      return Promise.reject(error);
    }

    const camelCasedError = camelCaseKeys(error.data, { deep: true });
    return Promise.reject({ ...error, data: camelCasedError });
  },
);

http.interceptors.response.use(
  response => {
    if (!response.data) {
      return response;
    }

    const camelCasedData = camelCaseKeys(response.data, { deep: true });
    return { ...response, data: camelCasedData };
  },
  error => {
    if (!error.data) {
      return Promise.reject(error);
    }

    const camelCasedError = camelCaseKeys(error.data, { deep: true });
    return Promise.reject({ ...error, data: camelCasedError });
  },
);

export default http;
