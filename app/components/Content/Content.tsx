import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = ScrollViewProps & {
  noPadding?: boolean;
  extraPadded?: boolean;
  full?: boolean;
  children?: React.ReactNode;
  as?: React.ComponentType;
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

export default ({ children, full, ...props }: Props) => (
  <Content contentContainerStyle={full ? { flex: 1 } : {}} {...props}>
    {children}
  </Content>
);

// export default Content;
