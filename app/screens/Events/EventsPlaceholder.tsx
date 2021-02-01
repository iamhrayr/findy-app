import React, { memo } from 'react';
import { Placeholder, PlaceholderLine, ShineOverlay } from 'rn-placeholder';

import { View } from 'react-native-ui-lib';

import { Line } from '@app/components';

const EventsPlaceholder = () => (
  <Placeholder Animation={ShineOverlay}>
    <View row spread marginB-5>
      <PlaceholderLine width={25} />
      <PlaceholderLine width={20} />
    </View>
    <PlaceholderLine width={100} />
    <PlaceholderLine width={50} />
  </Placeholder>
);

const EventsPlaceholders = () => {
  return (
    <View>
      <EventsPlaceholder />
      <Line spacer={{ y: 'lg' }} />
      <EventsPlaceholder />
      <Line spacer={{ y: 'lg' }} />
      <EventsPlaceholder />
    </View>
  );
};

export default memo(EventsPlaceholders);
