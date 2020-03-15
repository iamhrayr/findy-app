import { View } from 'react-native';
import styled, { css } from 'styled-components/native';
import { SpacerProps, generateSpaces } from '../Spacer/Spacer';

type Props = {
  vertical?: boolean;
  size?: string | number;
  spacer?: Partial<SpacerProps>;
};

const Line = styled(View)<Props>`
  ${({ vertical, size, spacer, theme }) => css`
    ${vertical ? 'width' : 'height'}: 1px;
    flex: ${size || 1};
    background: ${theme.colors.gray};
    /* height: 100%; */
    ${generateSpaces(spacer || {}, theme)};
  `}
`;

export default Line;
