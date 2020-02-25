import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import NewEventScreen from '../screens/NewEvent';

const NewEventStack = createStackNavigator();

const NewEventStackScreen = () => (
  <NewEventStack.Navigator>
    <NewEventStack.Screen name="Events" component={NewEventScreen} />
  </NewEventStack.Navigator>
);

export default NewEventStackScreen;
