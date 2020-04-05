import React from 'react';
import { View, StyleSheet } from 'react-native';

import Shape from '@app/assets/shape-1.svg';
import Security from '@app/assets/security.svg';

const ForgotImage = () => {
  return (
    <View style={styles.container}>
      <Shape style={styles.shape} />
      <Security style={styles.security} />
    </View>
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

export default ForgotImage;
