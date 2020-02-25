import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SettingsScreen from '../screens/Settings';

const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="Messages" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

export default SettingsStackScreen;
