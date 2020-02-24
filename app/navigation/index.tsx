import React from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { withTheme, DefaultTheme } from 'styled-components/native';

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
const ProfileStack = createStackNavigator();
const EventsStack = createStackNavigator();
const NewEventStack = createStackNavigator();
const MessagesStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator
  // screenOptions={{
  //   // headerTitleAlign: 'left',
  //   headerTitleStyle: {
  //     fontWeight: '400',
  //   },
  // }}
  >
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const EventsStackScreen = () => (
  <EventsStack.Navigator>
    <EventsStack.Screen name="Events" component={EventsScreen} />
  </EventsStack.Navigator>
);

const NewEventStackScreen = () => (
  <NewEventStack.Navigator>
    <NewEventStack.Screen name="Events" component={NewEventScreen} />
  </NewEventStack.Navigator>
);

const MessagesStackScreen = () => (
  <MessagesStack.Navigator>
    <MessagesStack.Screen name="Messages" component={MessagesScreen} />
  </MessagesStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="Messages" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

const MainTabs = ({ theme }: { theme: DefaultTheme }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        // style: { backgroundColor: 'grey' },
        activeTintColor: theme.colors.primary,
        // activeBackgroundColor: 'green',
        inactiveTintColor: theme.colors.darkGray,
        // safeAreaInset: { bottom: 'always', top: 'never' },
      }}>
      <Tab.Screen
        name="Profile:Home"
        component={ProfileStackScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ /* focused, */ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Events:Home"
        component={EventsStackScreen}
        options={{
          title: 'Events',
          tabBarIcon: ({ /* focused, */ color, size }) => (
            <Icon name="bell" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NewEvent:Home"
        component={NewEventStackScreen}
        options={{
          title: 'Add',
          tabBarIcon: ({ /* focused, */ color, size }) => (
            <Icon name="plus" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages:Home"
        component={MessagesStackScreen}
        options={{
          title: 'Messages',
          tabBarIcon: ({ /* focused, */ color, size }) => (
            <Icon name="speech" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings:Home"
        component={SettingsStackScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ /* focused, */ color, size }) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
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
              component={withTheme(MainTabs)}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default NavigationRoot;
