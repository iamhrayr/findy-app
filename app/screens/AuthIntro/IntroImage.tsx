import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Image } from 'react-native-magnus';

import Shape from '@app/assets/shape-1.svg';
import twoCarsImage from '@app/assets/two-cars.png';

const IntroImage = () => {
  return (
    <Box mt={35}>
      <Shape style={styles.shape} />
      <Image source={twoCarsImage} w="100%" h={200} resizeMode="contain" />
    </Box>
  );
};

const styles = StyleSheet.create({
  shape: {
    width: '140%',
    height: 250,
    position: 'absolute',
    right: 20,
    top: -30,
  },
});

export default memo(IntroImage);
