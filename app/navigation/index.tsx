import React from 'react';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';

import AuthIntroScreen from '../screens/AuthIntro';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import TermsOfUseScreen from '../screens/TermsOfUse';

const Stack = createStackNavigator();

const NavigationRoot = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth:Intro"
          component={AuthIntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Auth:Login" component={LoginScreen} />
        <Stack.Screen name="Auth:Register" component={RegisterScreen} />
        <Stack.Screen name="Auth:ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Auth:TermsOfUse" component={TermsOfUseScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default NavigationRoot;
