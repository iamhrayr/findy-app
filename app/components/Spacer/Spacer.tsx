import { View } from 'react-native';
import Styled, { css, DefaultTheme } from 'styled-components/native';

type SpacerKey = 't' | 'b' | 'l' | 'r' | 'x' | 'y';
type SpacerValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpacerProps = { [key in SpacerKey]: SpacerValue };

export const generateSpaces = (
  spacers: Partial<SpacerProps>,
  theme: DefaultTheme,
) => css`
  margin-top: ${spacers.t ? theme.button.spacer[spacers.t] : 0}px;
  margin-bottom: ${spacers.b ? theme.button.spacer[spacers.b] : 0}px;
  margin-left: ${spacers.l ? theme.button.spacer[spacers.l] : 0}px;
  margin-right: ${spacers.r ? theme.button.spacer[spacers.r] : 0}px;
  margin-vertical: ${spacers.y ? theme.button.spacer[spacers.y] : 0}px;
  margin-horizontal: ${spacers.x ? theme.button.spacer[spacers.x] : 0}px;
`;

const Spacer = Styled(View)<SpacerProps>`
  ${({ t, b, l, r, x, y, theme }) =>
    generateSpaces({ t, b, l, r, x, y }, theme)}
`;

export default Spacer;
