import React, { memo } from 'react';
import { Placeholder, PlaceholderLine, ShineOverlay } from 'rn-placeholder';

import { Line, Layout } from '@app/components';

const EventsPlaceholder = () => (
  <Placeholder Animation={ShineOverlay}>
    <Layout layout="row" justify="between" spacer={{ b: 'xs' }}>
      <PlaceholderLine width={25} />
      <PlaceholderLine width={20} />
    </Layout>
    <PlaceholderLine width={100} />
    <PlaceholderLine width={50} />
  </Placeholder>
);

const EventsPlaceholders = () => {
  return (
    <Layout layout="col">
      <EventsPlaceholder />
      <Line spacer={{ y: 'lg' }} />
      <EventsPlaceholder />
      <Line spacer={{ y: 'lg' }} />
      <EventsPlaceholder />
    </Layout>
  );
};

export default memo(EventsPlaceholders);
