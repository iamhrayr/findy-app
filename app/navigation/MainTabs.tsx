import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme } from 'styled-components/native';
import { Icon } from 'react-native-eva-icons';

import i18n from '@app/i18n';

// tabs
import ProfileStackScreen from './ProfileStack';
import EventsStackScreen from './EventsStack';
import NewEventStackScreen from './NewEventStack';

const Tab = createBottomTabNavigator();

const MainTabs = ({ theme }: { theme: DefaultTheme }) => {
  return (
    <Tab.Navigator
      initialRouteName="NewEvent:Home"
      // initialRouteName="Events:Home"
      tabBarOptions={{
        // style: { backgroundColor: 'grey' },
        activeTintColor: theme.colors.primary,
        // activeBackgroundColor: 'green',
        inactiveTintColor: theme.colors.darkGray,
        // safeAreaInset: { bottom: 'always', top: 'never' },
      }}>
      <Tab.Screen
        name="Events:Tab"
        component={EventsStackScreen}
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
        component={NewEventStackScreen}
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
        component={ProfileStackScreen}
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
