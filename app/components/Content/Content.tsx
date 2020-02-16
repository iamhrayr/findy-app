import React from 'react';
import { View, ViewProps } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = ViewProps & {
  noPadding?: boolean;
  extraPadded?: boolean;
  children?: React.ReactNode;
};

const Content = styled(View)<Props>`
  ${({ noPadding, extraPadded, theme }) => css`
    padding: ${noPadding ? 0 : theme.content.padding}px;
    ${extraPadded && `padding: ${theme.content.padding}px`};
    background: ${theme.content.bgColor};
    flex: 1;
  `}
  ${({ extraPadded, theme }) =>
    extraPadded &&
    css`
      padding: ${theme.content.paddingExtra}px;
    `}
`;

export default Content;
