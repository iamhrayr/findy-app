import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import EventsScreen from '../screens/Events';

const EventsStack = createStackNavigator();

const EventsStackScreen = () => (
  <EventsStack.Navigator>
    <EventsStack.Screen name="Events" component={EventsScreen} />
  </EventsStack.Navigator>
);

export default EventsStackScreen;
