import devConfig from './dev';
import prodConfig from './dev';

const config = __DEV__ ? devConfig : prodConfig;

console.log('config in index', config);

export default config;
