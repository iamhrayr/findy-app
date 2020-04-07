import devConfig from './dev';
import prodConfig from './dev';

const config = __DEV__ ? devConfig : prodConfig;

export default config;
