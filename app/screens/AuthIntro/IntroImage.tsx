import React from 'react';
import { View, StyleSheet } from 'react-native';

import Shape from '@app/assets/shape-1.svg';
import Cars from '@app/assets/two-cars.svg';

const IntroImage = () => {
  return (
    <View style={styles.container}>
      <Shape style={styles.shape} />
      <Cars style={styles.cars} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 60,
    padding: 20,
  },
  shape: {
    width: '140%',
    height: 250,
    position: 'absolute',
    right: 20,
    top: -30,
  },
  cars: {
    marginLeft: -25,
  },
});

export default IntroImage;
