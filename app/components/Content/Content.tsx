import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = ScrollViewProps & {
  noPadding?: boolean;
  extraPadded?: boolean;
  children?: React.ReactNode;
};

const Content = styled(ScrollView)<Props>`
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
