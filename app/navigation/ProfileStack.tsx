import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import i18n from '@app/i18n';

// Screens
import ProfileScreen from '../screens/Profile';
import ProfileAddEditCarScreen from '../screens/ProfileAddEditCar';
import EditProfileScreen from '../screens/EditProfile';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: i18n.t('profile'),
      }}
    />
    <ProfileStack.Screen
      name="Profile:AddEditCar"
      component={ProfileAddEditCarScreen}
      options={{
        title: i18n.t('profile:add_edit_car'),
      }}
    />
    <ProfileStack.Screen
      name="Profile:Edit"
      component={EditProfileScreen}
      options={{
        title: i18n.t('profile:edit_profile'),
      }}
    />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
