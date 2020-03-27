import React from 'react';
import styled from 'styled-components/native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from 'rn-placeholder';

import { Line, Layout } from '@app/components';

const ButtonPlaceholder = styled(PlaceholderMedia)`
  margin-left: 7px;
`;

const CarNumberPlaceholder = () => (
  <Placeholder
    Animation={ShineOverlay}
    Right={() => (
      <>
        <ButtonPlaceholder isRound={true} />
        <ButtonPlaceholder isRound={true} />
      </>
    )}>
    <PlaceholderLine width={40} />
    <PlaceholderLine width={30} />
  </Placeholder>
);

const CarNumberPlaceholders = () => {
  return (
    <Layout layout="col">
      <CarNumberPlaceholder />
      <Line spacer={{ y: 'lg' }} />
      <CarNumberPlaceholder />
      <Line spacer={{ y: 'lg' }} />
      <CarNumberPlaceholder />
    </Layout>
  );
};

export default CarNumberPlaceholders;
