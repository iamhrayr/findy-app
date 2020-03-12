import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import EventsScreen from '../screens/Events';
import EventScreen from '../screens/Event';
import EventRequestScreen from '../screens/EventRequest';

const EventsStack = createStackNavigator();

const EventsStackScreen = () => (
  <EventsStack.Navigator initialRouteName="Events">
    <EventsStack.Screen name="Events" component={EventsScreen} />
    <EventsStack.Screen name="Events:Event" component={EventScreen} />
    <EventsStack.Screen
      name="Events:Request"
      component={EventRequestScreen}
      options={{
        headerShown: false,
      }}
    />
  </EventsStack.Navigator>
);

export default EventsStackScreen;
