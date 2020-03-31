import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import i18n from '@app/i18n';

// Screens
import NewEventScreen from '../screens/NewEvent';

const NewEventStack = createStackNavigator();

const NewEventStackScreen = () => (
  <NewEventStack.Navigator>
    <NewEventStack.Screen
      name="Events"
      component={NewEventScreen}
      options={{
        title: i18n.t('events'),
      }}
    />
  </NewEventStack.Navigator>
);

export default NewEventStackScreen;
