import React from 'react';
import { View, StyleSheet } from 'react-native';

import Shape from '@app/assets/shape-1.svg';
import Cars from '@app/assets/two-cars.svg';

const LoginImage = () => {
  return (
    <View style={styles.container}>
      <Shape style={styles.shape} />
      <Cars style={styles.cars} />
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
  cars: {
    height: '100%',
    marginLeft: -210,
    marginTop: -40,
  },
});

export default LoginImage;
