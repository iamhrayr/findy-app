import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Col, Grid } from 'react-native-easy-grid';

import { Button, Text, Container } from '@app/components';

import IntroImage from './IntroImage';

const AuthIntro: React.FC = () => {
  const navigation = useNavigation();
  const navigateToRegister = useCallback(() => {
    navigation.navigate('Auth:Register');
  }, [navigation]);

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Auth:Login');
  }, [navigation]);

  return (
    <Container scrollView={false} extraPadded>
      <IntroImage />

      <Text size="giant" weight="300" spacer={{ b: 'md' }}>
        Welcome
      </Text>

      <Text size="lg" spacer={{ b: 'xl' }}>
        App allows users to get in touch with a car driver quickly and easily by just scanning or
        entering car number.
      </Text>

      <Grid>
        <Col size={47}>
          <Button block outline shape="circle" onPress={navigateToRegister}>
            Register
          </Button>
        </Col>
        <Col size={6} />
        <Col size={47}>
          <Button block shape="circle" onPress={navigateToLogin}>
            Login
          </Button>
        </Col>
      </Grid>

      <Text align="center">
        <Text align="center">By using the app you are agreeing to our </Text>
        <Text align="center" color="primary">
          Terms of Use
        </Text>
      </Text>
    </Container>
  );
};

export default AuthIntro;
