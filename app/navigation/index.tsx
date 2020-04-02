import React, { useState } from 'react';
// import { SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'styled-components/native';

import i18n from '@app/i18n';
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
    <Stack.Navigator initialRouteName="Auth:Intro">
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="Auth:Intro"
            component={AuthIntroScreen}
            options={{
              headerShown: false,
              title: i18n.t('auth:intro_title'),
            }}
          />
          <Stack.Screen
            name="Auth:Login"
            component={LoginScreen}
            options={{
              title: i18n.t('profile:add_edit_car'),
            }}
          />
          <Stack.Screen
            name="Auth:Register"
            component={RegisterScreen}
            options={{
              title: i18n.t('register'),
            }}
          />
          <Stack.Screen
            name="Auth:ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
              title: i18n.t('forgot_password'),
            }}
          />
          <Stack.Screen
            name="Auth:ConfirmPhoneNumber"
            component={ConfirmPhoneNumberScreen}
            options={{
              title: i18n.t('auth:confirm_phone_number'),
            }}
          />
          <Stack.Screen
            name="Auth:TermsOfUse"
            component={TermsOfUseScreen}
            options={{
              title: i18n.t('terms_of_use'),
            }}
          />
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
  );
};

export default NavigationRoot;
