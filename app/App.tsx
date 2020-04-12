/* global GLOBAL */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import useMount from 'react-use/lib/useMount';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import { enableScreens } from 'react-native-screens';
import codePush from 'react-native-code-push';

import './i18n';
import NavigationRoot from './navigation';
import getTheme from './theme';
import { store, persistor } from './redux/store';

import ErrorBoundary from './ErrorBoundary';
import NetworkStatusChecker from './NetworkStatusChecker';

Sentry.init({
  dsn: 'https://7ff204198172467aa5608c64b63de948@sentry.io/5185659',
});

// This will fail any FormData request if enabled!!!
if (__DEV__) {
  // @ts-ignore
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  // import('./configs/reactotron').then(() => console.log('Reactotron Configured'));
}

console.disableYellowBox = true;

enableScreens();

const App: React.FC = () => {
  useMount(() => {
    SplashScreen.hide();
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={getTheme('light')}>
          <NetworkStatusChecker>
            <ErrorBoundary>
              <SafeAreaProvider>
                <NavigationContainer>
                  <StatusBar barStyle="dark-content" />
                  <NavigationRoot />
                  <FlashMessage position="top" />
                </NavigationContainer>
              </SafeAreaProvider>
            </ErrorBoundary>
          </NetworkStatusChecker>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
})(App);
