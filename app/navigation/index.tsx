import React from 'react';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthIntroScreen from '../screens/AuthIntro';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ForgotPasswordScreen from '../screens/ForgotPassword';

type AuthStackParamList = {
  'Auth:Intro': undefined;
  'Auth:Login': undefined;
  'Auth:Register': undefined;
  'Auth:ForgotPassword': undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const NavigationRoot = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth:Intro" component={AuthIntroScreen} />
      <Stack.Screen name="Auth:Login" component={LoginScreen} />
      <Stack.Screen name="Auth:Register" component={RegisterScreen} />
      <Stack.Screen
        name="Auth:ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default NavigationRoot;
