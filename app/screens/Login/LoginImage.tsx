import React, { memo } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Shape from '@app/assets/shape-1.svg';
import twoCarsImage from '@app/assets/two-cars.png';

const LoginImage = () => {
  return (
    <View style={styles.container}>
      <Shape style={styles.shape} />
      <Image source={twoCarsImage} style={styles.cars} resizeMode={'contain'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    width: '100%',
    height: 200,
    marginLeft: -180,
    marginTop: -40,
  },
});

export default memo(LoginImage);
