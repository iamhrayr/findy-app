import Reactotron, {
  // asyncStorage,
  networking,
} from 'reactotron-react-native';
// import { reactotronRedux } from 'reactotron-redux';
// import AsyncStorage from '@react-native-community/async-storage';

export default Reactotron
  // .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .use(networking())
  .useReactNative() // add all built-in react native plugins
  // .use(reactotronRedux())
  // .use(asyncStorage({}))
  .connect(); // let's connect!
