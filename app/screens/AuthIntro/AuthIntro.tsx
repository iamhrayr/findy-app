import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Button, Text, Container, Layout } from '@app/components';
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
      <Layout size={1}>
        <Layout grow={1}>
          <IntroImage />
        </Layout>

        <Layout grow={0}>
          <Text size="giant" weight="300" spacer={{ b: 'md' }}>
            Welcome
          </Text>

          <Text size="lg">
            App allows users to get in touch with a car driver quickly and easily by just scanning
            or entering car number.
          </Text>

          <Layout layout="row" justify="between" spacer={{ y: 'lg' }}>
            <Layout size={47}>
              <Button block outline shape="circle" onPress={navigateToRegister}>
                Register
              </Button>
            </Layout>
            <Layout size={6} />
            <Layout size={47}>
              <Button block shape="circle" onPress={navigateToLogin}>
                Login
              </Button>
            </Layout>
          </Layout>

          <Text align="center">
            <Text align="center">By using the app you are agreeing to our </Text>
            <Text align="center" color="primary">
              Terms of Use
            </Text>
          </Text>
        </Layout>
      </Layout>
    </Container>
  );
};

export default AuthIntro;
