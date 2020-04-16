import React, { useCallback } from 'react';
import {
  Button,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserDetails = () => {
  const navigation = useNavigation();

  const navigateToEditProfile = useCallback(() => {
    navigation.navigate('Profile:Edit');
  }, [navigation]);

  return (
    <>
      <TouchableNativeFeedback onPress={navigateToEditProfile}>
        <View
          style={{
            elevation: 4,
            // Material design blue from https://material.google.com/style/color.html#color-color-palette
            backgroundColor: '#2196F3',
            borderRadius: 2,
            marginBottom: 20,
            padding: 20,
          }}>
          <Text>TouchableNativeFeedback</Text>
        </View>
      </TouchableNativeFeedback>

      <TouchableOpacity onPress={navigateToEditProfile}>
        <View
          style={{
            elevation: 4,
            // Material design blue from https://material.google.com/style/color.html#color-color-palette
            backgroundColor: '#2196F3',
            borderRadius: 2,
            marginBottom: 20,
            padding: 20,
          }}>
          <Text>TouchableOpacity</Text>
        </View>
      </TouchableOpacity>

      <Button onPress={navigateToEditProfile} title="Button" />
    </>
  );
};

export default UserDetails;
