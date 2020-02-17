import axios from 'axios';

import configs from '@app/configs';

const http = axios.create({
  baseURL: configs.api.url,
});

export default http;
