import React, { memo } from 'react';

import { Box, Skeleton } from 'react-native-magnus';

const MessagePlaceholders = () => {
  return (
    <>
      <Box flexDir="row" mb="xl">
        <Skeleton.Circle h={55} w={55} />
        <Box ml="md" flex={1}>
          <Skeleton.Box />
          <Skeleton.Box mt="sm" w="80%" />
          <Skeleton.Box mt="sm" />
        </Box>
      </Box>

      <Box flexDir="row" mb="xl" alignItems="center">
        <Skeleton.Circle h={55} w={55} />
        <Box ml="md" flex={1}>
          <Skeleton.Box w="80%" />
          <Skeleton.Box mt="sm" />
        </Box>
      </Box>

      <Box flexDir="row-reverse" mb="xl">
        <Box ml="md" flex={0.7}>
          <Skeleton.Box />
          <Skeleton.Box mt="sm" />
          <Skeleton.Box mt="sm" w="80%" alignSelf="flex-end" />
        </Box>
      </Box>

      <Box flexDir="row" mb="xl" alignItems="center">
        <Skeleton.Circle h={55} w={55} />
        <Box ml="md" flex={1}>
          <Skeleton.Box />
          <Skeleton.Box mt="sm" />
        </Box>
      </Box>
    </>
  );
};

export default memo(MessagePlaceholders);
