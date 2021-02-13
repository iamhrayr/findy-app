import React, { memo } from 'react';
import { Box, Text } from 'react-native-magnus';

type Props = {
  message: React.ReactNode;
};

const NoData = ({ message }: Props) => {
  return (
    <Box p={25} alignItems="center" borderWidth={1} rounded="lg" borderColor="gray400">
      <Text>{message}</Text>
    </Box>
  );
};

export default memo<Props>(NoData);
