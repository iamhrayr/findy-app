import { View } from 'react-native';
import Styled, { css, DefaultTheme } from 'styled-components/native';

type SpacerKey = 't' | 'b' | 'l' | 'r' | 'x' | 'y';
type SpacerValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'huge';
export type SpacerProps = { [key in SpacerKey]?: SpacerValue };

export const generateSpaces = (spacers: Partial<SpacerProps>, theme: DefaultTheme) => css`
  margin-top: ${spacers.t ? theme.spacer[spacers.t] : 0}px;
  margin-bottom: ${spacers.b ? theme.spacer[spacers.b] : 0}px;
  margin-left: ${spacers.l ? theme.spacer[spacers.l] : 0}px;
  margin-right: ${spacers.r ? theme.spacer[spacers.r] : 0}px;
  margin-vertical: ${spacers.y ? theme.spacer[spacers.y] : 0}px;
  margin-horizontal: ${spacers.x ? theme.spacer[spacers.x] : 0}px;
`;

const Spacer = Styled(View)<SpacerProps>`
  ${({ t, b, l, r, x, y, theme }) => generateSpaces({ t, b, l, r, x, y }, theme)}
`;

export default Spacer;
