import React from 'react';
import { View } from 'react-native';
import styled, { css } from 'styled-components/native';

import Text from '../Text';

type Props = {
  message: React.ReactNode;
};

const Wrapper = styled(View)`
  ${({ theme }) => css`
    padding: 25px;
    align-items: center;
    border-width: 1px;
    border-radius: ${theme.borderRadius.round}px;
    border-color: ${theme.colors.lightGray};
  `}
`;

const NoData = ({ message }: Props) => {
  return (
    <Wrapper>
      <Text>{message}</Text>
    </Wrapper>
  );
};

export default NoData;
