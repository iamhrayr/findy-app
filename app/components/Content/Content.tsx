import React from 'react';
import { View, ScrollViewProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled, { css } from 'styled-components/native';

type Props = ScrollViewProps & {
  noPadding?: boolean;
  noPaddingX?: boolean;
  noPaddingY?: boolean;
  extraPadded?: boolean;
  scrollable?: boolean;
  full?: boolean;
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

export default ({ children, full, scrollable = true, ...props }: Props) => {
  const contentContainerStyle = full ? { minHeight: '100%' } : {};

  if (!scrollable) {
    return <Content {...props}>{children}</Content>;
  }

  return (
    <KeyboardAwareScrollView
      scrollEnabled
      enableOnAndroid
      extraHeight={100}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps="handled"
      resetScrollToCoords={{ x: 0, y: 0 }}>
      <Content {...props}>{children}</Content>
    </KeyboardAwareScrollView>
  );
};
