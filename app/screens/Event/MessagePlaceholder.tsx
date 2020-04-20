import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  ShineOverlay,
} from 'rn-placeholder';
import { s } from 'react-native-size-matters';
import styled from 'styled-components/native';

import { Spacer, Layout } from '@app/components';

const ImagePlaceholder = styled(PlaceholderMedia)`
  width: ${s(55)}px;
  height: ${s(55)}px;
  border-radius: ${s(50)}px;
  margin-right: ${s(10)}px;
`;

const ReceivedMessagePlaceholder = ({ rowCount }: { rowCount: number }) => {
  const elements: any[] = [];
  for (let i = 0; i < rowCount; i++) {
    elements.push(<PlaceholderLine width={s(70)} key={i} />);
  }

  return (
    <Placeholder Left={() => <ImagePlaceholder isRound />} Animation={ShineOverlay}>
      {elements}
    </Placeholder>
  );
};

const SentMessagePlaceholder = ({ rowCount }: { rowCount: number }) => {
  const elements: any[] = [];
  for (let i = 0; i < rowCount; i++) {
    elements.push(
      <PlaceholderLine width={s(70)} key={i} style={{ alignSelf: 'flex-end' }} />,
    );
  }

  return <Placeholder Animation={ShineOverlay}>{elements}</Placeholder>;
};

const MessagePlaceholders = () => {
  return (
    <Layout layout="col" style={styles.container}>
      <ReceivedMessagePlaceholder rowCount={3} />
      <Spacer b="md" />
      <ReceivedMessagePlaceholder rowCount={4} />
      <Spacer b="md" />
      <SentMessagePlaceholder rowCount={1} />
      <Spacer b="md" />
      <SentMessagePlaceholder rowCount={2} />
      <Spacer b="md" />
      <ReceivedMessagePlaceholder rowCount={3} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
  },
});

export default memo(MessagePlaceholders);
