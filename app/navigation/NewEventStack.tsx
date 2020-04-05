import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import i18n from '@app/i18n';

// Screens
import NewEventScreen from '../screens/NewEvent';

const NewEventStack = createStackNavigator();

const NewEventStackScreen = () => (
  <NewEventStack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
    <NewEventStack.Screen
      name="NewEvents:Home"
      component={NewEventScreen}
      options={{
        title: i18n.t('new_event'),
      }}
    />
  </NewEventStack.Navigator>
);

export default NewEventStackScreen;
