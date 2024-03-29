/* global GLOBAL */
import React, { memo } from 'react';
import { StatusBar } from 'react-native';
import useMount from 'react-use/lib/useMount';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-magnus';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import SplashScreen from 'react-native-splash-screen';
// import messaging from '@react-native-firebase/messaging';
import { enableScreens } from 'react-native-screens';
import codePush from 'react-native-code-push';
import { QueryClient, QueryClientProvider } from 'react-query';

import './i18n';
import NavigationRoot from './navigation';
import light from './theme/light';
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

// if (__DEV__) {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   const ReactRedux = require('react-redux');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//     trackExtraHooks: [[ReactRedux, 'useSelector']],
//   });
// }

console.disableYellowBox = true;

enableScreens();

const queryClient = new QueryClient();

const App: React.FC = () => {
  const navigationRef = React.useRef(null);
  // const navigation = useNavigation();

  useMount(() => {
    SplashScreen.hide();

    // messaging().onNotificationOpenedApp((remoteMessage) => {
    //   Alert.alert(JSON.stringify(remoteMessage, null, 2));
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    //   );
    //   // navigationRef.current?.navigate('Home')
    //   // navigation.navigate('');
    // });
  });

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage,
  //     );
  //     // navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log('Notification caused app to open from quit state:', remoteMessage);
  //         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       // setLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={light}>
            <NetworkStatusChecker>
              <ErrorBoundary>
                <SafeAreaProvider>
                  <NavigationContainer ref={navigationRef}>
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
    </QueryClientProvider>
  );
};

const codePushifiedApp = codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
})(App);

export default memo(codePushifiedApp);
