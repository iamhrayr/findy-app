import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import Container from '../../components/Container';

const AuthIntro: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Text>Auth Intro</Text>
      <Button onPress={() => navigation.navigate('Auth:Login')} block>
        Test button
      </Button>

      <Button block type="success">
        Success Button
      </Button>
      <Button block type="secondary">
        Secondary Button
      </Button>
      <Button block type="danger">
        Danger Button
      </Button>
      <Button block type="link">
        link Button
      </Button>

      <Button block outline>
        Success Button
      </Button>
      <Button block outline type="success">
        Success Button
      </Button>
      <Button block outline type="secondary">
        Secondary Button
      </Button>
      <Button block outline type="danger">
        Danger Button
      </Button>

      <Button
        onPress={() => navigation.navigate('Auth:Login')}
        // shape="circle"
        outline
        type="secondary">
        Test button
      </Button>
      <Button
        onPress={() => navigation.navigate('Auth:Login')}
        // shape="circle"
        outline
        type="secondary">
        Test button
      </Button>
      {/* <Button onPress={() => navigation.navigate('Auth:Register')}>
        <Text>Register</Text>
      </Button> */}
    </Container>
  );
};

export default AuthIntro;
