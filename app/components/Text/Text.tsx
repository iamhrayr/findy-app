import { Text as RNText } from 'react-native';
import styled, { css } from 'styled-components/native';

import { SpacerProps, generateSpaces } from '../Spacer/Spacer';

// enum TextAlignOptions {
//   left = 'flex-start',
//   center = 'center',
//   right = 'flex-end',
// }

type Color = 'primary' | 'secondary' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg' | 'h3' | 'h2' | 'h1' | 'giant';
type Weight = '100' | '200' | '300' | '400' | '500' | '600' | '700';
type Props = {
  size?: Size;
  weight?: Weight;
  opacity?: number;
  align?: string;
  color?: Color;
  spacer?: Partial<SpacerProps>;
};

const Text = styled(RNText)<Props>`
  ${({ size, weight, spacer, opacity, color, align, theme }) => css`
    opacity: ${opacity || 1};
    color: ${color && theme.colors[color] ? theme.colors[color] : theme.text.color};
    font-size: ${theme.text.fontSizes[size || 'md']}px;
    font-weight: ${weight || 400};
    text-align: ${align || 'left'};
    /* spaces */
    ${generateSpaces(spacer || {}, theme)};
  `}
`;

export default Text;
