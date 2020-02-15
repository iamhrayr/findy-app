import { Text as RNText } from 'react-native';
import styled, { css } from 'styled-components/native';

import { SpacerProps, generateSpaces } from '../Spacer/Spacer';

type Size = 'sm' | 'md' | 'lg' | 'h3' | 'h2' | 'h1' | 'giant';
type Weight = '100' | '200' | '300' | '400' | '500' | '600' | '700';
type Props = {
  size?: Size;
  weight?: Weight;
  opacity?: number;
  spacer?: Partial<SpacerProps>;
};

const Text = styled(RNText)<Props>`
  ${({ size, weight, spacer, opacity, theme }) => css`
    opacity: ${opacity || 1};
    color: ${theme.text.color};
    font-size: ${theme.text.fontSizes[size || 'md']}px;
    font-weight: ${weight || 400};

    /* spaces */
    ${generateSpaces(spacer || {}, theme)}
  `}
`;

export default Text;
