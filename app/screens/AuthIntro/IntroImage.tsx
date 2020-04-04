import React, { memo } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Shape from '@app/assets/shape-1.svg';
import twoCarsImage from '@app/assets/two-cars.png';

const IntroImage = () => {
  return (
    <View style={styles.container}>
      <Shape style={styles.shape} />
      <Image source={twoCarsImage} style={styles.cars} resizeMode={'contain'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
  },
  shape: {
    width: '140%',
    height: 250,
    position: 'absolute',
    right: 20,
    top: -30,
  },
  cars: {
    width: '100%',
    height: 200,
  },
});

export default memo(IntroImage);
