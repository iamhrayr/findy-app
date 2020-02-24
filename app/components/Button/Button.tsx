import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from 'react-native';
import styled, { css, withTheme, DefaultTheme } from 'styled-components/native';

import { SpacerProps, generateSpaces } from '../Spacer/Spacer';
import If from '../If';

enum TextAlignOptions {
  left = 'flex-start',
  center = 'center',
  right = 'flex-end',
}

type WrapperProps = {
  block?: boolean;
  width?: number | string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  textStyle?: any;
  children: React.ReactNode;
  spacer: Partial<SpacerProps>;
  outline?: boolean;
  wide?: boolean;
  loading?: boolean;
  theme?: DefaultTheme;
  shape: 'square' | 'round' | 'circle';
  textAlign: 'left' | 'center' | 'right';
  size: 'lg' | 'md' | 'sm';
  type: 'primary' | 'secondary' | 'danger' | 'success' | 'link';
  decoration: 'uppercase' | 'capitalize' | 'lowercase' | 'none';
  icon?: React.ReactNode;
};

type TextProps = Pick<Props, 'size' | 'type' | 'decoration' | 'outline'>;

type Props = TouchableOpacityProps & WrapperProps;

const ButtonWrapper = styled(TouchableOpacity)<WrapperProps>`
  ${({ shape, size, type, textAlign, block, spacer, wide, disabled, icon, theme }) => css`
    border-radius: ${theme.borderRadius[shape] || 0}px;
    padding-vertical: ${theme.button.paddingY[size] || 0}px;
    padding-horizontal: ${!wide
      ? theme.button.paddingX[size]
      : theme.button.paddingX[size] * 2.4}px;
    background: ${type !== 'link' ? theme.colors[type] : 'transparent'};
    align-items: ${TextAlignOptions[textAlign] || 'center'};
    width: ${block ? '100%' : 'auto'};
    flex-shrink: 1;
    opacity: ${disabled ? 0.6 : 1};

    /* spaces */
    ${generateSpaces(spacer, theme)}
    ${icon &&
      css`
        padding: 10px;
      `};
  `}

  ${({ outline, type, theme }) =>
    outline &&
    type !== 'link' &&
    css`
      background-color: transparent;
      border-width: 1px;
      border-color: ${theme.colors[type]};
    `}
`;

const ButtonText = styled(Text)<TextProps>`
  ${({ type, size, decoration, theme }) => css`
    color: ${type === 'link' ? theme.colors.primary : theme.colors.white};
    font-size: ${theme.button.fontSizes[size]}px;
    text-transform: ${decoration};
    font-weight: ${theme.button.fontWeight};
  `}

  ${({ outline, type, theme }) =>
    outline &&
    type !== 'link' &&
    css`
      color: ${theme.colors[type]};
    `}
`;

const defaultSpacer = { b: 'sm' };

const Button = ({
  children,
  textStyle,
  spacer,
  loading,
  icon,
  theme,
  ...rest
}: Props) => {
  // keep the default ones if the user add non conflicting custom ones
  const mergedSpacer: Partial<SpacerProps> = useMemo(
    () => ({
      ...(defaultSpacer as Partial<SpacerProps>),
      ...spacer,
    }),
    [spacer],
  );

  return (
    <ButtonWrapper activeOpacity={0.8} spacer={mergedSpacer} icon={!!icon} {...rest}>
      <If condition={icon}>{icon}</If>

      <If condition={!icon}>
        <If condition={loading}>
          <ActivityIndicator color={theme!.colors.white} />
        </If>
        {/* <If condition={!loading}>{content}</If> */}
        <If condition={!loading}>
          <If condition={React.isValidElement(children)}>{children}</If>
          <If condition={!React.isValidElement(children)}>
            <ButtonText
              style={textStyle}
              size={rest.size}
              decoration={rest.decoration}
              type={rest.type}
              outline={rest.outline}>
              {children}
            </ButtonText>
          </If>
        </If>
      </If>
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  type: 'primary',
  size: 'md',
  shape: 'round',
  textAlign: 'center',
  decoration: 'uppercase',
  outline: false,
  spacer: {},
} as Partial<Props>;

export default withTheme(Button);
