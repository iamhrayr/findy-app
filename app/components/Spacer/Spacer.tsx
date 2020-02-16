import { View } from 'react-native';
import Styled, { css, DefaultTheme } from 'styled-components/native';

type SpacerKey = 't' | 'b' | 'l' | 'r' | 'x' | 'y';
type SpacerValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'huge';
export type SpacerProps = { [key in SpacerKey]?: SpacerValue };

export const generateSpaces = (spacers: Partial<SpacerProps>, theme: DefaultTheme) => css`
  ${spacers.t ? `margin-top: ${theme.spacer[spacers.t]}px` : ''};
  ${spacers.b ? `margin-bottom: ${theme.spacer[spacers.b]}px` : ''};
  ${spacers.l ? `margin-left: ${theme.spacer[spacers.l]}px` : ''};
  ${spacers.r ? `margin-right: ${theme.spacer[spacers.r]}px` : ''};
  ${spacers.x ? `margin-horizontal: ${theme.spacer[spacers.x]}px` : ''};
  ${spacers.y ? `margin-vertical: ${theme.spacer[spacers.y]}px` : ''};
`;

const Spacer = Styled(View)<SpacerProps>`
  ${({ t, b, l, r, x, y, theme }) => generateSpaces({ t, b, l, r, x, y }, theme)}
`;

export default Spacer;
