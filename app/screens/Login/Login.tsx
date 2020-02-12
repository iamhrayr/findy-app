import React from 'react';
import {
  View,
  // Text,
  // Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button, Text } from 'native-base';

const Login: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Login Screen</Text>
      <Button
        title="Forgot Password"
        onPress={() => navigation.navigate('Auth:ForgotPassword')}>
        <Text>Forgot Password</Text>
      </Button>
    </View>
  );
};

export default Login;
