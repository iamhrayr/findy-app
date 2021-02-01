import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import './app/theme/theme-manager';

import HeadlessCheck from './app/HeadlessCheck';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(() => {});

AppRegistry.registerComponent(appName, () => HeadlessCheck);
