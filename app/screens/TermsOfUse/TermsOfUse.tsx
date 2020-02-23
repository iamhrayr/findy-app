import React, { useCallback } from 'react';
import { Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Button } from '@app/components';

import htmlContent from './tems-of-use-content';

const TermsOfUse = () => {
  const navigation = useNavigation();
  const handleSubmit = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth:ForgotPassword' }],
    });
  }, [navigation]);

  return (
    <Container>
      <Content>
        <Button onPress={handleSubmit} />
        <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
      </Content>
    </Container>
  );
};

export default TermsOfUse;
