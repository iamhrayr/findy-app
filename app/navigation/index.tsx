import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '@app/redux/rootReducer';
import AuthIntroScreen from '../screens/AuthIntro';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import TermsOfUseScreen from '../screens/TermsOfUse';
import ConfirmPhoneNumberScreen from '../screens/ConfirmPhoneNumber';

const Stack = createStackNavigator();

const NavigationRoot = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Auth:Login">
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
          </>
        ) : (
          <>
            <Stack.Navigator>
              <Stack.Screen name="Profile" component={TermsOfUseScreen} />
            </Stack.Navigator>
          </>
        )}
      </Stack.Navigator>

      {/* <Stack.Navigator>
        <Stack.Screen name="Auth:TermsOfUse" component={TermsOfUseScreen} />
      </Stack.Navigator> */}
    </SafeAreaView>
  );
};

export default NavigationRoot;
