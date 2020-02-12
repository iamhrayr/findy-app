import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Content, Footer } from 'native-base';

const AuthIntro: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      {/* <Header /> */}
      <Content>
        <View>
          <Text>Auth Intro</Text>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Auth:Login')}
          />
          <Button
            title="Register"
            onPress={() => navigation.navigate('Auth:Register')}
          />
        </View>
      </Content>
      <Footer />
    </Container>
  );
};

export default AuthIntro;
