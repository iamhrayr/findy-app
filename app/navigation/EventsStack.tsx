import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import EventsScreen from '../screens/Events';
import EventScreen from '../screens/Event';

const EventsStack = createStackNavigator();

const EventsStackScreen = () => (
  <EventsStack.Navigator initialRouteName="Events">
    <EventsStack.Screen name="Events" component={EventsScreen} />
    <EventsStack.Screen name="Events:Event" component={EventScreen} />
  </EventsStack.Navigator>
);

export default EventsStackScreen;
