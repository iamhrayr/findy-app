import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import ProfileScreen from '../screens/Profile';
import ProfileAddEditCarScreen from '../screens/ProfileAddEditCar';
import EditProfileScreen from '../screens/EditProfile';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator
  // screenOptions={{
  //   // headerTitleAlign: 'left',
  //   headerTitleStyle: {
  //     fontWeight: '400',
  //   },
  // }}
  >
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="Profile:AddEditCar" component={ProfileAddEditCarScreen} />
    <ProfileStack.Screen name="Profile:Edit" component={EditProfileScreen} />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
