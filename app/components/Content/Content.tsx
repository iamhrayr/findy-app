import React from 'react';
import { View, ScrollView, ScrollViewProps } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = ScrollViewProps & {
  noPadding?: boolean;
  noPaddingX?: boolean;
  noPaddingY?: boolean;
  extraPadded?: boolean;
  full?: boolean;
  children?: React.ReactNode;
  as?: React.ComponentType;
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
    `};
  ${({ noPaddingX }) =>
    noPaddingX &&
    css`
      padding-left: 0px;
      padding-right: 0px;
    `};
  ${({ noPaddingY }) =>
    noPaddingY &&
    css`
      padding-top: 0px;
      padding-bottom: 0px;
    `}
`;

export default ({ children, full, as: AsComponent, ...props }: Props) => {
  const Component = AsComponent ? AsComponent : ScrollView;

  return (
    <Component contentContainerStyle={full ? { flex: 1 } : {}} style={{ flex: 1 }}>
      <Content {...props}>{children}</Content>
    </Component>
  );
};

// export default Content;
