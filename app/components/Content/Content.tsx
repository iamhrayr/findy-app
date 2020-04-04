import React, { memo } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  // KeyboardAvoidingView
} from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = ScrollViewProps & {
  noPadding?: boolean;
  noPaddingX?: boolean;
  noPaddingY?: boolean;
  extraPadded?: boolean;
  disableKeyboardAvoiding?: boolean;
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

export default memo((
  { children, full, ...props }: Props, // disableKeyboardAvoiding,
) => (
  // <KeyboardAvoidingView
  //   enabled={!disableKeyboardAvoiding}
  //   style={{ flex: 1 }}
  //   behavior="padding"
  //   keyboardVerticalOffset={100}>
  <Content contentContainerStyle={full ? { flex: 1 } : {}} {...props}>
    {children}
  </Content>
  // </KeyboardAvoidingView>
));

// export default Content;
