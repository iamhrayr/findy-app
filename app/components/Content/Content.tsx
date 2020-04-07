import React from 'react';
import {
  View,
  ScrollView,
  ScrollViewProps,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native';
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
    <KeyboardAvoidingView
      enabled
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 100 })}>
      <Component
        contentContainerStyle={full ? styles.container : {}}
        style={styles.container}>
        <Content {...props}>{children}</Content>
      </Component>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
  },
});
