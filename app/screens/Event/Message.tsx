import React from 'react';
import { View } from 'react-native';
import styled, { css } from 'styled-components/native';

import { Avatar, Text, Layout, Spacer } from '@app/components';

type Props = {
  text: string;
  isTypeReceived?: boolean;
};

const BORDER_RADIUS = '15px';

const MessageTextWrapper = styled(View)<Partial<Props>>`
  ${({ theme, isTypeReceived }) => css`
    padding: 12px;
    border-color: ${theme.colors.lightGray};
    border-radius: ${BORDER_RADIUS};
    border-top-start-radius: ${!isTypeReceived ? BORDER_RADIUS : 0};
    border-top-end-radius: ${isTypeReceived ? BORDER_RADIUS : 0};
    background-color: ${isTypeReceived ? 'transparent' : theme.colors.primary};
    border-width: ${isTypeReceived ? '1px' : 0};
    flex: 0.9;
  `}
`;

const MessageText = styled(Text)<Partial<Props>>`
  ${({ theme, isTypeReceived }) => css`
    color: ${isTypeReceived ? theme.colors.dirtyBlue : theme.colors.white};
  `}
`;

const Message = ({ text, isTypeReceived }: Props) => {
  return (
    <Layout layout="row" spacer={{ b: 'sm' }} reverse={!isTypeReceived}>
      {isTypeReceived && <Avatar size="50" circle />}
      <Spacer r="md" />
      <MessageTextWrapper isTypeReceived={isTypeReceived}>
        <MessageText isTypeReceived={isTypeReceived}>{text}</MessageText>
      </MessageTextWrapper>
      <Spacer r="sm" />
      <Text size="sm" spacer={{ t: 'sm' }}>
        7:54 AM
      </Text>
    </Layout>
  );
};

export default Message;
