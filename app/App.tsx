/* global GLOBAL */

import 'react-native-gesture-handler';
import React, { memo } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './i18n';
import NavigationRoot from './navigation';
import getTheme from './theme';
import { store, persistor } from './redux/store';

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
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default memo(App);
