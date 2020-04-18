// import React from 'react';
// import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// import i18n from '@app/i18n';

// // Screens
// import ProfileScreen from '../screens/Profile';
// import ProfileAddEditCarScreen from '../screens/ProfileAddEditCar';
// import EditProfileScreen from '../screens/EditProfile';

// type Props = {
//   // TODO: add navigation and route types
//   navigation: any;
//   route: any;
// };

// const ProfileStack = createStackNavigator();

// const ProfileStackScreen = ({ navigation, route }: Props) => {
//   navigation.setOptions({
//     tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
//   });

//   return (
//     <ProfileStack.Navigator
//       screenOptions={{
//         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//       }}>
//       <ProfileStack.Screen
//         name="Profile:Home"
//         component={ProfileScreen}
//         options={{
//           title: i18n.t('profile'),
//         }}
//       />
//       <ProfileStack.Screen
//         name="Profile:AddEditCar"
//         component={ProfileAddEditCarScreen}
//         options={{
//           title: i18n.t('profile:add_edit_car'),
//         }}
//       />
//       <ProfileStack.Screen
//         name="Profile:Edit"
//         component={EditProfileScreen}
//         options={{
//           title: i18n.t('profile:edit_profile'),
//         }}
//       />
//     </ProfileStack.Navigator>
//   );
// };

// export default ProfileStackScreen;
