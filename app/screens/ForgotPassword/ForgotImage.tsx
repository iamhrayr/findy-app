import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Box } from 'react-native-magnus';

import Shape from '@app/assets/shape-1.svg';
import Security from '@app/assets/security.svg';

const ForgotImage = () => {
  return (
    <Box p="xl" mb="2xl">
      <Shape style={styles.shape} />
      <Security style={styles.security} />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    padding: 20,
  },
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
