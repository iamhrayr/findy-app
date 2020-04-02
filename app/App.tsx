/* global GLOBAL */

import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';

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
if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  // import('./configs/reactotron').then(() => console.log('Reactotron Configured'));
}

console.disableYellowBox = true;

const App: React.FC = () => {
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
                  <FlashMessage
                    position="top"
                    // floating={true}
                  />
                </NavigationContainer>
              </SafeAreaProvider>
            </ErrorBoundary>
          </NetworkStatusChecker>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
