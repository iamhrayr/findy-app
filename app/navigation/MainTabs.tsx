import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme } from 'styled-components/native';
import { Icon } from 'react-native-eva-icons';

import i18n from '@app/i18n';

// tabs
import ProfileScreen from '../screens/Profile';
import NewEventScreen from '../screens/NewEvent';
import EventsScreen from '../screens/Events';

// import ProfileStackScreen from './ProfileStack';
// import EventsStackScreen from './EventsStack';
// import NewEventStackScreen from './NewEventStack';

const Tab = createBottomTabNavigator();

const MainTabs = ({ theme }: { theme: DefaultTheme }) => {
  return (
    <Tab.Navigator
      // initialRouteName="NewEvent:Tab"
      initialRouteName="Profile:Tab"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.darkGray,
      }}>
      <Tab.Screen
        name="Events:Tab"
        component={EventsScreen}
        options={{
          title: i18n.t('events'),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'bell' : 'bell-outline'}
              height={size}
              width={size}
              fill={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NewEvent:Tab"
        component={NewEventScreen}
        options={{
          title: i18n.t('new_event'),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'plus-circle' : 'plus-circle-outline'}
              height={size}
              width={size}
              fill={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile:Tab"
        component={ProfileScreen}
        options={{
          title: i18n.t('profile'),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              height={size}
              width={size}
              fill={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
