import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Box } from 'react-native-magnus';

import Shape from '@app/assets/shape-1.svg';
import Security from '@app/assets/security.svg';

const ForgotImage = () => {
  return (
    <Box mb={20} p={20}>
      <Shape style={styles.shape} />
      <Security style={styles.security} />
    </Box>
  );
};

const styles = StyleSheet.create({
  shape: {
    width: '200%',
    height: 300,
    position: 'absolute',
    right: 120,
    top: -100,
  },
  security: {
    width: 300,
    height: '100%',
    marginLeft: -20,
    marginTop: -40,
  },
});

export default memo(ForgotImage);
