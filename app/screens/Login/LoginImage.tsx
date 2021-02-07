import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Image } from 'react-native-magnus';
import { s } from 'react-native-size-matters';

import Shape from '@app/assets/shape-1.svg';
import twoCarsImage from '@app/assets/two-cars.png';

const LoginImage = () => {
  return (
    <Box top={0} left={0} position="absolute" w="100%" p={20}>
      <Shape style={styles.shape} />
      <Image
        source={twoCarsImage}
        resizeMode={'contain'}
        w="100%"
        h={200}
        ml={200}
        mt={-20}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  shape: {
    width: '200%',
    height: s(300),
    position: 'absolute',
    left: s(140),
    top: -s(100),
  },
});

export default memo(LoginImage);
