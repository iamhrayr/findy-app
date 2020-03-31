import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import i18n from '@app/i18n';

// Screens
import EventsScreen from '../screens/Events';
import EventScreen from '../screens/Event';

const EventsStack = createStackNavigator();

const EventsStackScreen = () => (
  <EventsStack.Navigator initialRouteName="Events">
    <EventsStack.Screen
      name="Events"
      component={EventsScreen}
      options={{
        title: i18n.t('profile:add_edit_car'),
      }}
    />
    <EventsStack.Screen
      name="Events:Event"
      component={EventScreen}
      options={{
        title: i18n.t('profile:add_edit_car'),
      }}
    />
  </EventsStack.Navigator>
);

export default EventsStackScreen;
