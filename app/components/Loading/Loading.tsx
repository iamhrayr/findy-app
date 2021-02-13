import React, { memo } from 'react';
import { Box, Text } from 'react-native-magnus';

const Loading = () => {
  return (
    <Box>
      <Text>Loading...</Text>
    </Box>
  );
};

export default memo(Loading);
