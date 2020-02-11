import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthIntro: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Auth Intro</Text>
      <Button title="Login" onPress={() => navigation.navigate('Auth:Login')} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Auth:Register')}
      />
    </View>
  );
};

export default AuthIntro;
