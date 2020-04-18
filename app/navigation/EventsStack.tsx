// import React from 'react';
// import {
//   createStackNavigator,
//   CardStyleInterpolators,
//   StackNavigationProp,
// } from '@react-navigation/stack';
// import // BottomTabNavigationProp,
// // BottomTabBarProps,
// '@react-navigation/bottom-tabs';
// import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';

// import i18n from '@app/i18n';

// // Screens
// import EventsScreen from '../screens/Events';
// import EventScreen from '../screens/Event';

// type EventsStackParamList = {
//   'Events:Home': undefined;
//   'Events:Event': { id: string };
// };

// type EventsScreenRouteProp = RouteProp<EventsStackParamList, 'Events:Home'>;
// type EventsScreenNavigationProp = StackNavigationProp<
//   EventsStackParamList,
//   'Events:Home'
// >;

// type EventScreenRouteProp = RouteProp<EventsStackParamList, 'Events:Event'>;
// type EventScreenNavigationProp = StackNavigationProp<
//   EventsStackParamList,
//   'Events:Event'
// >;

// type EventsStackNavigationProps = CompositeNavigationProp<
//   EventsScreenNavigationProp,
//   EventScreenNavigationProp
// >;

// type Props = {
//   // TODO: fix navigation and route types
//   navigation: any;
//   route: any;
// };

// const EventsStack = createStackNavigator<EventsStackParamList>();

// const EventsStackScreen = ({ navigation, route }: Props) => {
//   navigation.setOptions({
//     tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
//   });

//   return (
//     <EventsStack.Navigator
//       initialRouteName="Events:Home"
//       screenOptions={{
//         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//       }}>
//       <EventsStack.Screen
//         name="Events:Home"
//         component={EventsScreen}
//         options={{
//           title: i18n.t('events'),
//         }}
//       />
//       <EventsStack.Screen
//         name="Events:Event"
//         component={EventScreen}
//         options={{
//           title: i18n.t('event'),
//         }}
//       />
//     </EventsStack.Navigator>
//   );
// };

// export default EventsStackScreen;
