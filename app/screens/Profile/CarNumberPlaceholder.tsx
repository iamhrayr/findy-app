import React, { memo } from 'react';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from 'rn-placeholder';

import { Box } from 'react-native-magnus';

const CarNumberPlaceholder = () => (
  <Placeholder
    Animation={ShineOverlay}
    Right={() => (
      <>
        <Box ml={7}>
          <PlaceholderMedia isRound={true} />
        </Box>

        <Box ml={7}>
          <PlaceholderMedia isRound={true} />
        </Box>
      </>
    )}>
    <PlaceholderLine width={40} />
    <PlaceholderLine width={30} />
  </Placeholder>
);

const CarNumberPlaceholders = () => {
  return (
    <Box>
      <CarNumberPlaceholder />
      <Box h={1} bg="gray300" my="lg" />
      <CarNumberPlaceholder />
    </Box>
  );
};

export default memo(CarNumberPlaceholders);
