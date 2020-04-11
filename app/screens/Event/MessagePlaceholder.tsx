import React from 'react';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  ShineOverlay,
} from 'rn-placeholder';
import styled from 'styled-components/native';

import { Spacer, Layout } from '@app/components';

const ImagePlaceholder = styled(PlaceholderMedia)`
  width: 55px;
  height: 55px;
  border-radius: 50px;
  margin-right: 10px;
`;

const ReceivedMessagePlaceholder = ({ rowCount }: { rowCount: number }) => {
  const elements: any[] = [];
  for (let i = 0; i < rowCount; i++) {
    elements.push(<PlaceholderLine width={70} key={i} />);
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
      <PlaceholderLine width={70} key={i} style={{ alignSelf: 'flex-end' }} />,
    );
  }

  return <Placeholder Animation={ShineOverlay}>{elements}</Placeholder>;
};

const MessagePlaceholders = () => {
  return (
    <Layout layout="col" style={{ marginTop: 'auto' }}>
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

export default MessagePlaceholders;
