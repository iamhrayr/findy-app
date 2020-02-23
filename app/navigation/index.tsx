import React from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootState } from '@app/redux/rootReducer';
// Auth screens
import AuthIntroScreen from '../screens/AuthIntro';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import TermsOfUseScreen from '../screens/TermsOfUse';
import ConfirmPhoneNumberScreen from '../screens/ConfirmPhoneNumber';
// Profile Screens
import ProfileScreen from '../screens/Profile';
// Messages Screens
import MessagesScreen from '../screens/Messages';
// Event Screens
import NewEventScreen from '../screens/NewEvent';
import EventsScreen from '../screens/Events';
// Settings Screens
import SettingsScreen from '../screens/Settings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile:Home"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Tab.Screen
        name="Events:Home"
        component={EventsScreen}
        options={{ title: 'Events' }}
      />
      <Tab.Screen
        name="NewEvent:Home"
        component={NewEventScreen}
        options={{ title: 'Add' }}
      />
      <Tab.Screen
        name="Messages:Home"
        component={MessagesScreen}
        options={{ title: 'Messages' }}
      />
      <Tab.Screen
        name="Settings:Home"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

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
            <Stack.Screen name="Auth:TermsOfUse" component={TermsOfUseScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Profile"
              component={MainTabs}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default NavigationRoot;
