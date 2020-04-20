import { memo } from 'react';
import { Text as RNText, TextProps } from 'react-native';
import styled, { css } from 'styled-components/native';

import { SpacerProps, generateSpaces } from '../Spacer/Spacer';

// enum TextAlignOptions {
//   left = 'flex-start',
//   center = 'center',
//   right = 'flex-end',
// }

type Color =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'gray'
  | 'lightGray'
  | 'darkGray';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'h3' | 'h2' | 'h1' | 'giant';
type Weight = '100' | '200' | '300' | '400' | '500' | '600' | '700';
type Transform = 'uppercase' | 'capitalize' | 'lowercase' | 'none';

type Props = {
  size?: Size;
  weight?: Weight;
  opacity?: number;
  align?: string;
  color?: Color;
  spacer?: Partial<SpacerProps>;
  transform?: Transform;
  children?: React.ReactNode;
} & TextProps;

const Text = styled(RNText)<Props>`
  ${({ size, weight, spacer, opacity, color, align, transform, theme }) => css`
    opacity: ${opacity || 1};
    color: ${color && theme.colors[color] ? theme.colors[color] : theme.text.color};
    font-size: ${theme.text.fontSizes[size || 'md']}px;
    font-weight: ${weight || 400};
    text-align: ${align || 'auto'};
    text-transform: ${transform || 'none'};
    /* spaces */
    ${generateSpaces(spacer || {}, theme)};
  `}
`;

export default memo<Props>(Text);
