import React, { useMemo } from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import styled, { css } from 'styled-components/native';

import { SpacerProps, generateSpaces } from '../Spacer/Spacer';

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
  shape: 'square' | 'round' | 'circle';
  textAlign: 'left' | 'center' | 'right';
  size: 'lg' | 'md' | 'sm';
  type: 'primary' | 'secondary' | 'danger' | 'success' | 'link';
  decoration: 'uppercase' | 'capitalize' | 'lowercase' | 'none';
};

type TextProps = Pick<Props, 'size' | 'type' | 'decoration' | 'outline'>;

type Props = TouchableOpacityProps & WrapperProps;

const ButtonWrapper = styled(TouchableOpacity)<WrapperProps>`
  ${({ shape, size, type, textAlign, block, spacer, theme }) => css`
    border-radius: ${theme.borderRadius[shape] || 0}px;
    padding-vertical: ${theme.button.paddingY[size] || 0}px;
    padding-horizontal: ${theme.button.paddingX[size] || 0}px;
    background: ${type !== 'link' ? theme.colors[type] : 'transparent'};
    align-items: ${TextAlignOptions[textAlign] || 'center'};
    align-self: ${block ? 'auto' : 'flex-start'};

    /* spaces */
    ${generateSpaces(spacer, theme)}
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

const Button = ({ children, textStyle, spacer, ...rest }: Props) => {
  // keep the default ones if the user add non conflicting custom ones
  const mergedSpacer: Partial<SpacerProps> = useMemo(
    () => ({
      ...(defaultSpacer as Partial<SpacerProps>),
      ...spacer,
    }),
    [spacer],
  );

  const content = React.isValidElement(children) ? (
    children
  ) : (
    <ButtonText
      style={textStyle}
      size={rest.size}
      decoration={rest.decoration}
      type={rest.type}
      outline={rest.outline}>
      {children}
    </ButtonText>
  );

  return (
    <ButtonWrapper activeOpacity={0.8} spacer={mergedSpacer} {...rest}>
      {content}
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

export default Button;
