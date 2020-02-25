import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import ProfileScreen from '../screens/Profile';

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
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
