import { memo } from 'react';
import { View, ViewProps } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = ViewProps & {
  children?: React.ReactNode;
};

const Container = styled(View)<Props>`
  ${({ theme }) => css`
    background: ${theme.content.bgColor};
    flex: 1;
  `}
`;

export default memo<Props>(Container);
