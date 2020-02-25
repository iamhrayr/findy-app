import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import MessagesScreen from '../screens/Messages';

const MessagesStack = createStackNavigator();

const MessagesStackScreen = () => (
  <MessagesStack.Navigator>
    <MessagesStack.Screen name="Messages" component={MessagesScreen} />
  </MessagesStack.Navigator>
);

export default MessagesStackScreen;
