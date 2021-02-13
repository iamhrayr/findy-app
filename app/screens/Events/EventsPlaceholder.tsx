import React, { memo } from 'react';
import { Placeholder, PlaceholderLine, ShineOverlay } from 'rn-placeholder';

import { Box } from 'react-native-magnus';

const EventsPlaceholder = () => (
  <Placeholder Animation={ShineOverlay}>
    <Box flexDir="row" justifyContent="space-between" mb="xs">
      <PlaceholderLine width={25} />
      <PlaceholderLine width={20} />
    </Box>
    <PlaceholderLine width={100} />
    <PlaceholderLine width={50} />
  </Placeholder>
);

const EventsPlaceholders = () => {
  return (
    <Box>
      <EventsPlaceholder />
      <Box bg="gray300" my="lg" h={1} />
      <EventsPlaceholder />
      <Box bg="gray300" my="lg" h={1} />
      <EventsPlaceholder />
    </Box>
  );
};

export default memo(EventsPlaceholders);
