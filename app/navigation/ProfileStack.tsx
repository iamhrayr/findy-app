import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Screens
import ProfileScreen from '../screens/Profile';
import EditProfileScreen from '../screens/EditProfile';

type Props = {
  // TODO: add navigation and route types
  navigation: any;
  route: any;
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({ navigation, route }: Props) => {
  navigation.setOptions({
    tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
  });

  return (
    <ProfileStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <ProfileStack.Screen
        name="Profile:Home"
        component={ProfileScreen}
        options={{
          title: 'profile',
        }}
      />
      <ProfileStack.Screen
        name="Profile:Edit"
        component={EditProfileScreen}
        options={{
          title: 'edit profile',
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
