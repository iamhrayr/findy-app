import React, { useState } from 'react';
// import { SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'styled-components/native';

import { RootState } from '@app/redux/rootReducer';
// Auth screens
import AuthIntroScreen from '../screens/AuthIntro';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import TermsOfUseScreen from '../screens/TermsOfUse';
import ConfirmPhoneNumberScreen from '../screens/ConfirmPhoneNumber';
import SplashScreen from '../screens/Splash';

import MainTabs from './MainTabs';

const Stack = createStackNavigator();

const NavigationRoot = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [appInitialised, setAppInitialised] = useState<boolean>(false);

  if (!appInitialised) {
    return <SplashScreen setAppInitialised={setAppInitialised} />;
  }

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
    <Stack.Navigator initialRouteName="Auth:Intro">
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="Auth:Intro"
            component={AuthIntroScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Auth:Login" component={LoginScreen} />
          <Stack.Screen name="Auth:Register" component={RegisterScreen} />
          <Stack.Screen name="Auth:ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen
            name="Auth:ConfirmPhoneNumber"
            component={ConfirmPhoneNumberScreen}
          />
          <Stack.Screen name="Auth:TermsOfUse" component={TermsOfUseScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Profile"
            component={withTheme(MainTabs)}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
    //  </SafeAreaView>
  );
};

export default NavigationRoot;
