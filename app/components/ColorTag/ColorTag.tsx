import React, { memo } from 'react';
import { Box } from 'react-native-magnus';

const ColorTag = ({ color }: { color: string }) => {
  return <Box bg={color} w={100} h={14} rounded="md" />;
};

ColorTag.defaultProps = {
  color: 'white',
};

export default memo(ColorTag);
