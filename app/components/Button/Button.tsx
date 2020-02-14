import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import styled, { css } from 'styled-components/native';

enum TextAlignOptions {
  left = 'flex-start',
  center = 'center',
  right = 'flex-end',
}

type SpacerKey = 't' | 'b' | 'l' | 'r' | 'x' | 'y';
type SpacerValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Spacer = { [key in SpacerKey]: SpacerValue };

type WrapperProps = {
  block?: boolean;
  width?: number | string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  textStyle?: any;
  children: React.ReactNode;
  spacer: Partial<Spacer>;
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
    margin-top: ${spacer.t ? theme.button.spacer[spacer.t] : 0}px;
    margin-bottom: ${spacer.b ? theme.button.spacer[spacer.b] : 0}px;
    margin-left: ${spacer.l ? theme.button.spacer[spacer.l] : 0}px;
    margin-right: ${spacer.r ? theme.button.spacer[spacer.r] : 0}px;
    margin-vertical: ${spacer.y ? theme.button.spacer[spacer.y] : 0}px;
    margin-horizontal: ${spacer.x ? theme.button.spacer[spacer.x] : 0}px;
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

const Button = ({ children, textStyle, ...rest }: Props) => {
  // TODO: add merged spacers to avoid removing existing ones
  // const mergedSpacer: Spacer = {
  //   ...{ b: 'sm', t: 'sm' },
  //   ...rest.spacer,
  // };

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
    <ButtonWrapper
      activeOpacity={0.8}
      {...rest}
      // spacer={mergedSpacer}
    >
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
  spacer: { b: 'sm' },
} as Partial<Props>;

export default Button;
