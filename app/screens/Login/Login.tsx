import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Button, Text, Container, Layout, Input, Content } from '@app/components';
import LoginImage from './LoginImage';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const navigateToRegister = useCallback(() => {
    navigation.navigate('Auth:ForgotPassword');
  }, [navigation]);

  return (
    <Container>
      <Content extraPadded>
        <Layout grow={1}>
          <LoginImage />
        </Layout>

        <Layout>
          <Text size="giant" spacer={{ b: 'xl' }}>
            Login
          </Text>
          <Input label="Phone Number" placeholder="+374 98999590" />
          <Input label="Password" placeholder="*******" secureTextEntry />
          <Layout align="center" spacer={{ y: 'md' }}>
            <Button onPress={navigateToRegister} shape="circle" wide>
              Login
            </Button>
          </Layout>

          <Text align="center">
            <Text align="center">New user? </Text>
            <Text align="center" color="primary">
              Login Here
            </Text>
          </Text>
        </Layout>
      </Content>
    </Container>
  );
};

export default Login;
