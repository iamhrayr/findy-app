import React, { memo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { s } from 'react-native-size-matters';

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
    padding: s(20),
    flexShrink: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  shape: {
    width: '200%',
    height: s(300),
    position: 'absolute',
    left: s(140),
    top: -s(100),
  },
  cars: {
    width: '100%',
    height: s(200),
    marginLeft: s(170),
    marginTop: -s(40),
  },
});

export default memo(LoginImage);
