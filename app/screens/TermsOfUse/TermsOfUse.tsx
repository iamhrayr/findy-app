import React, { useCallback, memo } from 'react';
import { Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import { Box } from 'react-native-magnus';

import { Button } from '@app/components';
import { withInteractionsComplete } from '@app/HoCs';

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
    <Box p="lg">
      <Button onPress={handleSubmit} />
      <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
    </Box>
  );
};

export default withInteractionsComplete(memo(TermsOfUse));
