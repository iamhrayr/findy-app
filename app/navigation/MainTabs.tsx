import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme } from 'styled-components/native';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Icon } from 'react-native-eva-icons';

// tabs
import ProfileStackScreen from './ProfileStack';
import EventsStackScreen from './EventsStack';
import NewEventStackScreen from './NewEventStack';
// import MessagesStackScreen from './MessagesStack';
// import SettingsStackScreen from './SettingsStack';

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
        name="Events:Home"
        component={EventsStackScreen}
        options={{
          title: 'Events',
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
        name="NewEvent:Home"
        component={NewEventStackScreen}
        options={{
          title: 'New Event',
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
        name="Profile:Home"
        component={ProfileStackScreen}
        options={{
          title: 'Profile',
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
      {/* <Tab.Screen
        name="Messages:Home"
        component={MessagesStackScreen}
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'message-square' : 'message-square-outline'}
              height={size}
              width={size}
              fill={color}
            />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Settings:Home"
        component={SettingsStackScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'settings' : 'settings-outline'}
              height={size}
              width={size}
              fill={color}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default MainTabs;
