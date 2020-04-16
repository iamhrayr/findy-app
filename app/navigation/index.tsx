import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-eva-icons';

// tabs
import ProfileStackScreen from './ProfileStack';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="NewEvent:Tab"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: 'red',
        inactiveTintColor: 'blue',
      }}>
      <Tab.Screen
        name="Profile:Tab"
        component={ProfileStackScreen}
        options={{
          title: 'profile',
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
